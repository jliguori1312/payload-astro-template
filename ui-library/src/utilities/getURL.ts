import canUseDOM from "./canUseDOM.ts";

export const getServerSideURL = (options: { type: 'frontend' | 'backend' }): string => {
  if (options.type === 'backend') {
    return import.meta.env.PUBLIC_BACKEND_BASE_URL
  }
  return import.meta.env.PUBLIC_FRONTEND_BASE_URL
  
};

export const getClientSideURL = (options: { type: 'frontend' | 'backend' }) => {
 
  if (options.type === 'backend') {
    return import.meta.env.PUBLIC_BACKEND_BASE_URL
  }

  if (canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ""}`;
  }

  return process.env.PUBLIC_FRONTEND_BASE_URL || "";
};
