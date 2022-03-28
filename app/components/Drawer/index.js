import React from 'react';
import ModalPortal from 'components/ModalPortal';
import PropTypes from 'prop-types';
import { Panel } from './styled';

const Drawer = props => (
  <ModalPortal>
    <Panel
      isOpen={props.isOpen}
      isRight={props.isRight}
      isLarge={props.isLarge}
    >
      {props.children}
    </Panel>
  </ModalPortal>
);

Drawer.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  isRight: PropTypes.bool,
  isLarge: PropTypes.bool,
  // onClose: PropTypes.any,
};

export default Drawer;
export const LocklessDrawer = Drawer;
