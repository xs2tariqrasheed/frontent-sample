/*
 * ProfileMenu
 *
 * ProfileMenu for the user
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BsPencil } from 'react-icons/bs';
import { GiAlliedStar } from 'react-icons/gi';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import * as fcl from '@onflow/fcl';
import {
  NavbarDropdown,
  NavbarDropdownContent,
  GenericLink,
  LogOut,
  GenericMenuItem,
  MedalsContainer,
} from './styled';
import { clearUserData, clearMyGolfers } from './actions';
import { loadMyMedals, myMedalsLoaded } from '../actions';
import profile from '../../../../../images/profile.png';
import saga from '../saga';

/*
Add back later when we have a profile to show.

<Link to="profile">Profile</Link>
      <div style={{ marginTop: '5px' }} />
*/

const ProfileMenu = props => {
  useInjectSaga({ key: 'profileMenu', saga });

  useEffect(() => {
    props.dispatch(loadMyMedals());
  }, []);

  return (
    <div
      style={
        {
          // backgroundColor: 'red',
        }
      }
    >
      <NavbarDropdown>
        <img
          src={profile}
          style={{ height: 30, width: 30, objectFit: 'cover', marginTop: 5 }}
        />
        {/* <GenericLink to="#" /> */}
        <NavbarDropdownContent>
          <div className="inline-block mr-2">
            <GenericMenuItem to="/profile">{props.username}</GenericMenuItem>
          </div>
          <div className="inline-block align-middle">
            <BsPencil />
          </div>
          <MedalsContainer>
            <div
              className="inline-block ml-2 align-middle"
              style={{ color: '#fcea3b' }}
            >
              <GiAlliedStar />
            </div>
            <p>
              {props.medals.medals}/{props.medals.maxmedals}
            </p>
          </MedalsContainer>
          <GenericMenuItem to="/profile">Wallet</GenericMenuItem>
          <GenericMenuItem
            onClick={() => {
              props.migrateCallback();
              window.dataLayer.push({
                event: 'migrate golfers button',
                event_source_page: 'navigation',
              });
            }}
            to="#"
          >
            Migrate to Flow
          </GenericMenuItem>
          <div style={{ marginTop: '5px' }} />
          <LogOut
            onClick={async () => {
              await fcl.currentUser().unauthenticate();
              props.dispatch(clearUserData());
              props.dispatch(clearMyGolfers());
              window.dataLayer.push({
                event: 'update user property',
                auth_status: 'not authenticated',
              });

              window.dataLayer.push({
                event: 'logged out',
                event_source_page: window.location.href,
                event_version: 'v2',
                auth_status: 'not authenticated',
              });
            }}
          >
            Logout
          </LogOut>
        </NavbarDropdownContent>
      </NavbarDropdown>
    </div>
  );
};

ProfileMenu.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.any,
  migrateCallback: PropTypes.func,
};

function mapProps(store) {
  return {
    medals: store.headerInfo.medals,
  };
}

export default connect(mapProps)(ProfileMenu);
