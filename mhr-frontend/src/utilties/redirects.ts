import { config as payloadConfig } from 'mhr-payload'
import { getPayload } from 'payload'

export async function getRedirects(depth = 1) {
    const payload = await getPayload({ config: payloadConfig })

    const { docs: redirects } = await payload.find({
        collection: 'redirects',
        depth,
        limit: 0,
        pagination: false
    })

    // return redirects in astro format, ensuring the from slug includes a '/'
    return redirects.reduce((acc, redirect) => {
        const { from, to } = redirect
        const formattedFrom = from.startsWith('/') ? from : `/${from}`

        if (to?.type === 'reference') {
            acc[formattedFrom] = to.reference?.value.slug
        }
        

    }, {})
}