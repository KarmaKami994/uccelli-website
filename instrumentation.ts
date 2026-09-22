/**
 * Runs once at server startup (Next.js instrumentation hook).
 * Throwing is Worker-compatible; process.exit is not available in workerd.
 */
export async function register() {
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.PAYLOAD_SECRET &&
    process.env.NEXT_PHASE !== "phase-production-build"
  ) {
    throw new Error(
      "PAYLOAD_SECRET ist nicht gesetzt. Configure it as a Cloudflare Worker secret before serving production traffic."
    );
  }
}
