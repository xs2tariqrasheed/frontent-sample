import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import TextInput from 'components/Inputs/Text';
import { transferBlocklete } from 'utils/flow/flowConnector';
import { getBadgeSvg, getPlayerType } from 'utils/playerType';
import Modal from '../Modal/index'
import GolferImage from '../GolferImage';
import close from '../../images/marketplace/icons-close.svg'
import { ModalActionButton } from './styled';

const LobbyGiftModal = props => {
  const [toAddress, setToAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalButtonDisabled, setModalButtonDisabled] = useState(false);

  const collectibleType = props.golferDetails.GolfType.class;
  const playerType = getPlayerType(props.golferDetails);

  /*eslint-disable*/
  return (
    <Modal
      title="Gift Your Golfer"
      onOpen={props.onOpen}
      callbackClose={props.callbackClose}
      lobbyModal={true}
    >

      <div className="grid gap-4">
        <div className='flex justify-between mx-5 mt-4'>
            <p className='text-dark-indigo text-2xl font-black m-0'>Give the Gift of Golf</p>
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
          <p className='ml-5 mr-5 font-light text-sm mb-0'>Send this golfer to your friend or frenemy! Either way, you won't regret it!</p>
          <div className='ml-5 mr-5'>
            <p className='font-black text-dark-indigo mb-2'>Enter Wallet Address</p>
            <input 
              className='border-2 w-full rounded-lg p-3'
              id="gift-address-input"
              name="address"
              value={toAddress}
              onChange={event => setToAddress(event.target.value)}
            />
          </div>
          <ModalActionButton disabled={modalButtonDisabled} className="text-center mx-auto mb-2">
            <a
              onClick={() => {
                if(!modalButtonDisabled) {
                  setModalButtonDisabled(true);
                  setError('');
                  setLoading(true);
    
                  if (!toAddress) {
                    setLoading(false);
                    setError('Address cannot be empty.');
                    return;
                  }
                  
                  return transferBlocklete(toAddress, props.tokenId)
                    .then(() => {
                      window.dataLayer.push({
                        event: 'gift golfer',
                        event_source_page: window.location.href,
                        event_version: 'v2',
                        golfer_type: collectibleType,
                        item_description: 'golfer ' + collectibleType,
                      });
                      setLoading(false);
                      props.completeGiftProcess();
                      props.callbackClose();
                      setTimeout(() => {
                        setModalButtonDisabled(false);
                      }, 5000)
                    })
                    .catch(err => {
                      setError(err);
                    });
                  }
              
              } }
            >
              <div className='inner-circle'></div>
              <div className='inner-shadow'></div>
              <p className='button-text text-white text-lg font-bold'>Instant Karma!</p>
            </a>
        </ModalActionButton>
      </div>
    
    </Modal>
  );
  /* eslint-enable */
};

LobbyGiftModal.propTypes = {
  callbackClose: PropTypes.func,
  completeGiftProcess: PropTypes.func,
  onOpen: PropTypes.bool,
  tokenId: PropTypes.number,
};

export default LobbyGiftModal;
