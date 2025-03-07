import { config as payloadConfig } from "mhr-payload";
import { getPayload } from "payload";

export async function getRedirects(depth = 1) {
  const payload = await getPayload({ config: payloadConfig });

  const { docs: redirects } = await payload.find({
    collection: "redirects",
    depth,
    limit: 0,
    pagination: false,
  });

  // return redirects in astro format, ensuring slugs includes a preceeding '/'

  const astroRedirs = redirects.reduce((acc, redirect) => {
    const { from, to } = redirect;
    const formattedFrom = from.startsWith("/") ? from : `/${from}`;

    if (typeof to?.reference?.value !== "string" && to?.type === "reference") {
      const rawSlug = to?.reference?.value?.slug;
      const slug = rawSlug?.startsWith("/") ? rawSlug : `/${rawSlug}`;
      return {
        ...acc,
        [formattedFrom]: slug,
      };
    }

    return {
      ...acc,
      [formattedFrom]: to?.url,
    };
  }, {});

  return astroRedirs;
}
