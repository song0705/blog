import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://song0705.github.io",
  base: "/blog",
  trailingSlash: "always",
  devToolbar: {
    enabled: false
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true
    }
  }
});
