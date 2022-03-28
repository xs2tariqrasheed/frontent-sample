import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import TextInput from 'components/Inputs/Text';
import Alert from 'components/Alert';
import makeSelectUser from './selectors';
import { auth } from '../../firebaseWrapper';
import saga from './saga';
import { login, signup, clearLogin } from './action';
import { SwitchLabel, FormWrapper, Background, PasswordLink } from './styled';
import Layout from '../Layout';
import RandomGolferImage from '../../components/RandomGolferImage';
import agreeButton from '../../images/buttons/buttons-desktop-green-play.svg';

const LoginPage = props => {
  const { loading, successfulLogin, errorText } = props.loginPage;
  const [errorMessage, setErrorMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');

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

  const forgotPassword = value => {
    auth.sendPasswordResetEmail(value).catch(error => {
      errorText(error.message);
    });
    if (value) {
      setErrorMessage(
        'Password reset email sent. Check your email for more instructions.',
      );
    } else {
      setErrorMessage('Please enter your email address.');
    }
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

  if (props.loginPage.username) {
    props.history.push('/playtoearn');
  }

  /*eslint-disable*/
  return (
    <Layout>
      <Helmet>
        <title>Sign Into Account</title>
        <meta
          name="Blocklete Games™ Sign In"
          content="Sign Into an Account for Blocklete Games™."
        />
      </Helmet>
      <div className="lg:h-900 xs:h-auto">
        <Background>
        <form onSubmit={event => authWithEmailPassword(event)} className="inline-block">
          <FormWrapper>
            <h1 className="text-4xl font-black leading-none text-purple-400 mb-4">
              Sign Into Blocklete Golf
            </h1>
            <TextInput
              id={`${props.tag}username-login`}
              label="Email"
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
              label="Password"
              type="password"
              name="password"
              onChange={event =>
                onPasswordChanged(event.target.value)
              }
            />
            <PasswordLink
              onClick={event =>
                forgotPassword(emailInput)
              }
            >
              Forgot Password?
            </PasswordLink>
            <div className="center mb-6">
              <button type="submit">
                <img src={agreeButton} alt="agree button" />
              </button>
            </div>
            {errorText && (
              <Alert className="mt-5" message={errorText} />
            )}
            {errorMessage && (
              <Alert className="mt-5" message={errorMessage} />
            )}
          </FormWrapper>
        </form>
        <div className="golfersHolder">
          <RandomGolferImage />
        </div>
        </Background>
      </div>
    </Layout>
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
