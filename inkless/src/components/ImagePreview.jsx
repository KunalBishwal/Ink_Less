// src/components/ImagePreview.jsx
import React from "react";
import { ImageIcon } from "lucide-react";

function ImagePreview({ image }) {
  return (
    <div className="flex flex-col items-center justify-center border rounded-md p-4 min-h-[300px] bg-gray-50">
      {image ? (
        <img
          src={image}
          alt="Uploaded"
          className="max-h-[300px] max-w-full object-contain"
        />
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <ImageIcon className="h-16 w-16 mb-2" />
          <p>No image uploaded</p>
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
