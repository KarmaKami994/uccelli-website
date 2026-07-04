import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

/** Used by the Docker HEALTHCHECK and uptime monitoring. */
export async function GET() {
  try {
    const payload = await getPayloadClient();
    await payload.count({ collection: "pages" });
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("[health] check failed:", error);
    return NextResponse.json({ status: "error" }, { status: 503 });
  }
}
