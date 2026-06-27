import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const publishIndex = args.indexOf("--publish");
const publish = publishIndex >= 0;

if (publish) {
  args.splice(publishIndex, 1);
}

const [title, customSlug] = args;

if (!title) {
  console.error('Usage: npm run new-post -- "文章标题" optional-slug');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slugBase =
  customSlug ??
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") ??
  "post";
const slug = slugBase || "post";
const filename = `${today}-${slug}.mdx`;
const postsDir = join(process.cwd(), "src/content/posts");
const filePath = join(postsDir, filename);

if (existsSync(filePath)) {
  console.error(`Post already exists: ${filePath}`);
  process.exit(1);
}

mkdirSync(postsDir, { recursive: true });
writeFileSync(
  filePath,
  `---
title: "${title.replaceAll('"', '\\"')}"
description: "补充这篇文章的摘要。"
pubDate: ${today}
category: "未分类"
tags: []
heroImage: "/images/site-og.png"
heroAlt: "Cian 技术博客默认封面"
featured: false
draft: ${publish ? "false" : "true"}
---

## 背景

写下这个问题为什么值得记录。

## 约束

列出当时不能改变的条件。

## 做法

记录具体方案和关键取舍。

## 复盘

保留下次还会复用的判断。
`
);

console.log(`Created ${filePath}`);
console.log(publish ? "Status: published" : "Status: draft");
