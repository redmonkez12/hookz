import * as React from "react";

type State<T> = T | null | undefined;

export function useDefault<T>(
  initialValue: State<T>,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<State<T>>>] {
  const [state, setState] = React.useState<State<T>>(
    initialValue ?? defaultValue
  );

  const setStateWithDefault = React.useCallback(
    (value: React.SetStateAction<State<T>>) => {
      setState(value ?? defaultValue);
    },
    [defaultValue]
  );

  return [state as T, setStateWithDefault];
}
