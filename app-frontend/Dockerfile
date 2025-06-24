# ./builder/Dockerfile
FROM node:20-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN cd app-frontend && pnpm install

ENTRYPOINT ["pnpm", "build"]
CMD ["--outdir", "/dist"]
