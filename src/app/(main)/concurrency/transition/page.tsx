"use client";
import { useState, useTransition } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function SlowTabContent() {
  const items = Array.from({ length: 100000000 }, (_, i) => i + 1);
  return (
    <div className="max-h-[200px] overflow-auto">
      <p>Heavy content below:</p>
      <ul>
        {items.slice(0, 100).map((n) => (
          <li key={n}>Item {n}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("account");
  const [loadedTab, setLoadedTab] = useState("account");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "results") {
      startTransition(async () => {
        await new Promise((res) => setTimeout(res, 2000));
        setLoadedTab("results");
      });
    } else {
      setLoadedTab(tab);
    }
  };

  return (
    <div>
      <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="results">
          {isPending ? (
            <div className="text-gray-500">Loading results…</div>
          ) : loadedTab === "results" ? (
            <SlowTabContent />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}