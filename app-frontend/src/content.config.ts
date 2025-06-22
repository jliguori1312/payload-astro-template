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