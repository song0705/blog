import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { relative, join } from "node:path";

const args = process.argv.slice(2);
let publish = false;
let customSlug;
const titleParts = [];

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];

  if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  }

  if (arg === "--publish") {
    publish = true;
    continue;
  }

  if (arg === "--slug") {
    customSlug = args[index + 1];
    index += 1;
    continue;
  }

  titleParts.push(arg);
}

const title = titleParts.join(" ").trim();

if (!title) {
  printHelp();
  process.exit(1);
}

const now = new Date();
const today = formatDate(now);
const fallbackSlug = `post-${formatTime(now)}`;
const slug = slugify(customSlug ?? title) || fallbackSlug;
const postsDir = join(process.cwd(), "src/content/posts");
const filePath = getAvailablePath(postsDir, today, slug);

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

console.log(`Created: ${relative(process.cwd(), filePath)}`);
console.log(`Status: ${publish ? "published" : "draft"}`);

if (!publish) {
  console.log("Publish: change draft: true to draft: false, then git add/commit/push.");
}

function printHelp() {
  console.log(`Usage:
  ./new 文章标题
  ./new --publish 文章标题
  ./new --slug custom-slug 文章标题

Examples:
  ./new 我的第一篇文章
  ./new --slug astro-notes 我对 Astro 的一点理解`);
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
}

function getAvailablePath(postsDir, date, slug) {
  let suffix = "";
  let counter = 1;

  while (true) {
    const candidate = join(postsDir, `${date}-${slug}${suffix}.mdx`);

    if (!existsSync(candidate)) {
      return candidate;
    }

    counter += 1;
    suffix = `-${counter}`;
  }
}
