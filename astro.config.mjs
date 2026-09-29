// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  fonts: [
    {
      name: "General Sans",
      cssVariable: "--font-general-sans",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: "200 700",
            style: "normal",
            src: ["./src/assets/fonts/general-sans-variable.woff2"],
          },
        ],
      },
    },
    {
      name: "Quicksand",
      cssVariable: "--font-quicksand",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: "300 700",
            style: "normal",
            src: ["./src/assets/fonts/quicksand-variable.ttf"],
          },
        ],
      },
    },
  ],
  vite: { build: { cssTarget: "safari15.4" } },
});
