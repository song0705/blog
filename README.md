# Cian 技术博客

基于 Astro 的静态技术博客，面向 GitHub Pages 项目站点发布：

```txt
https://song0705.github.io/blog/
```

## 本地开发

```bash
npm install
npm run dev
```

开发地址：

```txt
http://127.0.0.1:4321/blog/
```

## 常用命令

```bash
npm run check
npm run build
npm run preview
```

## 写文章

草稿放在 `writing/drafts/`。正式文章放在 `src/content/posts/`，使用 Markdown 或 MDX。

当前已准备一个未发布草稿：

```txt
src/content/posts/first-post.mdx
```

推荐用根目录命令生成正式文章文件：

```bash
./new 文章标题
```

标题可以直接写中文。默认生成 `draft: true`，不会公开发布。写完后把文章 frontmatter 改成：

```yaml
draft: false
```

如果要创建时直接发布：

```bash
./new --publish 文章标题
```

如果想指定英文 URL：

```bash
./new --slug article-slug 文章标题
```

每篇文章需要 frontmatter：

```yaml
title: "文章标题"
description: "文章摘要"
pubDate: 2026-06-27
category: "系统设计"
tags: ["架构", "后端"]
heroImage: "/images/covers/example.png"
heroAlt: "封面图说明"
featured: false
draft: false
```

封面图放在 `public/images/covers/`。

## 发布

推送到 `main` 后，`.github/workflows/deploy.yml` 会使用官方 Astro GitHub Action 构建并发布到 GitHub Pages。

首次发布前，在 GitHub 仓库设置中确认 Pages Source 选择 `GitHub Actions`。
