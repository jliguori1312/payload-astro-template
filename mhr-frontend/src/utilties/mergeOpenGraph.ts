import { getServerSideURL } from "@/utilities/getURL";

type OpenGraphMetadata = {
  type?: string;
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
};

const defaultOpenGraph: OpenGraphMetadata = {
  type: "website",
  description: "An open-source website built with Payload and Next.js.",
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: "Payload Website Template",
  title: "Payload Website Template",
};

export const mergeOpenGraph = (og?: OpenGraphMetadata): OpenGraphMetadata => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
