import canUseDOM from "./canUseDOM.ts";

export type Env = 
  | { DEV?: boolean; SITE?: string; SITE_URL?: string }          // Vite/Astro
  | { NODE_ENV?: string; SITE_URL?: string }; // Node/Payload

/**
 * Get the base URL from a single env object.
 * @param env  Either `import.meta.env` or `process.env`
 * @param devUrl Optional override for dev (default: 'http://localhost:3000')
 */

export const getServerSideURL = (env: Env, devUrl = "http://localhost:3000"): string => {
  // For dev environments, use the dev URL.
  if (
    ('DEV' in env && env.DEV) ||
    ('NODE_ENV' in env && env.NODE_ENV === 'development')
  ) {
    return env.SITE_URL ? env.SITE_URL : devUrl;
  }

  // For Astro (Vite) environments, use the SITE env.
  if ('SITE' in env && env.SITE) {
    return env.SITE;
  }

  // For Node/Payload environments, use the SITE_URL env.
  if ('SITE_URL' in env && env.SITE_URL) {
    return env.SITE_URL;
  }

  return devUrl
  
};

export const getClientSideURL = () => {
 
  // if (import.meta.env.DEV) {
  //   return "http://localhost:3000";
  // }
  if (canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ""}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || "";
};
