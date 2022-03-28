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
    defaultMessage: 'Training Coming Soon! Sign Up Now!',
  },
  paragraph: {
    id: `${scope}.paragraph`,
    defaultMessage:
      'List your golfer as a trainer and earn. Train your golfer up as a way to level up fast before Season 2 kicks off!',
  },
});
