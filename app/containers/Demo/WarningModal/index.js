import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  HeaderBox,
  Title,
  WarningText,
  OkayButton,
  OkayShadow,
} from './styled';

const WarningModal = props => (
  <Modal open={props.onOpen}>
    <div>
      <HeaderBox>
        <div align="center">
          <Title>Welcome!</Title>
        </div>
      </HeaderBox>
      <WarningText>
        This golfer is available to purchase and enter into tournaments with
        real prize money!
      </WarningText>
      <div align="center">
        <OkayButton onClick={() => props.callbackClose()}>Okay</OkayButton>
        <OkayShadow />
      </div>
    </div>
  </Modal>
);

WarningModal.propTypes = {
  callbackClose: PropTypes.func,
  onOpen: PropTypes.bool,
};

export default WarningModal;
