import { spawn, type ChildProcess } from "node:child_process"
import { mkdir, readFile, writeFile } from "node:fs/promises"
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

const PRINT_FONTS = [
  { file: "zilla-slab-400.ttf", weight: 400 },
  { file: "zilla-slab-700.ttf", weight: 700 }
]

// Skia drops all page text when print CSS references file-based
// webfonts, but embeds data-URL fonts fine. Inject them here so the
// PDF keeps real text in Zilla Slab while CSS stays font-file free.
async function injectPrintFonts(
  page: import("puppeteer").Page
): Promise<void> {
  const faces = await Promise.all(
    PRINT_FONTS.map(async ({ file, weight }) => {
      const data = await readFile(
        path.resolve("scripts/fonts", file),
        "base64"
      )
      return `@font-face{font-family:"Zilla Slab";font-weight:${weight};font-display:block;src:url(data:font/ttf;base64,${data}) format("truetype");}`
    })
  )
  await page.addStyleTag({ content: faces.join("\n") })
  await page.evaluate("document.fonts.ready")
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

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"]
    })
    try {
      const page = await browser.newPage()
      await page.emulateMediaType("print")
      // NOTE: do not call emulateMediaFeatures here. It wedges
      // data-URL @font-face loading (faces stay "unloaded") and Skia
      // then emits zero text objects. Headless defaults to light
      // scheme, and print CSS uses fixed colors regardless.
      await page.goto(URL, { waitUntil: "networkidle0" })
      await page.evaluate("document.fonts.ready")
      await injectPrintFonts(page)
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
