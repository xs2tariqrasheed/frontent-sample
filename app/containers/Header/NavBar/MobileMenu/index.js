/*
 * User Link
 *
 * User Link Item
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RiCloseCircleFill } from 'react-icons/ri';
import { GiAlliedStar } from 'react-icons/gi';
import { GoPencil } from 'react-icons/go';
import Drawer from 'components/Drawer';
import RandomGolferImage from 'components/RandomGolferImage';
import { connect } from 'react-redux';
import UserModal from '../../../UserModal';
import { auth } from '../../../../firebaseWrapper';
import blockleteLogoWhite from '../../../../components/Icons/BlockleteLogoWhite.svg';
import {
  GenericLink,
  MobileNav,
  LoginWrapper,
  LoginButton,
  MedalsContainer,
  UserName,
  UserNameContainer,
  HelpDropdown,
  HelpDropdownContent,
  HelpLink,
} from './styled';
import { clearUserData, clearMyGolfers } from '../UserLink/ProfileMenu/actions';
import AppleAppStore from '../../../../images/apple-app-store-icon.svg';
import GoogleAppStore from '../../../../images/google-app-store-icon.svg';

const MobileMenu = props => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Drawer
      isOpen={props.isOpen}
      onClose={props.onClose}
      isRight={false}
      isLarge={false}
    >
      <div className="m-6">
        <Link to="/" className="inline-block">
          <img
            src={blockleteLogoWhite}
            alt="Blocklete logo"
            className="w-3/4"
          />
        </Link>
        <RiCloseCircleFill
          onClick={() => {
            props.onClose();
          }}
          className="inline-block h-8 w-8 align-baseline float-right"
          style={{ color: '#0ac47e' }}
        />
      </div>
      <MobileNav>
        {props.user.username === '' ? (
          <></>
        ) : (
          <>
            <UserNameContainer>
              <div className="inline-block mr-2">
                <UserName to="/profile">{props.user.username}</UserName>
              </div>
              <div
                className="inline-block align-text-bottom"
                style={{ color: '#fff', height: '18px', width: '18px' }}
              >
                <GoPencil />
              </div>
              <MedalsContainer>
                <div
                  className="inline-block align-middle"
                  style={{ color: '#fcea3b' }}
                >
                  <GiAlliedStar />
                </div>
                <p>
                  {props.medals.medals}/{props.medals.maxmedals}
                </p>
              </MedalsContainer>
            </UserNameContainer>
            <GenericLink to="/profile">Wallet</GenericLink>
            <GenericLink
              onClick={() => {
                props.migrateCallback();
              }}
              to='#'
            >
              Migrate to Flow
            </GenericLink>
          </>
        )}
        <GenericLink to="/playtoearn">Marketplace</GenericLink>
        {props.user.username === '' ? (
          <GenericLink to="/signin">Clubhouse</GenericLink>
        ) : (
          <GenericLink to="/clubhouse">Clubhouse</GenericLink>
        )}
        <HelpDropdown onClick={() => setOpenModal(!openModal)}>
          <GenericLink to="#" onClick={() => setOpenModal(!openModal)}>
            FAQ
          </GenericLink>
          <HelpDropdownContent
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          >
            <div>
              <div className="inline-block align-top w-3/5 mb-4">
                <p>About</p>
                <HelpLink
                  to={{ pathname: 'https://discord.gg/XP6t68NerX' }}
                  target="_blank"
                >
                  Flow FAQ
                </HelpLink>
                <HelpLink
                  to={{ pathname: 'https://discord.gg/czQWAduGaJ' }}
                  target="_blank"
                >
                  Buying & Selling
                </HelpLink>
              </div>
              <div className="inline-block align-top w-2/5">
                <p>Community</p>
                <HelpLink
                  to={{ pathname: 'https://discord.gg/XDJAJdr' }}
                  target="_blank"
                >
                  Discord
                </HelpLink>
                <HelpLink
                  to={{ pathname: 'https://twitter.com/BlockleteGames' }}
                  target="_blank"
                >
                  Twitter
                </HelpLink>
                <HelpLink
                  to={{
                    pathname: 'mailto:support@blockletegames.com',
                  }}
                  target="_blank"
                >
                  Contact Support
                </HelpLink>
              </div>
              <div>
                <p>App Coming Soon</p>
                {/* <Link
                  to={{ pathname: 'https://www.apple.com/app-store/' }}
                  target="_blank"
                > */}
                <img src={AppleAppStore} alt="Apple App Store" />
                {/* </Link> */}
                {/* <Link
                  to={{ pathname: 'https://play.google.com/store/apps' }}
                  target="_blank"
                > */}
                <img src={GoogleAppStore} alt="Google App Store" />
                {/* </Link> */}
              </div>
            </div>
          </HelpDropdownContent>
        </HelpDropdown>
        {props.user.username === '' ? (
          <></>
        ) : (
          <GenericLink to="/watchlist">Watchlist</GenericLink>
        )}
      </MobileNav>
      <RandomGolferImage />
      <LoginWrapper>
        {props.user.username === '' ? (
          <div className="text-center -mt-24">
            {/* eslint-disable-next-line react/button-has-type */}
            <Link to="/signin">
              <LoginButton className="inline-block no-underline text-center">
                Log In
              </LoginButton>
            </Link>
            <Link to="/signup-us">
              <LoginButton className="inline-block no-underline text-center">
                Sign Up
              </LoginButton>
            </Link>
          </div>
        ) : (
          <div className="-mt-96">
            <GenericLink
              onClick={() => {
                auth.signOut().then(() => {
                  props.dispatch(clearUserData());
                  props.dispatch(clearMyGolfers());
                });
              }}
              to='#'
            >
              Sign Out
            </GenericLink>
          </div>
        )}
      </LoginWrapper>
    </Drawer>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.any,
  dispatch: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapProps(store) {
  return {
    user: store.user,
    medals: store.headerInfo.medals,
  };
}

export default connect(
  mapProps,
  mapDispatchToProps,
)(MobileMenu);
