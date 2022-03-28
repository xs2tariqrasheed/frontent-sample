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
  GenericLink,
  LogOut,
  MyGolfLink,
  GenericMenuItem,
} from './styled';
import { clearUserData, clearMyGolfers } from './actions';

/*
Add back later when we have a profile to show.

<Link to="profile">Profile</Link>
      <div style={{ marginTop: '5px' }} />
*/
const ProfileMenu = props => {
  const link = '/clubhouse';

  return (
    <NavbarDropdown>
      <GenericLink to='#'>{props.username}</GenericLink>
      <NavbarDropdownContent>
        <MyGolfLink to={link}>My Clubhouse</MyGolfLink>
        <GenericMenuItem
          onClick={() => {
            props.migrateCallback();
          }}
          to='#'
        >
          Migrate to Flow
        </GenericMenuItem>
        <div style={{ marginTop: '5px' }} />
        <LogOut
          onClick={async () => {
            await fcl.currentUser().unauthenticate();
            props.dispatch(clearUserData());
            props.dispatch(clearMyGolfers());
          }}
        >
          Logout
        </LogOut>
      </NavbarDropdownContent>
    </NavbarDropdown>
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
