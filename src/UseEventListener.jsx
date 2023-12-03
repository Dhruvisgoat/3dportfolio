import { useRef, useEffect } from "react";

export function useEventListener(type, listener) {
  const ref = useRef();

  useEffect(() => {
    ref.current = listener;
    window.addEventListener(type, listener);
    return () => window.removeEventListener(type, listener);
  }, [type, listener]);

  return ref;
}