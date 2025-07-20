import * as React from "react";

interface NetworkState {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  rtt?: number;
  saveData?: boolean;
  type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown";
}

const isShallowEqual = (
  object1: Partial<NetworkState>,
  object2: Partial<NetworkState>
): boolean => {
  const keys1 = Object.keys(object1) as (keyof NetworkState)[];
  const keys2 = Object.keys(object2) as (keyof NetworkState)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

const getConnection = (): NetworkInformation | undefined => {
  return (
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection
  );
};

type NetworkInformation = {
  downlink: number;
  downlinkMax: number;
  effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  rtt: number;
  saveData: boolean;
  type:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown";
  addEventListener: (
    type: "change",
    listener: () => void,
    options?: boolean | AddEventListenerOptions
  ) => void;
  removeEventListener: (
    type: "change",
    listener: () => void,
    options?: boolean | EventListenerOptions
  ) => void;
};

const useNetworkStateSubscribe = (
  callback: () => void
): (() => void) => {
  window.addEventListener("online", callback, { passive: true });
  window.addEventListener("offline", callback, { passive: true });

  const connection = getConnection();
  if (connection) {
    connection.addEventListener("change", callback, { passive: true });
  }

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
    if (connection) {
      connection.removeEventListener("change", callback);
    }
  };
};

const getNetworkStateServerSnapshot = (): NetworkState => {
  throw Error("useNetworkState is a client-only hook");
};

export function useNetworkState(): NetworkState {
  const cache = React.useRef<Partial<NetworkState>>({});

  const getSnapshot = (): NetworkState => {
    const online = navigator.onLine;
    const connection = getConnection();

    const nextState: NetworkState = {
      online,
      downlink: connection?.downlink,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
      type: connection?.type,
    };

    if (isShallowEqual(cache.current, nextState)) {
      return cache.current as NetworkState;
    } else {
      cache.current = nextState;
      return nextState;
    }
  };

  return React.useSyncExternalStore(
    useNetworkStateSubscribe,
    getSnapshot,
    getNetworkStateServerSnapshot
  );
}
