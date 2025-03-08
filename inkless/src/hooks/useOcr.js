// src/hooks/useOcr.js
import { useState, useRef, useEffect } from "react";
import { createWorker } from "tesseract.js";

// Fallback for PUBLIC_URL if process.env is not defined
const PUBLIC_URL =
  typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
    ? process.env.PUBLIC_URL
    : "";

export default function useOcr(initialLang = "eng") {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState(initialLang);

  const workerRef = useRef(null);
  const [workerReady, setWorkerReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initWorker = async () => {
      console.log("🚀 Initializing OCR worker...");
      setWorkerReady(false);
      setError("");
      setText("");
      setProgress(0);

      try {
        const worker = await createWorker({
          corePath: `${PUBLIC_URL}/js/tesseract-core.wasm.js`,
          workerPath: `${PUBLIC_URL}/js/tesseract-worker.min.js`,
          langPath: `${PUBLIC_URL}/traineddata`,
          logger: (m) => {
            if (m.status === "recognizing text") {
              setProgress(Math.round(m.progress * 100));
            }
          }
        });

        console.log("✅ Worker created successfully.");
        console.log("🚀 Loading language data...");
        await worker.loadLanguage(initialLang);

        console.log("✅ Language data loaded successfully.");
        console.log("🚀 Initializing worker with language...");
        await worker.initialize(initialLang);

        console.log("✅ Worker initialized successfully!");

        if (mounted) {
          workerRef.current = worker;
          setWorkerReady(true);
        }
      } catch (err) {
        console.error("❌ Failed to initialize Tesseract worker:", err);
        if (mounted) {
          setError("Failed to initialize OCR. Please refresh or try again.");
        }
      }
    };

    initWorker();

    return () => {
      mounted = false;
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [initialLang]);

  const setLanguage = async (newLang) => {
    if (workerRef.current) {
      await workerRef.current.loadLanguage(newLang);
      await workerRef.current.initialize(newLang);
      setLang(newLang);
    }
  };

  const extractTextFromImage = async (imageDataUrl) => {
    if (!workerReady || !workerRef.current) {
      setError("OCR worker not ready yet. Please wait or try again.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setText("");
    setError("");

    try {
      console.log("🚀 Starting text extraction...");
      const { data } = await workerRef.current.recognize(imageDataUrl);
      console.log("✅ Text extraction completed successfully.");
      setText(data.text);
    } catch (err) {
      console.error("❌ OCR Error:", err);
      setError("Failed to extract text. Please try another image.");
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const resetOcrState = () => {
    setText("");
    setProgress(0);
    setIsProcessing(false);
    setError("");
  };

  return {
    text,
    progress,
    isProcessing,
    error,
    lang,
    workerReady, // now returning workerReady for UI updates
    setLang: setLanguage,
    extractTextFromImage,
    resetOcrState,
    setError,
  };
}
