import React from 'react';
import PropTypes from 'prop-types';
import { Modal, CloseLink } from './styled';

const PowerModal = ({ title, para, onOpen, callbackClose }) => (
  <Modal
    open={onOpen}
    className="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
  >
    <div className="w-full max-w-lg xs:max-w-xs md:max-w-md">
      <header className="p-8 xs:p-4 relative">
        <h1 className="text-xl uppercase tracking-wide inline-block">
          {title}
        </h1>
        <CloseLink
          onClick={() => {
            callbackClose();
          }}
        />
      </header>

      <section className="md:p-8 xs:p-4">
        <div>
          <p>{para}</p>
        </div>
      </section>
    </div>
  </Modal>
);

PowerModal.propTypes = {
  callbackClose: PropTypes.func,
  onOpen: PropTypes.bool,
  title: PropTypes.string,
  para: PropTypes.string,
};

export default PowerModal;
