import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold">Hooks</h2>

      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/document-title">useDocumentTitle</Link>
        </Button>

        <Button asChild>
          <Link href="/default">useDefault</Link>
        </Button>

        <Button asChild>
          <Link href="/network-state">useNetworkState</Link>
        </Button>
      </div>

      <h2 className="text-2xl font-bold">Concurrecy</h2>

      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/concurrency/transition">useTransition</Link>
        </Button>
      </div>
    </div>
  );
}
