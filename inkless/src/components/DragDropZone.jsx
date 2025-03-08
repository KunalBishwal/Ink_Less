// src/components/DragDropZone.jsx
import React from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react"; // optional icon library

function DragDropZone({ onFileSelected }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        onFileSelected(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-600">Drop the image here ...</p>
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="h-6 w-6 mb-2 text-gray-500" />
          <p className="text-gray-600">
            Drag & drop an image here <br /> or <span className="underline">Select image</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default DragDropZone;
