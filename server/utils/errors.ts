import { err } from "neverthrow";

export type ErrorType =
  | "INVALID_IMAGE"
  | "PROCESSING_FAILED"
  | "STORAGE_FAILED"
  | "THUMBNAIL_FAILED"
  | "CHAT_COMPLETION_FAILED";

const ERROR_MESSAGES: Partial<Record<ErrorType, string>> = {};

const ERROR_CODES: Partial<Record<ErrorType, number>> = {};

export const buildError =
  (type: ErrorType, statusCode?: number, statusMessage?: string) =>
  (cause?: unknown) =>
    err(
      createError({
        statusCode: statusCode ?? ERROR_CODES[type],
        data: { type, cause },
        statusMessage: statusMessage ?? ERROR_MESSAGES[type],
      })
    );
