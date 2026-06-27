export const SITE = {
  title: "Cian 技术博客",
  shortTitle: "Cian",
  description: "记录工程实践、系统设计、AI 工具链与长期主义写作。",
  author: "Cian",
  url: "https://song0705.github.io",
  base: "/blog",
  locale: "zh-CN"
} as const;

export function withBase(path = "") {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}${cleanPath}`;
}

export function absoluteUrl(path = "") {
  return new URL(withBase(path), SITE.url).toString();
}
