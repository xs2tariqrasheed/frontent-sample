/*
 * PurchaseBlock
 *
 * Block on details page for purchase buttons if you are not the owner.
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  purchaseBlocklete,
  checkIfBlockletesAlreadySetup,
  setupAccount,
  setupAccountForFusd,
} from 'utils/flow/flowConnector';
import { setFlow } from 'containers/Header/NavBar/UserLink/actions';
import * as fcl from '@onflow/fcl';
import { useStripe } from '@stripe/react-stripe-js';
import { getGolferDetails } from '../actions';
import { PurchaseArea } from './styled';
import { apiLocation } from '../../../config';
import { getSession } from '../../../utils/session';
import cryptoButton from '../../../images/buttons/buttons-desktop-green-golfer-details-crypto.svg';
import usdButton from '../../../images/buttons/buttons-desktop-green-golfer-details-usd.svg';

const P2PPurchaseBlock = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ loggedIn: null });
  const [isCredit, setIsCredit] = useState(false);

  const stripe = useStripe();

  const usdprice = props.price;

  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };

  const connectAndAuthenticateFlow = async () => {
    await fcl.currentUser().authenticate();
    await fcl.currentUser().subscribe(setUser);
  };

  const getEmailFromBlocto = services => {
    let email = 'test@blockletegames.com';
    for (let i = 0; i < services.length; i++) {
      if (services[i].scoped) {
        email = services[i].scoped.email;
        break;
      }
    }
    return email;
  };

  const purchaseProcess = async () => {
    const status = await checkIfBlockletesAlreadySetup(user.addr);

    if (!status) {
      // I would like to add a check for the vault and it there just not try this at all.
      await setupAccountForFusd();
      await setupAccount();

      if (process.env.FLOW_MODE === 'emulator' && !isCredit) {
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

    if (isCredit) {
      const email = getEmailFromBlocto(user.services);

      console.log('Email = ', email);
      console.log('Price = ', usdprice);
      console.log('token = ', props.tokenId);
      console.log('wallet = ', user.addr);

      const session = getSession();
      const obj = {
        wallet: user.addr,
        token: props.tokenId,
        price: Number(usdprice),
        email,
      };
      const res = await fetch(`${apiLocation}/private/stripe/createpayment`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.itasToken}`,
        },
        body: JSON.stringify(obj),
      });
      const response = await res.json();

      if (response && response.session) {
        // When the customer clicks on the button, redirect them to Checkout.
        // Should have some better handling on feedback to user
        // here as well on that they should try again.
        try {
          const result = await stripe.redirectToCheckout({
            sessionId: response.session,
          });

          setIsLoading(false);
          setIsCredit(false);
          return;
        } catch (error) {
          setIsLoading(false);
          setIsCredit(false);
          return;
        }
      } else {
        // message should indicate the user did nothing wrong
        setIsLoading(false);
        setIsCredit(false);
        return;
      }
    }

    await purchaseBlocklete(props.sellerFlowAddress, props.tokenId, usdprice)
      .then(() => {
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
          event: 'purchase p2p',
          event_source_page: 'marketplace_golfer_detail',
          ecommerce: {
            type: 'success',
            value: +usdprice,
            payment_type: 'Flow',
            items: [
              {
                golfer_id: props.tokenId,
                item_id: props.tokenId,
                golfer_tier: props.golferTier,
              },
            ],
          },
        });
        props.dispatch(getGolferDetails(props.tokenId));
        props.history.push('/clubhouse');
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user.addr) {
      props.dispatch(setFlow(user.addr)); // Need to check and then update to just set it.
      purchaseProcess();
    }
  }, [user.addr]);

  return (
    <PurchaseArea>
      <div className="inline-block w-1/2 align-top">
        <p className="uppercase font-display text-sm font-black text-white mb-0">current price</p>
        <div className="font-display font-black text-white md:text-3xl xs:text-xl font-semibold price">
          ${usdprice}
        </div>
      </div>
      <div className="inline-block w-1/2">
        {props.blockleteGolfer === false && (
          <button type="button" className="button disabled float-right">
            <div className="inner-circle" />
            <div className="inner-shadow" />
            <p className="button-text">Buy with USD</p>
          </button>
        )}
        {props.blockleteGolfer === true && (
          <button
            type="button"
            disabled={isLoading}
            className="button float-right"
            onClick={() => {
              setIsLoading(false);
              setIsCredit(true);

              window.dataLayer.push({
                event: 'add to cart',
                event_source_page: window.location.href,
                event_version: 'v2',
                golfer_type: props.golferTier,
                listed_price: +usdprice,
                payment_type: 'credit card',
                item_description: 'golfer ' + props.golferTier,
              });

              return connectAndAuthenticateFlow();
            }}
          >
            <div className="inner-circle" />
            <div className="inner-shadow" />
            <p className="button-text">Buy with USD</p>
          </button>
        )}
        <button
          type="button"
          disabled={isLoading}
          className="button mt-2 float-right"
          onClick={() => {
            setIsLoading(false);

            window.dataLayer.push({
              event: 'add to cart',
              event_source_page: window.location.href,
              event_version: 'v2',
              golfer_type: props.golferTier,
              listed_price: +usdprice,
              payment_type: 'crypto',
              item_description: 'golfer ' + props.golferTier,
            });

            return connectAndAuthenticateFlow();
          }}
        >
          <div className="inner-circle" />
          <div className="inner-shadow" />
          <p className="button-text">Buy with Crypto</p>
        </button>
      </div>
    </PurchaseArea>
  );
};

P2PPurchaseBlock.propTypes = {
  dispatch: PropTypes.func,
  tokenId: PropTypes.number,
  price: PropTypes.string,
  golferTier: PropTypes.string,
  sellerFlowAddress: PropTypes.string,
};

export default P2PPurchaseBlock;
