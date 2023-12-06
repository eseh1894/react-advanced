import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue = []) => {
  const [storedValue, setStoredValue] = useState(
    () => window.localStorage.getItem(key) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
