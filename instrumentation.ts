/**
 * Runs once at server startup (Next.js instrumentation hook).
 * Fail fast when required configuration is missing, instead of booting
 * an insecure server that errors lazily on first CMS access.
 */
export async function register() {
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.PAYLOAD_SECRET
  ) {
    // eslint-disable-next-line no-console
    console.error(
      "\n[FATAL] PAYLOAD_SECRET ist nicht gesetzt. Server-Start abgebrochen.\n" +
        "        Secret generieren:  openssl rand -hex 32\n" +
        "        Dann in .env bzw. docker-compose Umgebung setzen (siehe .env.example).\n"
    );
    process.exit(1);
  }
}
