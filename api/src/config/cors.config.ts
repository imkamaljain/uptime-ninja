export const corsConfig = {
  origin: /^https:\/\/uptime-ninja\.netlify\.app$|^http:\/\/localhost(:\d+)?$/,
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "Content-Disposition",
    "authToken",
    "api-key",
    "api-token",
    "If-None-Match",
    "Set-Cookie",
  ],
  maxAge: 86400,
  credentials: true,
  exposedHeaders: ["ETag"],
};
