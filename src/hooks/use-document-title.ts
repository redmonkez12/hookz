import { useEffect, useState } from "react";

export const useDocumentTitle = (title: string, timeout: number = 1) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    if (isLoaded) {
      setTimeout(() => {
        document.title = title;
      }, timeout);
    }

    return () => {
      document.title = originalTitle;
    };
  }, [isLoaded, title]);
};
