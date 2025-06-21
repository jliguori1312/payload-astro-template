import type { Loader, LoaderContext } from 'astro/loaders'
import type { SanitizedConfig } from 'payload'
import { z } from 'astro:content'


export function payloadLocalLoader(options: { payloadConfig: SanitizedConfig }): Loader {
    // configure paylaod config
    return {
        name: 'pload-local-loader',
        load: async (context: LoaderContext): Promise<void> => {
            // get the payload collection and update the store
        }
    }
}