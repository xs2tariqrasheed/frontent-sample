/**
 *
 * WatchTrailerSection
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Wrapper } from './styled';
import golfer from './golferWoman1.svg';

function WatchTrailerSection() {
  return (
    <Wrapper className="bg-blueberry">
      <article className="container mx-auto px-5 pt-12 pb-24">
        <div className="lg:grid grid-cols-3 gap-10 lg:flex flex-row items-center justify-around">
          <FormattedMessage {...messages.header}>
            {txt => (
              <h1 className="w-64 callout-underline text-white mb-16 sm:text-4xl font-extrabold uppercase">
                {txt}
              </h1>
            )}
          </FormattedMessage>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <iframe
            title="trailer"
            className="w-full"
            src="https://player.vimeo.com/video/451524362"
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <img
            className="hidden lg:inline self-end  ml-50"
            style={{ justifySelf: 'center' }}
            src={golfer}
            alt="Female Golfer"
          />
        </div>
      </article>
    </Wrapper>
  );
}

WatchTrailerSection.propTypes = {};

export default memo(WatchTrailerSection);
