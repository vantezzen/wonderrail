import { useState, useEffect } from "react";

/**
 * Use persistent zustand stores securely to allow compatability with
 * NextJS SSR.
 * Source: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
 */
const usePersistentStoreSecure = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default usePersistentStoreSecure;
