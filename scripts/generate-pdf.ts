import { spawn, type ChildProcess } from "node:child_process"
import { mkdir, writeFile } from "node:fs/promises"
import http from "node:http"
import path from "node:path"
import puppeteer from "puppeteer"

const PORT = 4173
const URL = `http://127.0.0.1:${PORT}`
const FILE_NAME = "HoangNguyen-FullStack-Resume.pdf"
const OUTPUTS = [path.resolve("public", FILE_NAME), path.resolve("dist", FILE_NAME)]

function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    function poll(): void {
      http
        .get(url, res => {
          res.resume()
          if (res.statusCode === 200) return resolve()
          retry()
        })
        .on("error", retry)
    }
    function retry(): void {
      if (Date.now() - start > timeoutMs) {
        return reject(new Error("Server did not start in time"))
      }
      setTimeout(poll, 300)
    }
    poll()
  })
}

function startPreview(): ChildProcess {
  return spawn(
    path.resolve("node_modules/.bin/vite"),
    ["preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"],
    { stdio: ["ignore", "pipe", "pipe"] }
  )
}

async function main(): Promise<void> {
  if (process.env.VERCEL === "1") {
    console.log(`Vercel build: serving committed public/${FILE_NAME}`)
    return
  }

  const server = startPreview()
  server.stderr?.on("data", (chunk: Buffer) => {
    process.stderr.write(chunk)
  })

  try {
    console.log("Waiting for preview server...")
    await waitForServer(URL)
    console.log("Server ready, generating PDF...")

    const browser = await puppeteer.launch({ headless: true })
    try {
      const page = await browser.newPage()
      await page.emulateMediaType("print")
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" }
      ])
      await page.goto(URL, { waitUntil: "networkidle0" })
      await page.evaluate("document.fonts.ready")
      const pdf = await page.pdf({
        preferCSSPageSize: true,
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
        tagged: true
      })

      for (const output of OUTPUTS) {
        await mkdir(path.dirname(output), { recursive: true })
        await writeFile(output, pdf)
        console.log(`PDF saved to ${output}`)
      }
    } finally {
      await browser.close()
    }
  } finally {
    server.kill("SIGTERM")
  }
}

main().catch((err: unknown) => {
  console.error("PDF generation failed:", err)
  process.exit(1)
})
