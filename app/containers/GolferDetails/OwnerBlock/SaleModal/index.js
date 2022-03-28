import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import TextInput from 'components/Inputs/Text';
import { listBlockleteForSale } from 'utils/flow/flowConnector';
import Modal from '../../../../components/Modal';

const SaleModal = props => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Modal
      title="Sell Your Golfer"
      onOpen={props.onOpen}
      error={error}
      callbackClose={props.callbackClose}
    >
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-sm text-blueberry">
            Your golfer will be listed for sale. You can unlist your golfer at
            any time.{' '}
          </p>
        </div>
        <div className="bg-white p-5">
          <h2 className="mb-5 uppercase text-sm tracking-wide text-itas-dark-purple flex justify-center">
            Set USD Price
          </h2>
          <TextInput
            id="sale-price-input"
            name="price"
            placeholder="0.00"
            onChange={event => setPrice(event.target.value)}
          />
          <div className="grid grid-cols-2">
            <Button
              buttonLabel="Sell"
              color="#3b38c6"
              isLoading={loading}
              className="btn slim mr-3"
              onClick={() => {
                setLoading(true);
                setError('');
                if (price <= 1) {
                  setLoading(false);
                  return setError('Price must be greater than One.');
                }

                window.dataLayer.push({
                  golferId: props.tokenId,
                  listedPrice: `${price} USD`,
                  event: 'sell golfer',
                });

                const priceNormalization = Number(price).toFixed(2);

                return listBlockleteForSale(props.tokenId, priceNormalization)
                  .then(() => {
                    setLoading(false);
                    props.completeSaleList();
                    props.callbackClose();
                  })
                  .catch(err => {
                    setError(err);
                    setLoading(false);
                  });
              }}
            >
              Sell
            </Button>
            <button
              type="button"
              onClick={props.callbackClose}
              className="p-0 btn btn-outline bg-transparent"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <footer className="text-center mt-5">
        <p>
          <Link to="/terms-of-service" className="mr-5">
            Terms of Sale
          </Link>
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </footer>
    </Modal>
  );
};

SaleModal.propTypes = {
  callbackClose: PropTypes.func,
  completeSaleList: PropTypes.func,
  onOpen: PropTypes.bool,
  tokenId: PropTypes.number,
};

export default SaleModal;
