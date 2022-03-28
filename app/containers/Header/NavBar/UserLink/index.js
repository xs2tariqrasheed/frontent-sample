/*
 * User Link
 *
 * User Link Item
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BsStarFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import * as fcl from '@onflow/fcl';
import UserModal from '../../../UserModal';
import { Wrapper, LoginButton, WatchLink } from './styled';
import ProfileMenu from './ProfileMenu';
import saga from './saga';
import { setFlow } from './actions';
import SeasonTwoWelcomeModal from '../../../SeasonTwoWelcome';

const UserLink = props => {
  useInjectSaga({ key: 'blocklete_header_userlink', saga });

  const { onSetFlowAddress } = props;

  const [user, setUser] = useState({ loggedIn: null });
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
        <div className="hidden sm:block">
          {/* eslint-disable-next-line react/button-has-type */}
          <a href="/signin">
            <LoginButton className="inline-block no-underline text-center">
              Log In
            </LoginButton>
          </a>
          <a href="/signup-us">
            <LoginButton className="inline-block no-underline text-center">
              Sign Up
            </LoginButton>
          </a>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="inline-block hidden sm:inline-block">
            <div
              className="inline-block mr-2 align-text-top"
              style={{ color: '#322c8f' }}
            >
              <BsStarFill />
            </div>
            <WatchLink to="/watchlist">Watchlist</WatchLink>
          </div>
          <div className="inline-block">
            <ProfileMenu
              username={props.user.username}
              id={props.user.uuid}
              migrateCallback={() => {
                connectAndAuthenticateFlow();
              }}
            />
          </div>
          <div>
            {openModal && (
              <SeasonTwoWelcomeModal
                onOpen={openModal}
                callbackClose={() => setOpenModal(false)}
                flowaddress={user.addr}
              />
            )}
          </div>
        </div>
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
