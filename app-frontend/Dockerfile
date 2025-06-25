# ./builder/Dockerfile
FROM node:20-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

WORKDIR /app/app-frontend

RUN pnpm install

ENTRYPOINT ["pnpm", "build"]
