// Approved reviews shown on the home page (index.html#reviews).
//
// Reviews arrive through the "review" Netlify form and are only published
// after you approve them. To publish one:
//
//   1. In Netlify, open the site → Forms → review and read the submission.
//      Skip spam, abuse, personal information, piracy requests and anything
//      the reviewer didn't consent to publish (the "consent" field).
//   2. Add it below, newest first. Copy the text as written; you may trim it
//      or fix obvious typos, but don't change its meaning.
//   3. Run `node tools/build-reviews.js` (`npm run build` also runs it), check
//      the page, commit and push.
//
// To take a review down, delete its entry and rebuild. Delete the submission
// in Netlify too if the reviewer asks for their data to be removed.
//
// Fields (all required):
//   name      display name as submitted, at most 40 characters
//   rating    whole number from 1 to 5
//   platform  "android", "tv" or "windows"
//   date      submission date, YYYY-MM-DD
//   text      review text, at most 600 characters, plain text only

const reviews = [];

module.exports = { reviews };
