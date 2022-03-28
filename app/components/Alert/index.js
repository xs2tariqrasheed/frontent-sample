import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

const Alert = props => <Container {...props}>{props.message}</Container>;

Alert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.any,
};

export default Alert;
