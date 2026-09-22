import { getCloudflareContext } from "@opennextjs/cloudflare";

type RouteArgs = {
  params: Promise<{ filename: string }>;
};

async function getBucket() {
  const { env } = await getCloudflareContext({ async: true });
  return (env as { R2: any }).R2;
}

function applyMetadata(object: any, headers: Headers) {
  object.writeHttpMetadata?.(headers);

  if (object.httpEtag) {
    headers.set("ETag", object.httpEtag);
  } else if (object.etag) {
    headers.set("ETag", object.etag);
  }

  if (typeof object.size === "number") {
    headers.set("Content-Length", String(object.size));
  }

  headers.set("Cache-Control", headers.get("Cache-Control") || "public, max-age=3600");
}

export async function GET(_request: Request, { params }: RouteArgs) {
  const { filename } = await params;
  const bucket = await getBucket();
  const object = await bucket.get(filename);

  if (!object?.body) {
    return new Response(null, { status: 404 });
  }

  const headers = new Headers();
  applyMetadata(object, headers);

  return new Response(object.body, {
    status: 200,
    headers,
  });
}

export async function HEAD(_request: Request, { params }: RouteArgs) {
  const { filename } = await params;
  const bucket = await getBucket();
  const object = await bucket.head(filename);

  if (!object) {
    return new Response(null, { status: 404 });
  }

  const headers = new Headers();
  applyMetadata(object, headers);

  return new Response(null, {
    status: 200,
    headers,
  });
}
