import { spawn } from "node:child_process"
import { writeFile } from "node:fs/promises"
import http from "node:http"
import path from "node:path"
import puppeteer from "puppeteer"

const PORT = 4173
const URL = `http://localhost:${PORT}`
const OUTPUTS = [path.resolve("public/resume.pdf"), path.resolve("dist/resume.pdf")]

function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    function poll() {
      http
        .get(url, (res) => {
          if (res.statusCode === 200) return resolve()
          retry()
        })
        .on("error", retry)
    }
    function retry() {
      if (Date.now() - start > timeoutMs) return reject(new Error("Server did not start in time"))
      setTimeout(poll, 300)
    }
    poll()
  })
}

async function main() {
  const server = spawn("bun", ["run", "preview", "--port", String(PORT)], {
    stdio: "pipe",
    shell: false
  })

  server.stderr.on("data", (d: Buffer) => process.stderr.write(d))

  try {
    console.log("Waiting for preview server...")
    await waitForServer(URL)
    console.log("Server ready, generating PDF...")

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.emulateMediaType("print")
    await page.goto(URL, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
      printBackground: true
    })

    await browser.close()

    for (const output of OUTPUTS) {
      await writeFile(output, pdfBuffer)
      console.log(`PDF saved to ${output}`)
    }
  } finally {
    server.kill()
  }
}

main().catch((err) => {
  console.error("PDF generation failed:", err)
  process.exit(1)
})
