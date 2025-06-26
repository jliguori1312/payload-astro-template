# ./builder/Dockerfile
FROM node:20-slim AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

WORKDIR /app/app-frontend

RUN pnpm install
RUN pnpm build

FROM nginx:alpine

COPY --from=builder /app/app-frontend/dist /usr/share/nginx/html
EXPOSE 80

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off"]