/**
 * Single source of truth for the two Google Forms this site links out to.
 * Paste the real form URLs here once they exist — every "Register Now" /
 * "Submit Abstract" button on the site reads from here, so nothing else
 * needs to change.
 *
 * Leave a value as an empty string to keep that button in its disabled
 * "coming soon" state (see RegisterLink.tsx).
 */
export const GOOGLE_FORMS = {
  /** Delegate registration (attendance, fees) */
  delegateRegistration:
    "https://docs.google.com/forms/d/e/1FAIpQLSeRPvlx-SOrrmHde5YyJmqkV2_YUhwy8thNwcp3LtDzgZEBwg/viewform?usp=publish-editor",
  /** Paper / abstract submission (Call for Papers) */
  paperSubmission:
    "https://docs.google.com/forms/d/e/1FAIpQLSfycTGOiTzpb4fF9C1TTDi6hcNu4DUY2cmWUrOt8m9QjoL7Kg/viewform?usp=publish-editor",
};
