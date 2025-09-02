import type { CollectionSlug } from 'payload'

// This utility is used by the `livePreview` and `preview` functions
// in collection and global configs to generate a path to the frontend.

type Props = {
  collection?: CollectionSlug
  slug: string
}

export const generatePreviewPath = ({ slug, collection }: Props): string => {
  if (collection === 'pages') {
    if (slug === 'home') {
      return '/preview'
    }
    return `/preview/${slug}`
  }

  return `/preview/${collection}/${slug}`

  
}
