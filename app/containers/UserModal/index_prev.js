/*
 * Login
 *
 * Login for the user's account.
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/Inputs/Text';
import Alert from 'components/Alert';
import Spinner from 'components/Spinner';
import PropTypes from 'prop-types';
import { auth } from '../../firebaseWrapper';
import { apiLocation } from '../../config';
import {
  PasswordLink,
  Modal,
  SwitchLabel,
  FormWrapper,
  Button,
  Consent,
} from './styled';
import { updateUuid, updateUser } from './action';
import { loadMyGolfers, loadMyWatchList } from '../Header/actions';
import cancel from '../../images/cancel.svg';

class UserModal extends Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      username: '',
      errorMessage: '',
      loading: false,
      passwordInput: '',
      consentChecked: false,
    };

    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
  }

  componentDidMount() {}

  forgotPassword() {
    this.setState({ loading: true });

    const that = this;
    auth
      .sendPasswordResetEmail(this.state.emailInput)
      .then(() => {
        that.setState({
          loading: false,
          errorMessage:
            'Password reset email sent. Check your email for more instructions.',
        });
      })
      .catch(error => {
        that.setState({ loading: false, errorMessage: error.message });
      });
  }

  authWithEmailPassword(event) {
    event.preventDefault();

    const email = this.state.emailInput;
    const password = this.state.passwordInput;
    const theUsername = this.state.username;

    this.setState({ errorMessage: '', loading: true });

    const that = this;

    if (!that.props.newAccount) {
      auth
        .fetchSignInMethodsForEmail(email)
        .then(providers => {
          if (providers.length === 0) {
            that.setState({
              loading: false,
              errorMessage: 'Password or username incorrect!',
            });
            return 1;
          }
          if (providers.indexOf('password') === -1) {
            that.setState({
              loading: false,
              errorMessage: 'Password or username incorrect!',
            });
            return 1;
          }
          return auth.signInWithEmailAndPassword(email, password);
        })
        .then(async result => {
          const { user } = result;
          if (user) {
            user
              .getIdToken(true)
              .then(async idToken => {
                const obj = {
                  firebaseToken: idToken,
                  uuid: user.uid,
                };
                await fetch(`${apiLocation}/public/login`, {
                  method: 'POST',
                  cache: 'no-cache',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(obj),
                })
                  .then(res => res.text())
                  .then(async body => {
                    const { token, userInfo } = JSON.parse(body);
                    if (!userInfo.username || userInfo.username === '') {
                      this.setState({
                        loading: false,
                        errorMessage:
                          'User or password is incorrect. Please try again.',
                      });
                    } else {
                      that.props.dispatch(updateUuid(user.uid));
                      that.props.dispatch(updateUser(userInfo));
                      that.props.dispatch(
                        loadMyGolfers({ ethaddress: userInfo.ethaddress }),
                      );

                      localStorage.setItem('ItasGolfToken', token);
                      that.props.dispatch(loadMyWatchList(user.uid));
                      this.setState({ loading: false });
                      let tempObj = {
                        event: 'sign in',
                        type: 'success',
                      };
                      try {
                        Bootstrapper.PubSub.publish('interaction', tempObj); // eslint-disable-line
                      } catch {
                        tempObj = {
                          event: 'sign in',
                          type: 'success',
                        };
                      }

                      this.props.callbackClose();
                    }
                  });
              })
              .catch(() => {
                this.setState({
                  loading: false,
                  errorMessage:
                    'User email or password is incorrect. Please try again.',
                });
              });
          }
        })
        .catch(error => {
          this.setState({ loading: false, errorMessage: error.message });
        });
    } else {
      auth
        .fetchSignInMethodsForEmail(email)
        .then(providers => {
          if (providers.length === 0) {
            return auth.createUserWithEmailAndPassword(email, password);
          }
          if (providers.indexOf('password') === -1) {
            that.setState({
              buttonDisabled: false,
              errorMessage:
                'This email address is already registered. Perhaps you previously signed using a different method (ex. Google sign-in button). Please log in using the other method (or try a different email address)',
            });
            return 1;
          }
          // sign in with email/password
          return auth.signInWithEmailAndPassword(email, password);
        })
        .then(async result => {
          // console.log('User is = ' + JSON.stringify(user));

          const { user } = result;
          if (user) {
            user
              .getIdToken(true)
              .then(async idToken => {
                // const accounts = await web3.eth.getAccounts();
                const obj = {
                  firebaseToken: idToken,
                  username: theUsername,
                  email: that.state.emailInput,
                  uuid: user.uid,
                  // ethaddress: accounts[0],
                };
                that.props.dispatch(updateUser(obj));
                await fetch(`${apiLocation}/public/register`, {
                  method: 'POST',
                  cache: 'no-cache',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(obj),
                })
                  .then(res => res.text())
                  .then(async body => {
                    const { token } = JSON.parse(body);
                    // that.props.dispatch(
                    // loadMyGolfers({ ethaddress: accounts[0] }),
                    // );
                    localStorage.setItem('ItasGolfToken', token);
                    this.setState({ loading: false });
                    let tempObj = {
                      event: 'create account',
                      type: 'success',
                    };
                    try {
                      Bootstrapper.PubSub.publish('interaction', tempObj); // eslint-disable-line
                    } catch {
                      tempObj = {
                        event: 'create account',
                        type: 'success',
                      };
                    }

                    this.props.callbackClose();
                  });
              })
              .catch(error => {
                that.setState({
                  buttonDisabled: false,
                  errorMessage: error.message,
                });
              });
          }
        })
        .catch(error => {
          that.setState({ buttonDisabled: false, errorMessage: error.message });
        });
    }
  }

  render() {
    const { errorMessage, loading } = this.state;

    return (
      this.props.onOpen && (
        <Modal open={this.props.onOpen}>
          <div className="rounded">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={cancel}
              className="absolute right-0 top-0 m-5 cursor-pointer"
              onClick={this.props.callbackClose}
              alt="close icon"
            />
            {this.props.newAccount ? (
              <div className="text-center">
                <h1 className="text-xl mb-3 text-blueberry uppercase">
                  Create Account
                </h1>
                <h2 className="text-lg mb-3 text-blueberry">
                  Welcome to Blocklete Games™!
                </h2>
                <p className="mb-3">
                  In order to join, we need an email to send updates. Create a
                  username so other players know what to call you.
                </p>
              </div>
            ) : (
              <h2 className="text-xl mb-3 text-center text-blueberry uppercase">
                Sign in to your Blocklete Games™ account
              </h2>
            )}
            <form onSubmit={event => this.authWithEmailPassword(event)}>
              <FormWrapper>
                <TextInput
                  id={`${this.props.tag}username-login`}
                  label="Email"
                  name="email"
                  onChange={event =>
                    this.setState({ emailInput: event.target.value })
                  }
                />
                {this.props.newAccount && (
                  <TextInput
                    label="Username"
                    name="username"
                    onChange={event =>
                      this.setState({ username: event.target.value })
                    }
                  />
                )}
                <TextInput
                  id={`${this.props.tag}password-login`}
                  label="Password"
                  type="password"
                  name="password"
                  onChange={event =>
                    this.setState({ passwordInput: event.target.value })
                  }
                />
                {!this.props.newAccount && (
                  <PasswordLink
                    onClick={() => {
                      this.forgotPassword();
                    }}
                  >
                    Forgot Password?
                  </PasswordLink>
                )}
              </FormWrapper>
              <div align="center">
                {this.props.newAccount && (
                  <div>
                    <Consent>
                      <input
                        id="consent"
                        type="checkbox"
                        onChange={event => {
                          this.setState({
                            consentChecked: event.target.checked,
                          });
                        }}
                      />
                      <span />
                    </Consent>
                    <label
                      className="ml-2 cursor-pointer select-none"
                      htmlFor="consent"
                    >
                      By checking this box, I agree to the{' '}
                      <a href="/privacy">Privacy Policy</a> and{' '}
                      <a href="/terms-of-service">Terms of Service</a>.
                    </label>
                  </div>
                )}
                <Button
                  type="submit"
                  className="mt-10 btn inline-block no-underline text-center w-full sm:w-40 mr-5 inline-block"
                  disabled={
                    loading ||
                    (!this.state.consentChecked && this.props.newAccount)
                  }
                >
                  {loading && (
                    <Spinner
                      style={{
                        width: '40px',
                        height: '40px',
                        margin: '0 auto',
                        marginTop: '-6px',
                      }}
                    />
                  )}
                  Sign In
                </Button>
              </div>
              {this.props.newAccount ? (
                <SwitchLabel onClick={() => this.props.callbackSwitch()}>
                  Already have an account?
                </SwitchLabel>
              ) : (
                <SwitchLabel onClick={() => this.props.callbackSwitch()}>
                  Do not have an account? Create one
                </SwitchLabel>
              )}
              {errorMessage && (
                <Alert className="mt-5" message={errorMessage} />
              )}
            </form>
          </div>
        </Modal>
      )
    );
  }
}

UserModal.propTypes = {
  tag: PropTypes.string,
  callbackClose: PropTypes.func,
  callbackSwitch: PropTypes.func,
  onOpen: PropTypes.bool,
  newAccount: PropTypes.bool,
};

function mapProps(store) {
  return {
    ethaddress: store.headerInfo.ethDetectedAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapProps,
  mapDispatchToProps,
)(UserModal);
