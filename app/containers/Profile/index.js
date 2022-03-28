/* eslint-disable prettier/prettier */
/*
 * Profile
 *
 * profile page for the user. Might wrap into a modal.
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import TextInput from 'components/Inputs/Text';
import { useInjectSaga } from 'utils/injectSaga';
import Alert from 'components/Alert';
import UserLink from '../UserSignIn/MigrationSignIn/UserLink';
import Layout from '../Layout';
// import saveNameButton from '../../images/buttons/buttons-mobile-small-green.svg';
// import migrateTokensButton from '../../images/buttons/buttons-mobile-small-green_2@3x.png';
import { getSession } from '../../utils/session';
import makeSelectUser from '../SignUpUS/selectors';
import { updateUser } from '../SignUpUS/action';
// import { setFlow } from '../Header/NavBar/UserLink/actions';
import saga from '../SignUpUS/saga';
import { apiLocation } from '../../config';
import { SignUpForm, BackgroundImage, Header } from './styled';

const Profile = props => {
  // const [usernameInput, setUsernameInput] = useState('');

  // useEffect(() => {
  //   props.dispatch(clearLogin());
  // }, []);

  useInjectSaga({ key: 'loginPage', saga });

  const onUsernameChanged = value => {
    setUsername(value);
  };

  const authWithEmailPassword = event => {
    event.preventDefault();
    const signupObj = {
      email: props.profile.email,
      username: username.trim(),
      flowaddress: props.profile.flowaddress,
      consentOffers: true,
      consentAffiliates: true,
    };
    // props.dispatch(signup(signupObj));
    props.dispatch(updateUser(signupObj));
  };

  const formValidation = (event) => {
    event.preventDefault();
    if (!username) {
      setFormError(
        'Please add a player name.',
      );
      return false;
    }
    authWithEmailPassword(event);
    updateUserInfo();
  };

  const [user, setUser] = useState({ loggedIn: null });
  const [openModal, setOpenModal] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [formError, setFormError] = useState('');

  const updateUserInfo = () => {
    // setLoading(true);
    const session = getSession();
    const userObj = {
      id: props.profile.uuid,
      username,
      token: localStorage.getItem('ItasGolfToken'),
    };

    fetch(`${apiLocation}/private/user/updateusername`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.itasToken}`,
      },
      body: JSON.stringify(userObj),
    }).then(response => {
      console.log(response);
    });
  };


  const existingUsername = props.profile ? props.profile.username : '';
  const flowAddress = props.profile ? props.profile.flowaddress : '';

  return (
    <Layout>
      <Helmet>
        <title>Profile Page</title>
        <meta
          name="Blocklete Games™ Sign Up"
          content="Create an Account for Blocklete Games™."
        />
      </Helmet>
        <div className=" -m-1 bg-white">
          <SignUpForm className='sm:w-full'> 
            <Header className="text-4xl font-black mb-6 mt-4">Profile</Header>
            <form onSubmit={event => formValidation(event)}>
              <TextInput
                id="feUserName"
                label="Player Name"
                placeholder={existingUsername}
                value={username}
                onChange={async event => {
                  onUsernameChanged(event.target.value);
                }}
              />
              <div className="text-center mb-10">
                <button 
                  type="submit"
                  className='button' 
                >
                  <div className='inner-circle'></div>
                  <div className='inner-shadow'></div>
                  <p className='button-text'>Save New Name</p>
                </button>
                {formError && <Alert className="mt-3" message={formError} />}
              </div>
              <TextInput
                label="Wallet Address"
                placeholder={flowAddress}
                value={user.addr}
              />
            </form>
            <div className="text-center">
              <UserLink />
            </div>
          </SignUpForm>
        </div>
    </Layout>
  );
};

Profile.propTypes = {
  // user: PropTypes.object,
  dispatch: PropTypes.func,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectUser(),
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

export default compose(withConnect)(Profile);
