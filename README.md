# Image Text Extractor

This is a React-based application that extracts text from images using OCR technology. The project primarily leverages [Tesseract.js](https://github.com/naptha/tesseract.js) for client-side OCR processing and also includes an option to use an OCR API (e.g., [OCR.space](https://ocr.space/OCRAPI)) for image-to-text extraction.

> **Note:** OCR is a resource-intensive task. Depending on the image size and device performance, initialization and processing times may vary. This project includes strategies to improve performance, such as image compression before OCR API calls.

---

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Drag and Drop Upload:** Easily upload an image via drag and drop.
- **Preview Functionality:** Displays a preview of the uploaded image.
- **OCR Processing:** Extract text from images using Tesseract.js (self-hosted assets) or a free OCR API.
- **Responsive UI:** Built with React and styled with Tailwind CSS.
- **Fallback & Error Handling:** Provides clear error messages if OCR fails or if the worker is not ready.

---

