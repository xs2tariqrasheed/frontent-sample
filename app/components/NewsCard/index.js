/**
 *
 * NewsCard
 *
 */

import React, { memo } from 'react';
import { object, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

function NewsCard({ link, picture, label, title, message }) {
  return (
    <article className="bg-white rounded overflow-hidden shadow mb-5 sm:mb-0">
      <a target="_blank" href={link} className="no-underline">
        <img className="w-full" src={picture} alt="" />
        <FormattedMessage {...label}>
          {txt => (
            <h2 className="ribbon-cap tracking-wide pl-6 py-1 pr-2 bg-yellow-itas-dark-gold text-itas-dark-purple uppercase text-xs font-heavy">
              {txt}
            </h2>
          )}
        </FormattedMessage>
        <div className="px-6 py-4">
          <FormattedMessage {...title}>
            {txt => (
              <h1 className="font-bold mb-2 text-sm text-itas-lavender">
                {txt}
              </h1>
            )}
          </FormattedMessage>
          <FormattedMessage {...message}>
            {txt => <p className="text-sm text-black">{txt}</p>}
          </FormattedMessage>
        </div>
      </a>
    </article>
  );
}

NewsCard.propTypes = {
  link: string.isRequired,
  picture: string.isRequired,
  label: object.isRequired,
  title: object.isRequired,
  message: object.isRequired,
};

export default memo(NewsCard);
