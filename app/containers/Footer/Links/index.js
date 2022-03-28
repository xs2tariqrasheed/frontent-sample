/*
 * Social Media
 *
 * Social media bar
 *
 */

import React from 'react';

import { Link, Wrapper } from './styled';

export default () => (
  <Wrapper>
    <div align="right">
      <Link href="/terms-of-service">Terms of Service&nbsp;&nbsp;</Link>
      <Link href="/privacy">|&nbsp;&nbsp;Privacy Policy</Link>
    </div>
  </Wrapper>
);
