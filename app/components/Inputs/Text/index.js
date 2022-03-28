import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, ErrorMessage, InputWrapper } from './styled';

const Input = ({
  withRef,
  label,
  isLabelCentered,
  isSmall,
  error,
  isNotStyled,
  ...rest
}) => (
  <Container isNotStyled={isNotStyled}>
    {label && (
      <Label
        className="block text-gray-600 font-display tracking-wide text-sm pl-2 font-extrabold mb-2"
        isSmall={isSmall}
        isCentered={isLabelCentered}
      >
        {label}
      </Label>
    )}
    <InputWrapper>
      <input
        className={`${Boolean(error) &&
          'invalid-input'} appearance-none bg-white-200 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline`}
        ref={withRef}
        type="text"
        id={label}
        {...rest}
      />
    </InputWrapper>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Container>
);

Input.propTypes = {
  withRef: PropTypes.any,
  label: PropTypes.any,
  isLabelCentered: PropTypes.any,
  isSmall: PropTypes.any,
  error: PropTypes.any,
  isNotStyled: PropTypes.any,
};

export default Input;
