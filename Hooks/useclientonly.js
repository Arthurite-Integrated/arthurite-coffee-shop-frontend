"use client";

import { useState, useEffect } from "react";

export function useClientOnly(callback, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(callback());
  }, [callback]);

  return value;
}
