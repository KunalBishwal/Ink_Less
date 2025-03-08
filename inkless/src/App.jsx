// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Button from "./components/ui/Button";
import DragDropZone from "./components/DragDropZone";
import ImagePreview from "./components/ImagePreview";
import ProgressBar from "./components/ProgressBar";
import useOcr from "./hooks/useOcr";

import "./App.css"; 

function App() {
  const [activeTab, setActiveTab] = useState("upload"); 
  const [image, setImage] = useState(null);
  const {
    text,
    progress,
    isProcessing,
    error,
    workerReady,
    extractTextFromImage,
    setError,
    resetOcrState,
  } = useOcr();

  const handleImageSelected = (file) => {
    if (file && !file.type.startsWith("image/")) {
      setError("Unsupported file type. Please upload an image.");
      return;
    }
    setError("");
    resetOcrState();

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleExtractText = async () => {
    if (!image) return;
    await extractTextFromImage(image);
    setActiveTab("result");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background animated blobs */}
      <div className="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-[-10rem] right-[-5rem] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <Navbar />

      <main className="container mx-auto py-8 px-4">
        <Card>
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Image Text Extractor</h1>
            <p className="text-gray-600">Upload an image and extract text using OCR technology</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-2 text-center ${
                activeTab === "upload"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Upload Image
            </button>
            <button
              onClick={() => setActiveTab("result")}
              disabled={!text}
              className={`flex-1 py-2 text-center ${
                activeTab === "result" && text
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              } ${!text ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Extracted Text
            </button>
          </div>

          {activeTab === "upload" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side: Drag & Drop + Button + Progress/Error */}
              <div>
                <DragDropZone onFileSelected={handleImageSelected} />
                <Button
                  onClick={handleExtractText}
                  disabled={!image || isProcessing || !workerReady}
                  className="w-full mt-4"
                >
                  {isProcessing
                    ? "Processing..."
                    : !workerReady
                      ? "Initializing OCR..."
                      : "Extract Text"}
                </Button>
                {isProcessing && (
                  <div className="mt-2">
                    <ProgressBar value={progress} />
                    <p className="text-sm text-gray-500 mt-1">Processing: {progress}%</p>
                  </div>
                )}
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>

              {/* Right side: Image Preview or Placeholder */}
              <ImagePreview image={image} />
            </div>
          )}

          {activeTab === "result" && (
            <div>
              {text ? (
                <div className="p-4 border rounded bg-gray-50">
                  <h2 className="font-semibold mb-2">Extracted Text:</h2>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">{text}</pre>
                </div>
              ) : (
                <p className="text-gray-500">No text extracted yet.</p>
              )}
            </div>
          )}

          {/* Footer info */}
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <p>Supported formats: JPG, PNG, BMP, GIF (up to 10MB)</p>
            <p>Powered by Tesseract.js</p>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default App;
