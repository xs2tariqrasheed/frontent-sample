/*
 * ProfileMenu
 *
 * ProfileMenu for the user
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fcl from '@onflow/fcl';
import {
  NavbarDropdown,
  NavbarDropdownContent,
  LogOut,
  MyGolfLink,
} from './styled';
import { clearUserData, clearMyGolfers } from './actions';
import { Wrapper } from '../styled';
// import agreeButton from '../../../../../images/buttons/buttons-desktop-green-migrate-golfers.svg';

/*
Add back later when we have a profile to show.

<Link to="profile">Profile</Link>
      <div style={{ marginTop: '5px' }} />
*/
const ProfileMenu = props => {
  const link = '/clubhouse';

  return (
    <Wrapper>
      <a
        type="submit"
        className="button"
        onClick={() => {
          props.migrateCallback();
        }}
      >
        <div className="inner-circle" />
        <div className="inner-shadow" />
        <p className="button-text">Migrate Tokens</p>
      </a>
    </Wrapper>
  );
};

ProfileMenu.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.any,
  migrateCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(ProfileMenu);
