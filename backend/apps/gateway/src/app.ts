import { IncomingMessage, ServerResponse, request } from "http";
import { URL } from "url";

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

const sendJson = (res: ServerResponse, statusCode: number, body: unknown) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

const healthHandler: RouteHandler = (_req, res) => {
  sendJson(res, 200, { status: "OK", service: "gateway" });
};

const proxyRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  targetBaseUrl: string
) => {
  const parsedUrl = new URL(req.url || "", "http://localhost:4000");

  const options = {
    hostname: new URL(targetBaseUrl).hostname,
    port: new URL(targetBaseUrl).port,
    path: parsedUrl.pathname + parsedUrl.search,
    method: req.method,
    headers: req.headers,
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });

  proxy.on("error", () => {
    sendJson(res, 500, { success: false, message: "Service unavailable" });
  });
};

export const app = (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    sendJson(res, 400, { success: false, message: "Invalid request" });
    return;
  }

  // Health check
  if (req.method === "GET" && req.url === "/health") {
    healthHandler(req, res);
    return;
  }

  // Routing logic
  if (req.url.startsWith("/api/users")) {
    return proxyRequest(req, res, "http://localhost:4001");
  }

  if (req.url.startsWith("/api/auth")) {
    return proxyRequest(req, res, "http://localhost:4002");
  }

  if (req.url.startsWith("/api/orders")) {
    return proxyRequest(req, res, "http://localhost:4003");
  }

  if (req.url.startsWith("/api/analytics")) {
    return proxyRequest(req, res, "http://localhost:4004");
  }

  if (req.url.startsWith("/api/inventory")) {
    return proxyRequest(req, res, "http://localhost:4005");
  }

  if (req.url.startsWith("/api/products")) {
    return proxyRequest(req, res, "http://localhost:4006");
  }

  if (req.url.startsWith("/api/recommendation")) {
    return proxyRequest(req, res, "http://localhost:4007");
  }

  sendJson(res, 404, { success: false, message: "Route not found" });
};