import type { Loader, LoaderContext } from 'astro/loaders'
import { type SanitizedConfig, type RequiredDataFromCollectionSlug, getPayload } from 'payload'
import { z } from 'astro:content'


export async function payloadLocalLoader(options: { payloadConfig: SanitizedConfig, draft: boolean }): Loader {
    const payload = await getPayload({config: options.payloadConfig})
    return {
        name: 'payload-local-loader',
        load: async ({collection, generateDigest, store, logger}): Promise<void> => {
            // get the payload collection and update the store
            const data = await payload.find({
                collection,
                draft: options.draft,
                limit: 1000,
                overrideAccess: false,
                pagination: false,
            })

            for (const page of data.docs) {
                const digest = generateDigest(page)

                store.set({
                    id: String(page.id),
                    digest,
                    data: page
                }) // it thinks page.id is maybe a number...
                // check datastore for anything that doesn't exist and delete it
                // see latest chatgpt
                
                // add schema for the basic payload structure, docs array, id, layout, etc
                
            }
        }
    }
}