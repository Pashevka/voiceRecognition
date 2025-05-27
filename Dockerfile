# Stage 1: Build the app
FROM node:20-alpine AS builder
# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
# Copy only package files first (better caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
# Copy the rest and build
COPY . .
RUN pnpm build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]