/*
 * WalletBlock
 *
 * Block on details page for purchase buttons if you are not the owner.
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  checkIfBlockletesAlreadySetup,
  setupAccount,
  setupAccountForFusd,
} from 'utils/flow/flowConnector';
import { setFlowNewUser } from 'containers/Header/NavBar/UserLink/actions';
import * as fcl from '@onflow/fcl';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { getGolferDetails } from '../actions';
import { apiLocation } from '../../config';
import { getSession } from '../../utils/session';
import walletButton from '../../images/buttons/buttons-desktop-green-create-wallet.svg';

const WalletBlock = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ loggedIn: null });

  const connectAndAuthenticateFlow = async () => {
    await fcl.currentUser().authenticate();
    await fcl.currentUser().subscribe(setUser);
  };

  const purchaseProcess = async () => {
    const status = await checkIfBlockletesAlreadySetup(user.addr);

    if (!status) {
      // I would like to add a check for the vault and it there just not try this at all.
      await setupAccountForFusd();
      await setupAccount();

      if (process.env.FLOW_MODE === 'emulator') {
        const session = getSession();
        console.log('Token is = ', session.itasToken);
        const res = await fetch(
          `${apiLocation}/private/emulator/medals/issue`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session.itasToken}`,
            },
          },
        );
        await res.json();
      }
    }
  };

  useEffect(() => {
    if (user.addr) {
      props.dispatch(setFlowNewUser(user.addr)); // Need to check and then update to just set it.
      purchaseProcess();
    }
  }, [user.addr]);

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => {
          props.handleWalletModal();
          props.buttonDisable();

          return connectAndAuthenticateFlow();
        }}
      >
        <img src={walletButton} alt="wallet button" />
      </button>
    </>
  );
};

WalletBlock.propTypes = {
  dispatch: PropTypes.any,
};

// export default WalletBlock;

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(WalletBlock);
