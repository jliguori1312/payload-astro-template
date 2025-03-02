// @ts-check
import "dotenv/config";

import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: true,
    },
  },

  integrations: [vue(), react()],

  site: "https://your-site-here.com",
});
