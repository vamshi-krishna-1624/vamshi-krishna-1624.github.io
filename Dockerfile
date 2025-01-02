FROM node:18-alpine AS node-builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tailwind-config.js ./
COPY postcss-config.js ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Debug: Show directory structure
RUN echo "=== Node.js build stage directory structure ==="
RUN ls -la

# Build CSS
RUN npm run build:css
RUN echo "=== CSS build output ==="
RUN ls -la static/css/

FROM klakegg/hugo:ext-alpine AS hugo-builder
WORKDIR /src

# Copy everything
COPY . .
COPY --from=node-builder /app/static/css/main.css ./static/css/

# Debug: Show directory structure before Hugo build
RUN echo "=== Hugo build stage directory structure ==="
RUN ls -la
RUN echo "=== Content directory ==="
RUN ls -la content/
RUN echo "=== Static CSS directory ==="
RUN ls -la static/css/

# Build Hugo site with verbose output
RUN hugo -v --minify

# Debug: Show public directory after Hugo build
RUN echo "=== Public directory after Hugo build ==="
RUN ls -la public/
RUN echo "=== Public CSS directory ==="
RUN ls -la public/css/ || echo "CSS directory not found in public/"
RUN echo "=== Public docs directory ==="
RUN ls -la public/docs/ || echo "Docs directory not found in public/"

FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built site
COPY --from=hugo-builder /src/public /usr/share/nginx/html

# Debug: Show final nginx html directory
RUN echo "=== Final nginx html directory ==="
RUN ls -la /usr/share/nginx/html/
RUN echo "=== Final CSS directory ==="
RUN ls -la /usr/share/nginx/html/css/ || echo "CSS directory not found in nginx html/"
RUN echo "=== Final docs directory ==="
RUN ls -la /usr/share/nginx/html/docs/ || echo "Docs directory not found in nginx html/"

EXPOSE 80

# Use a shell script to show logs
COPY <<'EOF' /docker-entrypoint.sh
#!/bin/sh
echo "=== Starting nginx with content ==="
ls -la /usr/share/nginx/html/
nginx -g 'daemon off;'
EOF

RUN chmod +x /docker-entrypoint.sh
CMD ["/docker-entrypoint.sh"]