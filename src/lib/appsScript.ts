/**
 * Server-only Apps Script Web App URL. Never imported by client components -
 * only the two route handlers under src/app/api/ read this. Set the real
 * value in `.env.local` (dev) or the hosting platform's environment
 * variables (production) as APPS_SCRIPT_URL. See
 * google-apps-script/DEPLOYMENT.md for how to obtain the URL.
 */
export const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL ?? "";
