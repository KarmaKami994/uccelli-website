import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

const payloadMocks = vi.hoisted(() => ({
  create: vi.fn(async () => ({ id: 42 })),
  update: vi.fn(async () => ({ id: 42 })),
}));

vi.mock("payload", () => ({
  getPayload: vi.fn(async () => ({
    create: payloadMocks.create,
    update: payloadMocks.update,
  })),
}));

import { POST } from "@/app/api/contact/route";

const VALID = {
  name: "Max Muster",
  email: "max@example.com",
  subject: "Mitgliedschaft",
  message: "Ich möchte gerne Mitglied werden. Bitte um Infos.",
};

let ipCounter = 0;
function post(body: unknown, ip?: string): NextRequest {
  ipCounter += 1;
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip ?? `10.0.0.${ipCounter}`,
    },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.unstubAllEnvs();
  payloadMocks.create.mockClear();
  payloadMocks.update.mockClear();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("accepts and stores a valid submission without email configuration", async () => {
    const res = await POST(post(VALID));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.emailSent).toBe(false);
    expect(payloadMocks.create).toHaveBeenCalledWith(expect.objectContaining({
      collection: "contact-submissions",
      data: expect.objectContaining({
        source: "contact",
        locale: "de",
        emailStatus: "skipped",
      }),
    }));
  });

  it("stores structured join metadata", async () => {
    const res = await POST(post({
      ...VALID,
      source: "join",
      interest: "membership",
      project: "LifeLab",
      locale: "en",
    }));

    expect(res.status).toBe(200);
    expect(payloadMocks.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        source: "join",
        interest: "membership",
        project: "LifeLab",
        locale: "en",
      }),
    }));
  });

  it("rejects invalid payloads with field issues", async () => {
    const res = await POST(post({ ...VALID, email: "keine-email", message: "kurz" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.issues.email).toBeDefined();
    expect(json.issues.message).toBeDefined();
  });

  it("rejects non-JSON bodies", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "x-forwarded-for": "10.9.9.9" },
      body: "das ist kein json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rejects oversized messages", async () => {
    const res = await POST(post({ ...VALID, message: "x".repeat(5001) }));
    expect(res.status).toBe(400);
  });

  it("requires a Turnstile token when the secret is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    const res = await POST(post(VALID));
    expect(res.status).toBe(403);
    expect(payloadMocks.create).not.toHaveBeenCalled();
  });

  it("rejects an invalid Turnstile token", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: false }), { status: 200 })
    );
    const res = await POST(post({ ...VALID, turnstileToken: "bad-token" }));
    expect(res.status).toBe(403);
  });

  it("accepts a valid Turnstile token", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );
    const res = await POST(post({ ...VALID, turnstileToken: "good-token" }));
    expect(res.status).toBe(200);
  });

  it("rate-limits after 5 requests from the same IP", async () => {
    const ip = "203.0.113.77";
    for (let i = 0; i < 5; i++) {
      const res = await POST(post(VALID, ip));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(post(VALID, ip));
    expect(blocked.status).toBe(429);
  });

  it("uses the last x-forwarded-for entry", async () => {
    const trusted = "198.51.100.5";
    for (let i = 0; i < 5; i++) {
      await POST(post(VALID, `1.2.3.${i}, ${trusted}`));
    }
    const blocked = await POST(post(VALID, `9.9.9.9, ${trusted}`));
    expect(blocked.status).toBe(429);
  });
});
