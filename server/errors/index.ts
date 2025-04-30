import { err } from "neverthrow";

export type ImageProcessingError =
  | { type: "INVALID_IMAGE"; cause?: unknown }
  | { type: "PROCESSING_FAILED"; cause?: unknown }
  | { type: "STORAGE_FAILED"; cause?: unknown }
  | { type: "THUMBNAIL_FAILED"; cause?: unknown };

export const imageError =
  (type: ImageProcessingError["type"]) => (cause?: unknown) =>
    err({ type, cause } as ImageProcessingError);
