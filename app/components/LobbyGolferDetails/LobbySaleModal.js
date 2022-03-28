import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { listBlockleteForSale } from 'utils/flow/flowConnector';
import { getBadgeSvg, getPlayerType } from 'utils/playerType';
import Modal from '../Modal/index';
import GolferImage from '../GolferImage';
import close from '../../images/marketplace/icons-close.svg'
import { ModalActionButton } from './styled';

const LobbySaleModal = props => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalButtonDisabled, setModalButtonDisabled] = useState(false);

  const collectibleType = props.golferDetails.GolfType.class;
  const playerType = getPlayerType(props.golferDetails);
  
  return (
    <Modal
      title="Sell Your Golfer"
      onOpen={props.onOpen}
      error={error}
      callbackClose={props.callbackClose}
      lobbyModal={true}
    >
      <div className="grid gap-4">
        <div className='flex justify-between mx-5 mt-4'>
          <p className='text-dark-indigo text-2xl font-black m-0'>List Your Golfer</p>
          <img
            onClick={() => {
              props.callbackClose();
            }}
           src={close}
           />
        </div>
        <div className="w-full overflow-hidden" style={{backgroundImage: 'url(' + props.background + ')', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', minHeight: '300px'}}>
          <img
            src={getBadgeSvg(collectibleType)}
            alt={`${playerType} player icon`}
            className={"ml-auto mt-5 mr-5 w-20 h-16"}
          />
            <div className='h-2/3 mx-auto'>
              {props.golferDetails && (
                <GolferImage
                  image_url={JSON.parse(props.golferDetails.traits).image_url}
                  style={{left: '100px', top: '-50px', width: '30%'}}
                />
              )}
              
          </div>
        </div>
        <p className={props.large ? 'font-light text-sm ml-20' : 'font-light text-sm ml-5'}>List your golfer by adding a price in U.S. Dollars. We will automatically list your golfer.</p>
        <div className='w-4/5 mx-auto'>
          <p className='text-dark-indigo font-black'>Enter Price</p>
            <input 
              id="sale-price-input"
              className='border-2 w-full rounded-lg p-3'
              name="price"
              placeholder="0.00"
              value={price}
              onChange={event => setPrice(event.target.value)}
            />
        </div>
        
        <ModalActionButton disabled={modalButtonDisabled} className="text-center mx-auto">
          <a
            onClick={() => {
              if (!modalButtonDisabled) {
                setModalButtonDisabled(true);
                setLoading(true);
                setError('');
                if (price <= 1) {
                  setModalButtonDisabled(false);
                  setLoading(false);
                  return setError('Price must be greater than One.');
                }

                const priceNormalization = Number(price).toFixed(2);

                return listBlockleteForSale(props.tokenId, priceNormalization)
                  .then(() => {
                    window.dataLayer.push({
                      event: 'sell golfer',
                      event_source_page: window.location.href,
                      event_version: 'v2',
                      golfer_type: collectibleType,
                      listed_price: `${price} USD`,
                      item_description: 'golfer ' + collectibleType,
                    });
                    
                    setModalButtonDisabled(false);
                    setLoading(false);
                    props.completeSaleList();
                    props.callbackClose();
                  })
                  .catch(err => {
                    setError(err);
                    setModalButtonDisabled(false);
                    setLoading(false);
                  });
              }
            }}
          >
            <div className='inner-circle'></div>
            <div className='inner-shadow'></div>
            <p className='button-text text-white text-lg font-bold'>Let's Make Money</p>
          </a>
        </ModalActionButton>
        
      </div>
    </Modal>
  );
};

LobbySaleModal.propTypes = {
  callbackClose: PropTypes.func,
  completeSaleList: PropTypes.func,
  onOpen: PropTypes.bool,
  tokenId: PropTypes.number,
};

export default LobbySaleModal;
