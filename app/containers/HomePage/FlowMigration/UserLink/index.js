/*
 * User Link
 *
 * User Link Item
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import * as fcl from '@onflow/fcl';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import UserModal from '../../../UserModal';
import { Wrapper } from './styled';
import saga from './saga';
import { setFlow } from './actions';
import SeasonTwoWelcomeModal from '../../../SeasonTwoWelcome';

const UserLink = props => {
  useInjectSaga({ key: 'blocklete_header_userlink', saga });

  const { onSetFlowAddress } = props;

  const [user, setUser] = useState({ loggedIn: null });
  const [newAccount, setNewAccount] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  /* fcl.config()
    .put("env", "local")
    .put("accessNode.api", "http://localhost:8080")
    .put("discovery.wallet", "http://localhost:3000/fcl/authn")
    .put('challenge.handshake', "http://localhost:3000/fcl/authn")
    .put("app.detail.title", "Test Harness")
    .put("app.detail.icon", "https://i.imgur.com/r23Zhvu.png")
    .put("service.OpenID.scopes", "email email_verified name zoneinfo") */

  if (process.env.FLOW_MODE === 'emulator') {
    fcl
      .config()
      .put('accessNode.api', process.env.FLOW_ACCESS_API_EMU)
      .put('discovery.wallet', process.env.FLOW_HANDSHAKE_ENDPOINT_EMU)
      .put('challenge.handshake', process.env.FLOW_HANDSHAKE_ENDPOINT_EMU);
  } else if (process.env.FLOW_MODE === 'testnet') {
    fcl
      .config()
      .put('accessNode.api', process.env.FLOW_ACCESS_API_TESTNET)
      .put('discovery.wallet', process.env.FLOW_HANDSHAKE_ENDPOINT_TESTNET)
      .put('challenge.handshake', process.env.FLOW_HANDSHAKE_ENDPOINT_TESTNET)
      .put('service.OpenID.scopes', 'email email_verified name');
  } else if (process.env.FLOW_MODE === 'mainnet') {
    fcl
      .config()
      .put('accessNode.api', process.env.FLOW_ACCESS_API_MAINNET)
      .put('discovery.wallet', process.env.FLOW_HANDSHAKE_ENDPOINT_MAINNET)
      .put('challenge.handshake', process.env.FLOW_HANDSHAKE_ENDPOINT_MAINNET)
      .put('service.OpenID.scopes', 'email email_verified name');
  }

  // eslint-disable-next-line no-unused-vars
  const connectAndAuthenticateFlow = async () => {
    await fcl.currentUser().authenticate();
    await fcl.currentUser().subscribe(setUser);
  };

  useEffect(() => {
    if (user.addr) {
      onSetFlowAddress(user.addr); // Need to check and then update to just set it.
      setOpenModal(true);
    }
  }, [user.addr]);

  return (
    <Wrapper>
      {props.user.username === '' ? (
        <div className="inline-block">
          <Link to="/signinmigrate">
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="btn inline-block no-underline text-center text-white md:w-80 xs:w-80 md:mr-10 p-3 bg-green-400 xs:mr-0 xs:mt-6">
              Migrate Golfers
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

UserLink.propTypes = {
  user: PropTypes.object,
  onSetFlowAddress: PropTypes.func,
};

function mapProps(store) {
  return {
    user: store.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetFlowAddress: address => {
      dispatch(setFlow(address));
    },
  };
}

export default connect(
  mapProps,
  mapDispatchToProps,
)(UserLink);
