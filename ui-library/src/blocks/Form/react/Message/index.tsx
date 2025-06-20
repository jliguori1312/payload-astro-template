import RichText from 'ui-library/component/react/RichText/index.jsx'
import React from 'react'

import { Width } from '../Width/index.tsx'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const Message: React.FC<{ message: SerializedEditorState }> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
