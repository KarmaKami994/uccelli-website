import { getCloudflareContext } from "@opennextjs/cloudflare";

type RouteArgs = {
  params: Promise<{ filename: string }>;
};

type R2ObjectMetadata = {
  writeHttpMetadata?: (headers: Headers) => void;
  httpEtag?: string;
  etag?: string;
  size?: number;
};

type R2ObjectBody = R2ObjectMetadata & {
  body?: BodyInit | null;
};

type R2BucketLike = {
  get: (key: string) => Promise<R2ObjectBody | null>;
  head: (key: string) => Promise<R2ObjectMetadata | null>;
};

async function getBucket(): Promise<R2BucketLike> {
  const { env } = await getCloudflareContext({ async: true });
  return (env as { R2: R2BucketLike }).R2;
}

function applyMetadata(object: R2ObjectMetadata, headers: Headers) {
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
