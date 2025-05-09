import { Button, type ButtonProps } from '#components/react/ui/button.jsx'
import { cn } from '#util/ui.js'
import React from 'react'

import type { Page, Post } from 'app-payload/types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <a className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </a>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <a className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </a>
    </Button>
  )
}
