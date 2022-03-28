import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import TextInput from 'components/Inputs/Text';
import Alert from 'components/Alert';
import Spinner from 'components/Spinner';
import makeSelectUser from './selectors';
import saga from './saga';
import { login, signup, clearLogin } from './action';
const cancel = 'https://www.blockletegames.com/images/close%403x-light.png';
import { Modal, SwitchLabel, FormWrapper, Button, Consent } from './styled';

const LoginPage = props => {
  const { loading, successfulLogin, errorText } = props.loginPage;
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

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

  const authWithEmailPassword = event => {
    event.preventDefault();
    if (!props.newAccount) {
      const loginObj = {
        email: emailInput.trim(),
        password: passwordInput.trim(),
      };
      props.dispatch(login(loginObj));
    } else {
      const signupObj = {
        email: emailInput.trim(),
        password: passwordInput.trim(),
        username: usernameInput.trim(),
      };
      props.dispatch(signup(signupObj));
    }
  };

  if (successfulLogin) {
    props.callbackClose();
  }

  /*eslint-disable*/
  return (
    props.onOpen && (
      <Modal open={props.onOpen}>
        <div className="rounded-xl">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={cancel}
            className="absolute right-0 top-0 m-5 xs:m-3 cursor-pointer"
            onClick={props.callbackClose}
            alt="close icon"
          />
          {props.newAccount ? (
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
            <h2 className="text-xl mb-3 text-center text-white uppercase bg-purple-100 p-10 rounded-t-xl">
              Sign into Blocklete Games!
            </h2>
          )}
          <form onSubmit={event => authWithEmailPassword(event)}>
            <FormWrapper>
              <TextInput
                id={`${props.tag}username-login`}
                label="Blocklete Games Email"
                name="email"
                onChange={event =>
                  onEmailChanged(event.target.value)
                }
              />
              {props.newAccount && (
                <TextInput
                  label="Username"
                  name="username"
                  onChange={event =>
                    onUsernameChanged(event.target.value)
                  }
                />
              )}
              <TextInput
                id={`${props.tag}password-login`}
                label="Blocklete Games Password"
                type="password"
                name="password"
                onChange={event =>
                  onPasswordChanged(event.target.value)
                }
              />
            </FormWrapper>
            <div align="center">
              {props.newAccount && (
                <div>
                  <Consent>
                    <input
                      id="consent"
                      type="checkbox"
                      onChange={event => {
                        setConsentChecked(event.target.checked)
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
                  (!consentChecked && props.newAccount)
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
                Let's Play!
              </Button>
            </div>
            <SwitchLabel>
              <a href="/signup-us">Do not have an account? Create one</a>
            </SwitchLabel>
            {errorText && (
              <Alert className="mt-5" message={errorText} />
            )}
          </form>
        </div>
      </Modal>
    )
  );
};
/* eslint-enable */
LoginPage.propTypes = {
  dispatch: PropTypes.func,
  loginPage: PropTypes.object,
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
