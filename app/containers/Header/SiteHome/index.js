/*
 * Icon for home page
 *
 * Icon for home page
 *
 */

import React from 'react';
import { Label, HomeLogo } from './styled';
import { BlockleteLogo } from '../../../components/Icons';

export default props => (
  <h1 {...props} className="items-center">
    <HomeLogo>
      <Label to="/">
        <BlockleteLogo />
      </Label>
    </HomeLogo>
  </h1>
);
