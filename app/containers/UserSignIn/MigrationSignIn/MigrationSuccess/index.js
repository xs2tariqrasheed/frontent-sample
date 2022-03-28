/*
 * User Link
 *
 * User Link Item
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import * as fcl from '@onflow/fcl';
import saga from '../UserLink/saga';
import { setFlow } from '../UserLink/actions';
import Layout from '../../../Layout';
import { SuccessWrapper, Background } from '../../styled';
import RandomGolferImage from '../../../../components/RandomGolferImage';
import clubhouseButton from '../../../../images/buttons/buttons-desktop-green-clubhouse.svg';
import marketplaceButton from '../../../../images/buttons/buttons-desktop-green-marketplace.svg';

const UserLink = props => {
  useInjectSaga({ key: 'blocklete_header_userlink', saga });

  const { onSetFlowAddress } = props;

  const [user, setUser] = useState({ loggedIn: null });
  const [newAccount, setNewAccount] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  window.dataLayer.push({
    event: 'flow migration success',
    event_source_page: window.location.href,
    event_version: 'v2',
  });

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
      .put('challenge.handshake', process.env.FLOW_HANDSHAKE_ENDPOINT_EMU)
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
    <Layout>
      <Helmet>
        <title>Migration Success</title>
        <meta
          name="Blocklete Games™ Migration Success"
          content="Successfully Migrated Golfers for Blocklete Games™."
        />
      </Helmet>
      <div className="lg:h-900 xs:h-auto">
        <Background>
          <SuccessWrapper>
            <div>
              <h1 className="text-4xl font-black leading-none text-purple-400">
                SUCCESS!
              </h1>
              <h1 className="text-4xl font-black leading-none text-purple-400 mb-4">
                You have moved your golfers.
              </h1>
              <p className="font-display text-base mb-6">
                You have moved your golfers over to Flow. You can buy, sell and
                play the game now!
              </p>
              <div className="text-center">
                <Link to="/clubhouse">
                  <button type="submit" className="mb-4">
                    <img src={clubhouseButton} alt="clubhouse button" />
                  </button>
                </Link>
                <button type="submit" className="mb-4">
                  <img src={marketplaceButton} alt="marketplace button" />
                  <Link to="/playtoearn" />
                </button>
              </div>
            </div>
          </SuccessWrapper>
          <div className="golfersHolder">
            <RandomGolferImage />
          </div>
        </Background>
      </div>
    </Layout>
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
