import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export function getPostSlug(post: Post) {
  return (post.data.slug ?? post.id)
    .replace(/\.(md|mdx)$/i, "")
    .replace(/\/index$/i, "");
}

export function sortPosts(posts: Post[]) {
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return sortPosts(posts);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);
}

export function getReadingTime(body = "") {
  const tokens = body.match(/[\u4e00-\u9fa5]|[A-Za-z0-9_]+/g)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(tokens / 450));
  return `${minutes} 分钟读完`;
}

export function getAllTags(posts: Post[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) =>
    a.localeCompare(b, "zh-CN")
  );
}

export function getAllCategories(posts: Post[]) {
  return [...new Set(posts.map((post) => post.data.category))].sort((a, b) =>
    a.localeCompare(b, "zh-CN")
  );
}

export function postsByTag(posts: Post[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function postsByCategory(posts: Post[], category: string) {
  return posts.filter((post) => post.data.category === category);
}

export function getAdjacentPosts(posts: Post[], slug: string) {
  const index = posts.findIndex((post) => getPostSlug(post) === slug);
  return {
    previous: index >= 0 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined
  };
}

export function groupPostsByYear(posts: Post[]) {
  return posts.reduce<Record<string, Post[]>>((groups, post) => {
    const year = String(post.data.pubDate.getFullYear());
    groups[year] ??= [];
    groups[year].push(post);
    return groups;
  }, {});
}
