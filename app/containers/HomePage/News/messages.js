/*
 * NewsCard Messages
 *
 * This contains all the text for the NewsCard component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.News';

export default defineMessages({
  sectionTitle: {
    id: `${scope}.sectionTitle`,
    defaultMessage: 'News & Updates',
  },
  updates: {
    oneTitle: {
      id: `${scope}.updates.oneTitle`,
      defaultMessage: 'How to choose your golfer',
    },
    oneLabel: {
      id: `${scope}.updates.oneLabel`,
      defaultMessage: 'Nonfungible.com gives tips on choosing golfers',
    },
    oneMessage: {
      id: `${scope}.updates.oneMessage`,
      defaultMessage:
        'We have identified what we believe to be the best strategy to date to build a great team of golfers.',
    },
    twoTitle: {
      id: `${scope}.updates.twoTitle`,
      defaultMessage: 'Check out who we are and what we stand for.',
    },
    twoLabel: {
      id: `${scope}.updates.twoLabel`,
      defaultMessage: 'A Deep Dive into Blocklete Games™',
    },
    twoMessage: {
      id: `${scope}.updates.twoMessage`,
      defaultMessage:
        'Blockchain technology is at the core of all of our game and tech solutions because of what it enables — a player-driven game economy.',
    },
    threeTitle: {
      id: `${scope}.updates.threeTitle`,
      defaultMessage: 'Our first 500 minted golfers have their own tournament!',
    },
    threeLabel: {
      id: `${scope}.updates.threeLabel`,
      defaultMessage: 'First Tournament Announcement',
    },
    threeMessage: {
      id: `${scope}.updates.threeMessage`,
      defaultMessage:
        'Only golfer tokens 1–500 are able to enter this event. The tournament prize pot is set at $1,000!',
    },
  },
});
