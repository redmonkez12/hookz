"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Page() {
  useDocumentTitle("Custom Title");

  return (
    <div>
      <h1>Document Title</h1>
    </div>
  );
}