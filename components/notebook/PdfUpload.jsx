"use client";

import { useRef } from "react";

export default function PdfUpload({
  notebookId,
  onUploaded,
  children,
}) {
  const inputRef = useRef(null);

  async function uploadFile(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("notebookId", notebookId);

    try {
      const response = await fetch("/api/sources/upload", {
        method: "POST",
        body: formData,
      });

    //   const data = await response.json();
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text);
    const data = text ? JSON.parse(text) : null;

      console.log(data);

      onUploaded?.(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={uploadFile}
      />
      <div
        onClick={() => inputRef.current?.click()}
      >
        {children}
      </div>
    </>
  );
}