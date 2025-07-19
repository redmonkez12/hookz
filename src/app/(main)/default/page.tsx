"use client";

import { Button } from "@/components/ui/button";
import { useDefault } from "@/hooks/use-default";
import { useEffect } from "react";

export default function Page() {
  const [value, setValue] = useDefault<number>(10, 20);

  console.log(value);

  useEffect(() => {
    setValue(null);
  }, []);

  return (
    <div>
      <h1>Default</h1>

      <Button onClick={() => setValue(40)}>Set Value</Button>
    </div>
  );
}
