/**
 *
 * EventCard
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';
import PrivateInviteModal from '../PrivateInviteModal';
import buttonCopy from './button-copy.svg';
import UserModal from '../../containers/UserModal';

function PrivateInviteCard({ userId }) {
  const [openPrivateModal, setOpenPrivateModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [newAccount, setNewAccount] = useState(false);

  return (
    <>
      <UserModal
        tag="event"
        newAccount={newAccount}
        onOpen={openLoginModal}
        callbackClose={() => setOpenLoginModal(false)}
        callbackSwitch={() => {
          if (!newAccount) {
            let tempObj = {
              event: 'create account',
              type: 'modal',
            };
            try {
              Bootstrapper.PubSub.publish('interaction', tempObj); // eslint-disable-line
            } catch {
              tempObj = {
                event: 'create account',
                type: 'modal',
              };
            }
          } else {
            let tempObj = {
              event: 'sign in',
              type: 'modal',
            };
            try {
              Bootstrapper.PubSub.publish('interaction', tempObj); // eslint-disable-line
            } catch {
              tempObj = {
                event: 'sign in',
                type: 'modal',
              };
            }
          }
          setNewAccount(!newAccount);
        }}
      />
      <PrivateInviteModal
        onOpen={openPrivateModal}
        callbackClose={() => setOpenPrivateModal(false)}
        userId={userId}
      />

      <Container
        onClick={() => {
          if (!userId) {
            return setOpenLoginModal(true);
          }
          return setOpenPrivateModal(true);
        }}
        className="p-5 flex items-center justify-center flex-col"
      >
        <p className="text-cornflower font-heavy text-base">
          Create Your Own Challenge
        </p>
        <img className="mt-2" src={buttonCopy} alt="button copy" />
      </Container>
    </>
  );
}

PrivateInviteCard.propTypes = {
  userId: PropTypes.string,
};

export default PrivateInviteCard;
