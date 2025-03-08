// src/tesseractLogger.js
export function tesseractLogger(m) {
  if (m.status === "recognizing text") {
    const progress = Math.round(m.progress * 100);

    console.log("OCR Progress:", progress);
  }
}
