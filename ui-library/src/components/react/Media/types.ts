
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from 'app-payload/types'


export interface Props {
  alt?: string
  className?: string
  htmlElement?: ElementType | null
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean 
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number | null // for Payload media
  size?: string // for NextImage only
  src?: string // for static media
  width?: number // ^
  height?: number // ^
  operations?: object // for unpic provider settings
  options?: object // ^
  videoClassName?: string
}
