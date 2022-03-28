/*
 * Sign Up
 *
 * Sign Up for the user's account.
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as fcl from '@onflow/fcl';
import { Link } from 'react-router-dom';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useInjectSaga } from 'utils/injectSaga';
import TextInput from 'components/Inputs/Text';
import Alert from 'components/Alert';
import WalletBlock from 'components/WalletBlock';
import makeSelectUser from './selectors';
import saga from './saga';
import { signup, clearLogin, updateUser } from './action';
import { clearUserData, clearMyGolfers } from '../HomePage/FlowMigration/UserLink/ProfileMenu/actions';
import Layout from '../Layout';
import { SignUpForm, Consent, Background, WalletModal } from './styled';
import agreeButton from '../../images/buttons/buttons-desktop-green-agree.svg';
import RandomGolferImage from '../../components/RandomGolferImage';

const LoginPage = props => {
  const { successfulLogin, errorText } = props.loginPage;
  const [formError, setFormError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [openModal, setOpenModal] = useState(true);
  const [disable, setDisable] = useState(true);
  const [consentAffiliatesChecked, setConsentAffiliatesChecked] = useState(
    false,
  );
  const [consentOffersChecked, setConsentOffersChecked] = useState(false);

  useEffect(() => {
    props.dispatch(clearLogin());
  }, []);

  useInjectSaga({ key: 'loginPage', saga });

  const onUsernameChanged = value => {
    setUsernameInput(value);
  };

  const onEmailChanged = value => {
    setEmailInput(value);
  };

  const onPasswordChanged = value => {
    setPasswordInput(value);
  };

  const onConsentOffersChecked = value => {
    setConsentOffersChecked(value);
  };

  const onConsentAffiliatesChecked = value => {
    setConsentAffiliatesChecked(value);
  };

  const authWithEmailPassword = event => {
    event.preventDefault();
    const signupObj = {
      email: emailInput.trim(),
      password: passwordInput.trim(),
      username: usernameInput.trim(),
      flowaddress: props.loginPage.flowaddress,
      consentOffers: consentOffersChecked,
      consentAffiliates: consentAffiliatesChecked,
    };
    props.dispatch(signup(signupObj));
    props.dispatch(updateUser(signupObj));
  };

  const handleWalletModal = () => {
    setOpenModal(!openModal);
  };

  const buttonDisable = () => {
    setDisable(!disable);
  };

  if (props.loginPage.successfulLogin) {
    props.history.push('/playtoearn');
  }

  const formValidation = event => {
    event.preventDefault();
    if (!usernameInput) {
      setFormError(
        'Please add a player name. You can change it at any time later on.',
      );
      return false;
    }
    if (!emailInput) {
      setFormError('Please add a valid email address.');
      return false;
    }
    if (!passwordInput) {
      setFormError('Please enter a password');
      return false;
    }
    flowAddressValidation(event);
  };

  const flowAddressValidation = event => {
    if (props.loginPage.flowaddress) {
      authWithEmailPassword(event);
    } else if (!props.loginPage.flowaddress) {
      handleWalletModal();
    }
  };

  let parsedError = errorText;
  if (parsedError[0] == '{') {
    parsedError = JSON.parse(parsedError).msg;
  }
  if (parsedError == 'Flow address used with another account.' && !openModal) {
    handleWalletModal();
  }

  return (
    <Layout>
      <Helmet>
        <title>Create Account</title>
        <meta
          name="Blocklete Games™ Sign Up"
          content="Create an Account for Blocklete Games™."
        />
      </Helmet>
      <div className="lg:h-900 xs:h-auto">
        <Background>
          <SignUpForm>
            <h1 className="text-4xl font-black leading-none text-purple-400 mb-4 xl:mb-8 xl:w-1/2">
              Create New Account
            </h1>
            <form onSubmit={event => formValidation(event)}>
              <div className="xl:w-1/2 xl:pr-6 inline-block">
                <TextInput
                  id={`${props.tag}username-login`}
                  label="Email"
                  name="email"
                  onChange={event => onEmailChanged(event.target.value)}
                />
                <TextInput
                  label="Username"
                  name="username"
                  onChange={event => onUsernameChanged(event.target.value)}
                />
                <TextInput
                  id={`${props.tag}password-login`}
                  label="Password"
                  type="password"
                  name="password"
                  onChange={event => onPasswordChanged(event.target.value)}
                />
                <p className="font-display text-sm mb-6">
                  By choosing &quot;I Agree&quot;, you confirm you have read and
                  agree to the Blocklete Games{' '}
                  <a href="/terms-of-service">Terms and Conditions</a> and
                  acknowledge our
                  <a href="/privacy"> Privacy Policy</a>.
                </p>
              </div>
              <div className="xl:w-1/2 inline-block">
                <div className="inline-block align-top">
                  <Consent>
                    <input
                      type="checkbox"
                      name="consentOffers"
                      onChange={event => {
                        onConsentOffersChecked(event.target.checked);
                      }}
                    />
                    <span />
                  </Consent>
                </div>
                <div
                  className="ml-3 cursor-pointer select-none font-display text-sm pb-6 inline-block w-11/12"
                  htmlFor="consentOffers"
                >
                  Yes! Blocklete and WarnerMedia News and Sports may use my
                  email email address along with my interests, interactions, and
                  device device data to send me tailored email and other offers
                  through social media or other sites and apps.
                </div>
                <div className="inline-block align-top">
                  <Consent>
                    <input
                      type="checkbox"
                      name="consentAffiliates"
                      onChange={event => {
                        onConsentAffiliatesChecked(event.target.checked);
                      }}
                    />
                    <span />
                  </Consent>
                </div>
                <div
                  className="ml-3 cursor-pointer select-none font-display text-sm pb-8 inline-block w-11/12"
                  htmlFor="consentAffiliates"
                >
                  Yes! Blocklete and WarnerMedia News and Sports may also share
                  those details with{' '}
                  <a
                    href="https://www.warnermediaprivacy.com/affiliates/"
                    target="_blank"
                  >
                    Affiliates
                  </a>{' '}
                  so they may send me tailored email and other offers. Blocklete
                  is requesting this consent on behalf of their affiliates, use
                  the information under their respective privacy policies.
                </div>
                <p className="font-display text-sm mb-8 ml-6">
                  Opt-out by email to WMPrivacy@warnermediagroup.com, mail to
                  “WarnerMedia Privacy Office, 4000 Warner Blvd., Bldg. 160,
                  Burbank, CA 91522,” or by the unsubscribe link in the email.
                </p>
              </div>
              <div className="text-center mb-20 xl:mb-6">
                <button type="submit" disabled={disable}>
                  <img src={agreeButton} alt="agree button" />
                </button>
              </div>
              {parsedError && <Alert className="mt-5" message={parsedError} />}
              {formError && <Alert className="mt-3" message={formError} />}
            </form>
          </SignUpForm>
          <WalletModal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <div>
              <RiCloseCircleFill
                onClick={() => setOpenModal(!openModal)}
                className="inline-block h-8 w-8 align-baseline float-right"
                style={{ color: '#0ac47e' }}
                type="button"
              />
              {(parsedError=='') && (
                <>
                  <h1>Steps to Create Your Account</h1>
                  <div className="mb-10">
                    <p>
                      <span>Here</span> are the steps to get you signed up!
                    </p>
                    <ol className="list-decimal list-outside ml-4">
                      <li>
                        Set up your
                        <Link
                          to={{
                            pathname: 'https://blocto.portto.io/en/#features',
                          }}
                          target="_blank"
                          style={{ color: '#0ac47e' }}
                        >
                          {' '}
                          Blocto
                        </Link>{' '}
                        Wallet. This is where your golfer will live, so it's
                        important you set it up first.
                      </li>
                      <li>
                        Create your Blocklete Games login. This will be the
                        login you use to access the website and game.
                      </li>
                      <li>Download the app and play the game!</li>
                    </ol>
                    <div className="italic text-center">
                      Creating another account? See FAQ
                      <Link
                        to={{ pathname: 'https://discord.gg/ttdm8cRSvW' }}
                        target="_blank"
                        style={{ color: '#0ac47e' }}
                      >
                        {' '}
                        here.
                      </Link>{' '}
                    </div>
                  </div>
                  <WalletBlock
                    handleWalletModal={handleWalletModal}
                    buttonDisable={buttonDisable}
                  />
                </>
              )}
              {(parsedError=='Flow address used with another account.') && (
                <>
                  <p className="pt-10 pb-6">
                    <span>Your</span> Blocto Wallet is already associated with a
                    Blocklete Games account. Create a new wallet by using a new
                    email address for the Blocto Wallet.
                  </p>
                  <a
                    className="button"
                    type="submit"
                    onClick={async () => {
                      await fcl.currentUser().unauthenticate();
                      props.dispatch(clearUserData());
                      props.dispatch(clearMyGolfers());
                      window.location.reload(false);
                    }}
                  >
                    <div className="inner-circle" />
                    <div className="inner-shadow" />
                    <p className="button-text">Restart</p>
                  </a>
                </>
              )}
            </div>
          </WalletModal>
        </Background>
      </div>
    </Layout>
  );
};

LoginPage.propTypes = {
  dispatch: PropTypes.func,
  loginPage: PropTypes.object,
  tag: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
