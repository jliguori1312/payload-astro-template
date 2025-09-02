import { cn } from '#util/ui.js'
import React from 'react'

import type { Props as MediaProps } from '../types.js'

import { getServerSideURL } from '#util/getURL.js'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  if (resource && typeof resource === 'object') {
    const { filename } = resource

    return (
      <video
        autoPlay
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
      >
        <source src={`${getServerSideURL({type: 'frontend'})}/media/${filename}`} />
      </video>
    )
  }

  return null
}
