import type { Loader, LoaderContext } from 'astro/loaders'
import { type SanitizedConfig, getPayload } from 'payload'
import { z } from 'astro:content'


export function payloadLocalLoader(options: { payloadConfig: Promise<SanitizedConfig>, draft: boolean }): Loader {
    
    return {
        name: 'payload-local-loader',
        load: async ({collection, generateDigest, parseData, store, logger}): Promise<void> => {
            const payload = await getPayload({config: options.payloadConfig})
            const data = await payload.find({
                collection,
                draft: options.draft,
                limit: 1000,
                overrideAccess: false,
                pagination: false,
            })
            logger.debug(`Payload response for ${collection}: ${JSON.stringify(data)}`)
            const idsFromPayload = new Set()

            // Parse and add new entries
            for (const page of data.docs) {
                const parsedPage = await parseData({
                    id: String(page.id),
                    data: page
                })

                const digest = generateDigest(parsedPage)
                idsFromPayload.add(page.id)

                const ifAdded = store.set({
                    id: String(page.id),
                    digest,
                    data: parsedPage
                })

                if (ifAdded) logger.info(`Added updated or new entry ${page.id} to the datastore`)
            }
            // Delete stale entries
            for (const [id] of store.entries()) {
                if (!idsFromPayload.has(id)) {
                    store.delete(id)
                    logger.debug(`Deleted stale entry ${id} from the datastore`)
                }
            }

        },
        schema: z.object({
            id: z.union([z.string(), z.number()]),
        }).passthrough()
    }
}