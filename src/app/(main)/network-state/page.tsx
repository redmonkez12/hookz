"use client";

import { useNetworkState } from "@/hooks/use-network-state";

export default function Page() {
  const network = useNetworkState();

  return (
    <div>
      <p>Status: {network.online ? "🟢 Online" : "🔴 Offline"}</p>
      {network.effectiveType && <p>Connection: {network.effectiveType}</p>}
      {network.downlink && <p>Speed: {network.downlink} Mbps</p>}
    </div>
  );
}
