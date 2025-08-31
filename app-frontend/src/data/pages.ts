import { getCollection } from 'astro:content';
import type { Page } from 'app-payload';

export async function getPagesStaticPaths() {
  const allPages = await getCollection('pages');

  return allPages.map(({ data }) => {
    const page = data as Page;
    if (page.slug === 'home')
      return {
        params: { slug: undefined },
        props: { page },
      };
    return {
      params: { slug: page.slug },
      props: { page },
    };
  });
}
