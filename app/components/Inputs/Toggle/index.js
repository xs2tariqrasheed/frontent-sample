import React from 'react';
import { Label } from './styled';

const Toggle = props => (
  <Label>
    <input type="checkbox" {...props} />
    <div />
  </Label>
);

export default Toggle;
