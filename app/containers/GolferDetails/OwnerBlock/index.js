/*
 * PurchaseBlock
 *
 * Block on details page for purchase buttons if you are not the owner.
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  setupAccount,
  checkIfMarketAccountAlreadySetup,
  cancelSaleOfBlocklete,
} from 'utils/flow/flowConnector';
import { getGolferDetails } from '../actions';
import GiftModal from './GiftModal';
import SaleModal from './SaleModal';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';

const OwnerBlock = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const [openUnlistModal, setOpenUnlistModal] = useState(false);
  const [accountSetupMarket, setAccountSetupMarket] = useState(false);

  const { price } = props;

  useEffect(() => {
    const checkMarketSetup = async () => {
      await checkIfMarketAccountAlreadySetup(props.flowaddress).then(status => {
        if (status) {
          setAccountSetupMarket(true);
        }
      });
    };

    checkMarketSetup();
  }, []);

  const buttonBlock = () => {
    if (!accountSetupMarket) {
      return (
        <>
          <h2 className="text-sm tracking-wide text-blueberry uppercase mb-5">
            Setup Flow Account
          </h2>
          <button
            type="button"
            className="btn slim w-full mb-2 font-body font-bold text-base text-center w-auto md:max-w-xs"
            onClick={async () =>
              setupAccount().then(resp => {
                if (resp && resp.status === 4) {
                  setAccountSetupMarket(true);
                }
              })
            }
          >
            Connnect to Marketplace
          </button>
        </>
      );
    }
    if (price > 0) {
      return (
        <>
          <h2 className="text-sm tracking-wide text-blueberry uppercase mb-5">
            Price: {price} USD
          </h2>
          <button
            type="button"
            className="btn slim w-full mb-2 font-body font-bold text-base text-center w-auto"
            onClick={() => setOpenUnlistModal(true)}
          >
            Unlist Golfer
          </button>
        </>
      );
    }

    return (
      <>
        <button
          type="button"
          disabled={!props.flowaddress}
          className="btn slim w-full mb-2 font-body font-bold text-base text-center w-auto"
          style={{ marginRight: '10px' }}
          onClick={() => setOpenGiftModal(true)}
        >
          Gift
        </button>
        <button
          type="button"
          disabled={!props.flowaddress}
          className="btn slim w-full mb-2 font-body font-bold text-base text-center w-auto"
          onClick={() => setOpenSaleModal(true)}
        >
          Sell
        </button>
      </>
    );
  };

  return (
    <>
      <GiftModal
        onOpen={openGiftModal}
        tokenId={props.tokenId}
        callbackClose={() => setOpenGiftModal(false)}
        completeGiftProcess={() =>
          props.dispatch(getGolferDetails(props.tokenId))
        }
      />
      <SaleModal
        callbackClose={() => setOpenSaleModal(false)}
        tokenId={props.tokenId}
        onOpen={openSaleModal}
        completeSaleList={() => props.dispatch(getGolferDetails(props.tokenId))}
      />
      <Modal
        title="Unlist Your Golfer"
        onOpen={openUnlistModal}
        callbackClose={() => setOpenUnlistModal(false)}
      >
        <p className="mb-5">
          Are you sure you want to unlist your golfer? Your golfer will no
          longer be listed for sale on the Marketplace.
        </p>

        <div className="flex flex-col items-center">
          <button
            type="button"
            disabled={isLoading}
            className="btn w-1/3 mb-3"
            onClick={async () => {
              setIsLoading(true);
              return cancelSaleOfBlocklete(props.tokenId)
                .then(() => {
                  props.dispatch(getGolferDetails(props.tokenId));
                })
                .then(() => {
                  setOpenUnlistModal(false);
                  setIsLoading(false);
                })
                .catch(() => {
                  setIsLoading(false);
                });
            }}
          >
            {!isLoading ? 'Yes' : <Spinner />}
          </button>
          <button
            type="button"
            onClick={() => setOpenUnlistModal(false)}
            className="btn btn-outline w-1/3"
          >
            No
          </button>
        </div>
      </Modal>
      {buttonBlock()}
    </>
  );
};

OwnerBlock.propTypes = {
  dispatch: PropTypes.func,
  tokenId: PropTypes.number,
  price: PropTypes.number,
  flowaddress: PropTypes.string,
};

export default OwnerBlock;
