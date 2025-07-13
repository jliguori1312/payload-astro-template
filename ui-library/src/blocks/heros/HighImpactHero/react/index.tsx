
import type { Page } from 'app-payload/types'

import { CMSLink } from '#components/react/Link/index.jsx'
import { Media } from '#components/react/Media/index.jsx'
import RichText from '#components/react/RichText/index.jsx'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media imgClassName="-z-10 object-cover absolute h-full w-full inset-0" priority resource={media} />
        )}
      </div>
    </div>
  )
}
//position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;