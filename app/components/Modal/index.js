/**
 *
 * Modal
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CloseLink } from '../PracticeModal/styled';
import { ModalContainer } from './styled';
import ErrorRibbon from '../ErrorRibbon';

function Modal({ title, subtitle, onOpen, children, callbackClose, error, lobbyModal }) {
  return (
    <ModalContainer
      open={onOpen}
      className="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75 bg-blueberry"
      lobbyModal={lobbyModal}
    >
      <div className="w-full max-w-4xl mx-3 sm:mx-8">
        {!lobbyModal && (
          <header className="p-8 relative bg-white">
          <div className="flex items-center justify-center">
            <h1 className="text-xl w-1/2 text-center uppercase text-blueberry tracking-wide">
              {title}
            </h1>
            <CloseLink
              className="absolute right-0 mr-3 sm:mr-8"
              onClick={() => {
                callbackClose();
              }}
            />
          </div>
          {subtitle && (
            <p className="text-center text-blueberry text-sm">{subtitle}</p>
          )}
        </header>
        )}
        {error && (
          <ErrorRibbon error className="container mx-auto w-1/2 mt-5">
            {error}
          </ErrorRibbon>
        )}
        {children && (
          <section className={!lobbyModal && 'p-5 md:p-10'}>{children}</section>
        )}
      </div>
    </ModalContainer>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  callbackClose: PropTypes.func.isRequired,
  onOpen: PropTypes.bool,
  children: PropTypes.any,
  error: PropTypes.string,
};

export default memo(Modal);
