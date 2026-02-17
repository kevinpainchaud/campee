import { LOCAL_STORAGE_KEY_PREFIX } from "../constants/localStorage";

export const getPrefixedLocalStorageKey = (key: string) =>
  [LOCAL_STORAGE_KEY_PREFIX, key].join(".");
