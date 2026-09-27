/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

interface VisitorCfProperties {
  country?: string;
  city?: string;
  region?: string;
  regionCode?: string;
  continent?: string;
  timezone?: string;
  postalCode?: string;
  asn?: number;
  asOrganization?: string;
  colo?: string;
  httpProtocol?: string;
  tlsVersion?: string;
}

function detectDeviceType(userAgent: string): "mobile" | "tablet" | "desktop" | "unknown" {
  if (!userAgent) return "unknown";
  if (/iPad|Tablet|PlayBook|Silk/i.test(userAgent)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) return "mobile";
  return "desktop";
}

function detectBrowser(userAgent: string): string {
  if (/Edg\//i.test(userAgent)) return "Edge";
  if (/OPR\//i.test(userAgent)) return "Opera";
  if (/Firefox\//i.test(userAgent)) return "Firefox";
  if (/Chrome\//i.test(userAgent)) return "Chrome";
  if (/Safari\//i.test(userAgent) && /Version\//i.test(userAgent)) return "Safari";
  return "Other/Unknown";
}

function detectOs(userAgent: string): string {
  if (/Windows NT/i.test(userAgent)) return "Windows";
  if (/Android/i.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS/iPadOS";
  if (/Mac OS X/i.test(userAgent)) return "macOS";
  if (/Linux/i.test(userAgent)) return "Linux";
  return "Other/Unknown";
}

function logPageView(request: Request, url: URL): void {
  const accept = request.headers.get("accept") ?? "";

  // Log only normal HTML page visits so CSS, JavaScript, images, and API
  // requests do not create a large number of duplicate visitor records.
  if (request.method !== "GET" || !accept.includes("text/html")) return;

  const userAgent = request.headers.get("user-agent") ?? "";
  const cf =
    (request as Request & { cf?: VisitorCfProperties }).cf ?? {};

  const visitor = {
    analyticsEvent: "page_view",
    timestamp: new Date().toISOString(),
    host: url.hostname,
    path: url.pathname,
    ip: request.headers.get("cf-connecting-ip"),
    country: cf.country ?? null,
    city: cf.city ?? null,
    region: cf.region ?? null,
    regionCode: cf.regionCode ?? null,
    continent: cf.continent ?? null,
    timezone: cf.timezone ?? null,
    postalCode: cf.postalCode ?? null,
    asn: cf.asn ?? null,
    network: cf.asOrganization ?? null,
    cloudflareColo: cf.colo ?? null,
    httpProtocol: cf.httpProtocol ?? null,
    tlsVersion: cf.tlsVersion ?? null,
    deviceType: detectDeviceType(userAgent),
    browser: detectBrowser(userAgent),
    operatingSystem: detectOs(userAgent),
    userAgent,
    language: request.headers.get("accept-language"),
    referrer: request.headers.get("referer"),
    clientPlatform: request.headers.get("sec-ch-ua-platform"),
    clientMobileHint: request.headers.get("sec-ch-ua-mobile"),
    rayId: request.headers.get("cf-ray"),
    isLikelyBot: /bot|crawler|spider|slurp|bingpreview|facebookexternalhit/i.test(userAgent),
  };

  // Log the object directly so Cloudflare indexes each visitor field
  // separately for filtering, grouping, and per-visit inspection.
  console.log(visitor);
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    logPageView(request, url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
