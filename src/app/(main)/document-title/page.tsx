"use client";

import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Page() {
  useDocumentTitle("Custom Title");

  return (
    <div>
      <h1>Document Title</h1>
    </div>
  );
}