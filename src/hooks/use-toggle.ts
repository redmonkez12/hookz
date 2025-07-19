import { useCallback, useState } from "react";

type State = boolean | undefined;

export function useToggle(initialValue: State) {
  const [on, setOn] = useState(() =>
    typeof initialValue === "boolean" ? initialValue : !!initialValue
  );

  const handleToggle = useCallback((value: State) => {
    if (typeof value === "boolean") {
      setOn(value);
    } else {
      setOn((v) => !v);
    }
  }, []);

  return [on, handleToggle] as const;
}
