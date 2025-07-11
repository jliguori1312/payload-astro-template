// @ts-check
import "dotenv/config";

import { defineConfig, fontProviders } from "astro/config";
import { getRedirects } from "./src/utilities/redirects";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: "#components",
          replacement: path.resolve(__dirname, "./node_modules/ui-library/src/components"),
        }
      ]
    },
    define: {
      __dirname: JSON.stringify(process.cwd()),
    },
    ssr: {
      noExternal: ["@payloadcms/ui"],
    },
  },
  redirects: await getRedirects(),
  integrations: [vue(), react()],

  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist-sans"
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono"
    }
  ]
  },

  site: "https://your-site-here.com",
});
