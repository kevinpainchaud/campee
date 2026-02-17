import type { PostgrestError } from "@supabase/supabase-js";

const isPostgrestError = (error: unknown): error is PostgrestError =>
  error !== null &&
  typeof error === "object" &&
  "code" in error &&
  "hint" in error;

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error || isPostgrestError(error)) {
    return error.message;
  }
};

export const getDetailedErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.stack || error.message;
  } else if (isPostgrestError(error)) {
    return `${error.stack || error.message}\r\n---\r\n${error.hint}`;
  }
};
