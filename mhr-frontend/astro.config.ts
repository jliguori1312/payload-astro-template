// @ts-check
import "dotenv/config";

import { defineConfig } from "astro/config";
import { getRedirects } from "./src/utilities/redirects";
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
    ssr: {
      noExternal: ["@payloadcms/ui"],
    },
  },
  redirects: await getRedirects(),
  integrations: [vue(), react()],

  site: "https://your-site-here.com",
});
