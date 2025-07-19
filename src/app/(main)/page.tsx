import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <Link href="/document-title">useDocumentTitle</Link>
      </Button>

      <Button asChild>
        <Link href="/default">useDefault</Link>
      </Button>
    </div>
  );
}
