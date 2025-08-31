import { getCollection } from 'astro:content';
import type { Post } from 'app-payload';
import { getPayload } from 'payload';
import { config as payloadConfig } from 'app-payload';

export async function getPostsStaticPaths() {
  const allPosts = await getCollection('posts');

  return allPosts.map(({ data }) => {
    const post = data as Post;
    return {
      params: { slug: post.slug },
      props: { post },
    };
  });
}

export async function getPostsIndexStaticPaths() {
  const pageLimit = 10;
  const allPosts = await getCollection('posts');
  const totalDocs = allPosts.length;
  const totalPages = Math.ceil(totalDocs / pageLimit);
  const pages: { params: { page: string | undefined }; props: { pageLimit: number } }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push({
      params: { page: `page/${String(i)}` },
      props: { pageLimit },
    });
  }
  pages.push({
    params: { page: undefined },
    props: { pageLimit },
  });
  return pages;
}

export async function fetchPost(slug: string, isDraft: boolean = false) {
  const payload = await getPayload({ config: payloadConfig });
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    draft: isDraft,
  });

  return result.docs[0] || null;
}
