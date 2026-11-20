# Aureum production setup on Hostinger VPS

## Recommended architecture

```text
Visitor -> HTTPS / Nginx -> Docker container (Next.js on 127.0.0.1:3000)
                         |- immutable Next assets cached for one year
                         |- public media cached for seven days
                         `- pages and lead APIs rendered through Next.js
```

This keeps the application private, gives the VPS a proper reverse-proxy layer, and avoids caching enquiry or payment interactions incorrectly. A single container is enough for this website at launch; Redis or a multi-container cache should only be added when traffic or a second app instance justifies it.

## First deployment

1. Point `aureummall.info` and `www.aureummall.info` to the VPS IP. Preserve existing mail, SPF, DKIM and DMARC records.
2. Clone the repository on the VPS.
3. Create `.env.production` on the VPS only. Copy the keys from `.env.example` and add the real lead-delivery values. Do not commit this file.
4. Build and start the container:

   ```bash
   docker compose -f docker-compose.production.yml up -d --build
   docker compose -f docker-compose.production.yml ps
   ```

5. Install the Nginx server block from `ops/nginx/aureum.conf`, verify the existing host configuration, then reload Nginx.
6. Issue the TLS certificate through the VPS control panel or Certbot, then redirect HTTP to HTTPS.
7. Verify:

   ```bash
   curl -I https://aureummall.info/
   curl -I https://aureummall.info/_next/static/<known-asset>
   curl -I https://aureummall.info/assets/aureum/approved/renders/aureum-exterior-evening.jpg
   ```

## Why this is faster

- Next.js runs in standalone mode, so the production image contains only the runtime files it needs.
- Next asset files are immutable and can be reused for a year without another server request.
- Public renders and video files are cached at the reverse proxy, so repeat visitors do not hit Node.js for media.
- The homepage hero video is not requested on mobile; the optimized poster image remains visible.
- Below-the-fold videos use `preload="none"`, so they load only when the visitor chooses to watch them.
- The Next image optimizer can serve responsive AVIF/WebP output from the same source render.

## Deployment updates

```bash
git pull origin main
docker compose -f docker-compose.production.yml up -d --build
docker image prune -f
```

Do not cache `/api/*`, contact pages with query parameters, or any future authenticated route at Nginx. Keep only one production container until traffic measurements show that horizontal scaling is needed.
