/*
 * Social Media
 *
 * Social media bar
 *
 */

import React from 'react';

import { SocialLink } from './styled';

export default () => (
  <div className="inline-block align-middle">
    <div className="md:text-right">
      <SocialLink href="https://twitter.com/BlockleteGames" target="_blank">
        <i className="fab fa-twitter" />
      </SocialLink>
      <SocialLink href="https://discord.gg/hy7cRwhCfW" target="_blank">
        <i className="fab fa-discord" />
      </SocialLink>
    </div>
  </div>
);
