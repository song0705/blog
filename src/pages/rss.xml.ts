import rss from "@astrojs/rss";
import { getPublishedPosts, getPostSlug } from "../lib/posts";
import { SITE, absoluteUrl } from "../lib/site";

export async function GET() {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(absoluteUrl("")),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: absoluteUrl(`posts/${getPostSlug(post)}/`),
      categories: [post.data.category, ...post.data.tags]
    }))
  });
}
