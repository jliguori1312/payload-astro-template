// @ts-check
import "dotenv/config";

import { defineConfig } from "astro/config";
import { getRedirects } from "./src/utilties/redirects";
import { resolve } from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import react from "@astrojs/react";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      __dirname: JSON.stringify(process.cwd()),
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "node_modules/mhr-payload/src"),
      },
    },
  },
  redirects: await getRedirects(),
  integrations: [vue(), react()],

  site: "https://your-site-here.com",
});
