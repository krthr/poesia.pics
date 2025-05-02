import { exec } from "node:child_process";
import { promisify } from "node:util";

const execPromise = promisify(exec);

export default defineNitroPlugin(async () => {
  const logger = useLogger("plugins.migrations");

  if (process.env.NODE_ENV !== "production") {
    logger.info("skipping migration");
    return;
  }

  logger.info("running migrations");

  const { stderr, stdout } = await execPromise("npx drizzle-kit migrate");

  logger.log(stdout);
  logger.error(stderr);

  logger.info("done :)");
});
