import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styled';

const Checkbox = ({ label, ...rest }) => (
  <Wrapper>
    {typeof label === 'string' ? label : ''}
    <input type="checkbox" {...rest} />
    <span />
  </Wrapper>
);

Checkbox.propTypes = {
  label: PropTypes.string,
};

export default Checkbox;
