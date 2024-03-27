import { clearHash } from "../../lib/cache";

export const clearCache = (key: string) => {
  const clearCached = async (req, res, next) => {
    await next();
    clearHash(key);
  };
  return clearCached;
};
