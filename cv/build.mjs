import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputs = [
  { html: "cv.html", pdf: "cv.pdf" },
  { html: "cv-ats.html", pdf: "cv-ats.pdf", css: "cv-ats.css" },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ["--font-render-hinting=medium"],
});

try {
  for (const output of outputs) {
    const htmlPath = path.join(__dirname, output.html);
    const pdfPath = path.join(__dirname, output.pdf);

    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, {
      waitUntil: "networkidle0",
    });
    await page.evaluateHandle("document.fonts.ready");

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await page.close();
    console.log(`Generated cv/${output.pdf}`);
  }
} finally {
  await browser.close();
}
