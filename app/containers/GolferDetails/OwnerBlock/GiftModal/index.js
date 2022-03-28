import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import TextInput from 'components/Inputs/Text';
import { transferBlocklete } from 'utils/flow/flowConnector';
import Modal from '../../../../components/Modal';

const GiftModal = props => {
  const [toAddress, setToAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /*eslint-disable*/
  return (
    <Modal
      onOpen={props.onOpen}
      callbackClose={props.callbackClose}
      error={error}
      title="Send this Blocklete™ Golfer to a friend."
    >
      <div className="flex justify-center">
        <div className="md:w-1/2">
          <div className="bg-white p-5 mb-5">
            <TextInput
              id="gift-address-input"
              label="Flow wallet address"
              name="address"
              placeholder="Flow wallet address"
              onChange={event => setToAddress(event.target.value)}
            />
          </div>
          <Button
            buttonLabel="Send"
            className="btn md:w-1/2 mx-auto block slim w-full"
            isLoading={loading}
            onClick={() => {
              setError('');
              setLoading(true);

              if (!toAddress) {
                setLoading(false);
                setError('Address cannot be empty.');
                return;
              }

              window.dataLayer.push({
                golferId: props.tokenId,
                event: 'gift golfer',
              });

              return transferBlocklete(toAddress, props.tokenId)
                .then(() => {
                  setLoading(false);
                  props.completeGiftProcess();
                  props.callbackClose();
                })
                .catch(err => {
                  setError(err);
                });
            }}
          />
        </div>
      </div>
    </Modal>
  );
  /* eslint-enable */
};

GiftModal.propTypes = {
  callbackClose: PropTypes.func,
  completeGiftProcess: PropTypes.func,
  onOpen: PropTypes.bool,
  tokenId: PropTypes.number,
};

export default GiftModal;
