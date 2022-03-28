/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalFooter, ModalHeader } from './styled';

export function Popup(props) {
  return (
    <>
      <Modal show={props.show} size={props.size} centered={props.center}>
        {props.header && (
          <ModalHeader>
            <Modal.Header>
              <Modal.Title
                style={{ fontWeight: '700', fontSize: '24px' }}
                className="font-display"
              >
                {props.title}
              </Modal.Title>
              <Button
                type="button"
                className="close"
                aria-hidden="true"
                onClick={() => {
                  props.onHide();
                }}
              >
                ×
              </Button>
            </Modal.Header>
          </ModalHeader>
        )}
        <Modal.Body>{props.children}</Modal.Body>
        {props.footer && (
          <ModalFooter>
            <Modal.Footer>{props.footercontent}</Modal.Footer>
          </ModalFooter>
        )}
      </Modal>
    </>
  );
}

export default memo(Popup);
