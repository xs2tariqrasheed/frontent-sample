/*
 * Wallet Block
 *
 */

import React from 'react';
import { useSelector } from 'react-redux';
import Img from 'components/Img';
import { WalletLabel, Wrapper } from './styled';
import WalletIcon from './wallet-icon.svg';

export default props => {
  let connectedWallet = useSelector(state => state.user.ethaddress);
  if (!connectedWallet || connectedWallet === '') {
    connectedWallet = 'Not Connected';
  }

  return (
    <Wrapper {...props}>
      <Img src={WalletIcon} alt="Wallet Icon" />
      <WalletLabel>{connectedWallet}</WalletLabel>
    </Wrapper>
  );
};
