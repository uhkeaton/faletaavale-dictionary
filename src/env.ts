export const viteDataUrl = import.meta.env.VITE_DATA_URL || "/example.json";

export const viteAllowedParentOrigins = (JSON.parse(
  import.meta.env.VITE_ALLOWED_PARENT_ORIGINS,
) || []) as string[];
