/**
 * Single source of truth for the conference PDFs the site links out to.
 *
 * Drop the PDF into `public/docs/` and put its path here — every button on
 * the site reads from this file, so nothing else needs to change.
 *
 * Leave a value as an empty string to keep that button in its disabled
 * "coming soon" state (see DocLink.tsx / RegisterLink.tsx).
 */

/** Per-theme description PDFs, keyed by the exact theme title. */
export const THEME_PDFS: Record<string, string> = {
  "Role of Science and Technology in Agrarian and Rural Transformation": "",
  "Policies and Practices in Rural and Agrarian Development": "",
  "Inequality and Deprivation in the Countryside": "",
  "The Dynamics of Farm–Non-Farm Linkages": "",
  "Agriculture as an Arena of Human–Nature Interaction": "",
};

/** Submission guidelines PDF, linked from the Call for Papers section. */
export const SUBMISSION_GUIDELINES_PDF = "";
