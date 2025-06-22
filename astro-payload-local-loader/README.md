# astro-payload-local-loader

**Astro content loader for [Payload CMS](https://payloadcms.com/), using the local API.**  
This loader allows you to load and cache data from a Payload CMS instance during your Astro build, using the local API.

## Features

- Integrates Payload CMS with Astro’s content layer
- Uses Payload’s local API for high-performance, in-process access
- Supports incremental builds and data caching
- Minimal schema validation out-of-the-box (extendable via your collection definitions)

## Installation

```bash
pnpm add astro-payload-local-loader
```
(or `npm` or `yarn`)

## Usage
See the Astro docs: [Astro Content Guide](https://docs.astro.build/en/guides/content-collections/)

Here is a basic example. Define your collections (matching the names to your payload collections):
```ts
// src/content/config.ts
import { defineCollection, z } from "astro:content"
import { payloadLocalLoader } from "astro-payload-local-loader"
import { config } from 'app-payload'

const pages = defineCollection({
    loader: payloadLocalLoader({ payloadConfig: config, draft: false }),
})
const posts = defineCollection({
    loader: payloadLocalLoader({ payloadConfig: config, draft: false }),
})

export const collections = {
    pages,
    posts,
}
```
Then you can use the data in your Astro components:

```astro
---
import { getCollection } from 'astro:content'

export const getStaticPaths = (async () => {
    const allPosts = await getCollection('posts')
    
    const params = allPosts.map(({ data: post}) => {
        const { slug } = post
        return {
            params: { slug },
            props: { post }
        }
    })

    return params
})

const { post } = Astro.props
---
<h1>{post.title}</h1>
<p>{post.content}</p>
<!-- etc. -->
```

## Options

Pass an options object to the loader. Currently the following two options are required:

- `payloadConfig` (`Promise<SanitizedConfig>`): Your payload config. This is exported from your `payload.config.ts` file.
- `draft` (`boolean`): Whether to load draft content (`true`) or only published content (`false`).

## Schema

The loader includes a very basic schema, that only verifies that each document entry has an id field. You should override this schema with your own based on your collections in `content.config.ts` file.

## How It Works:

- Fetches up to 1000 items from the given Payload collection.
- Stores each document in Astro’s data store with a digest, and will only update if the document has changed.
- Removes stale documents no longer present in Payload.

## Limitations:

Currently:
- Only supports non-paginated, non-access-controlled fetches (`overrideAccess: false`).
- The default schema is minimal and should be extended per collection.
- Limited ability to customize the payload fetch call. 

## License:

MIT
