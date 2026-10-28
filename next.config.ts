import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter", ["yaml"]], ["remark-gfm"]],
    rehypePlugins: [["rehype-slug"]],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // A og-image (src/app/og-image.png/route.tsx) lê as fotos da loja de demonstração do disco
  outputFileTracingIncludes: {
    "/og-image.png": ["./public/demo/**/*"],
  },
};

export default withMDX(nextConfig);
