/*
 * NewsletterSection Messages
 *
 * This contains all the text for the NewsletterSection container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NewsletterSection';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Pro Gear and Pro Shops Coming Soon! Sign Up Now!',
  },
  paragraph: {
    id: `${scope}.paragraph`,
    defaultMessage:
      'Be the first to know when we release new golfers and events!',
  },
});
