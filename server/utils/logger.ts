import type { ConsolaOptions } from "consola";
import { consola } from "consola";

export function useLogger(tag?: string, options: Partial<ConsolaOptions> = {}) {
  const logger = consola.create(options);
  return tag ? logger.withTag(tag) : logger;
}
