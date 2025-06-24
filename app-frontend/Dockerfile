# ./builder/Dockerfile
FROM node:20-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm install

CMD ["pnpm", "build"]
