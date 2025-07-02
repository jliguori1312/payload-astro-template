import type { Config } from 'app-payload/types'

import { config as configPromise } from 'app-payload'
import { getPayload } from 'payload'

type Global = keyof Config['globals']

export async function getGlobal(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}
