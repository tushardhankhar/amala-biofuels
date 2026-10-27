export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/**
 * Review markers (draft-copy badges) are opt-in for any build, so neither the
 * production site nor a normal local preview shows them. Set
 * NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true on a staging deploy for client sign-off.
 */
export const showContentFlags = process.env.NEXT_PUBLIC_SHOW_CONTENT_FLAGS === "true";
