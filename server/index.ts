import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HUBSPOT_PORTAL_ID = "244921424";
const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";

// Zero-dependency in-memory rate limiter
function makeRateLimiter(maxRequests: number, windowMs: number, message: object) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim()
      || req.socket.remoteAddress
      || "unknown";
    const now = Date.now();
    const record = hits.get(ip);
    if (!record || now > record.resetAt) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }
    if (record.count >= maxRequests) {
      res.setHeader("Retry-After", Math.ceil((record.resetAt - now) / 1000));
      return res.status(429).json(message);
    }
    record.count++;
    next();
  };
}

// 300 requests / 60 s per IP for static file serving
const staticLimiter = makeRateLimiter(300, 60 * 1000, { error: "Too many requests, please try again later." });

// 20 submissions / 15 min per IP for the contact API
const apiLimiter = makeRateLimiter(20, 15 * 60 * 1000, { success: false, message: "Too many submissions. Please try again later." });

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.static(path.resolve(__dirname, "..", "dist", "public")));

  // ✅ Contact form API endpoint
  app.post("/api/contact", apiLimiter, async (req, res) => {
    const { firstname, lastname, email, phone, subject, message } = req.body;

    // Validate
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

      const response = await fetch(hubspotUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: firstname || "" },
            { name: "lastname", value: lastname || "" },
            { name: "email", value: email },
            { name: "phone", value: phone || "" },
            { name: "subject", value: subject || "" },
            { name: "message", value: subject ? `[${subject}] ${message || ""}` : (message || "") },
          ],
          context: {
            pageUri: req.headers.referer || "https://a1tradelines.com/contact",
            pageName: "Contact Form",
          },
        }),
      });

      if (!response.ok) {
        console.error("HubSpot error:", response.status);
        return res.status(500).json({ success: false, message: "Failed to submit form" });
      }

      res.json({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", staticLimiter, (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
