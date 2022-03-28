/*
 * Header
 *
 * Header for the user's account.
 *
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import axios from 'utils/axios';
import SiteHome from './SiteHome';
import NavBar from './NavBar';
import saga from './saga';
import { checkForWallet } from './actions';
import { MigrationBar, Width } from './styled';

const key = 'buy_founder';

const Header = props => {
  useInjectSaga({ key, saga });

  const [jobID, setJobID] = useState('');
  const [migrationStatus, setMigrationStatus] = useState(false);
  const [migrationResponse, setMigrationResponse] = useState({completed: false, failed: false, status: ''});
  const [migrationInterval, setMigrationInterval] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  useEffect(() => {
    let timer1;

    async function runEventCheck() {
      props.dispatch(checkForWallet(props.uuid));

      timer1 = setTimeout(() => {
        runEventCheck();
      }, 30000);
    }

    if (props.updateWallet) {
      runEventCheck();
    } else if (timer1) {
      clearTimeout(timer1);
      timer1 = 0;
    }

    return () => {
      if (timer1) {
        clearTimeout(timer1);
        timer1 = 0;
      }
    };
  }, [props.updateWallet]);

  useEffect(() => {
    if(props.flowmigration && props.flowmigration.jobId !== '') {
      console.log('jobId?', props.flowmigration.jobId);
      setJobID(props.flowmigration.jobId);
    }
  }, [props.flowmigration])


  useEffect(() => {
    console.log('migrationResponse state', migrationResponse);
    let getMigrationStatus;

    if(migrationResponse.completed === false && jobID !== '') {
      setMigrationStatus(true);
      console.log('SHOULD KEEP RUNNING')

       getMigrationStatus = setInterval(() => {
        console.log('run get migration data')
        axios.get(`/public/golfermigration/status/${jobID}`)
          .then(res => {
            setMigrationStatus(false);
            setMigrationResponse(res.data);
            // console.log('res.data', res.data);
          })
       }, 3000);
       setMigrationInterval(getMigrationStatus);
    } 

    if(migrationResponse.completed === true) {
      console.log('SHOULD BE COMPLETED', migrationInterval);
      clearInterval(migrationInterval)
    }
  }, [migrationResponse, jobID])
 

  return (
    <Width>
      <div className={splitLocation[1] === '' ? 'home' : ''}>
        <header
          className="bg-white relative z-50"
          style={{
            height: '68px',
            paddingRight: '1.25rem',
            paddingLeft: '1.25rem',
          }}
        >
          <div className="w-full h-full flex">
            <div className="md:mr-10 lg:mr-14 xs:mr-10">
              <SiteHome large={props.large} />
              {/* <ConnectedWallet className="ml-12 lg:w-full" large={props.large} /> */}
            </div>
            <NavBar username={props.username} />
          </div>
        </header>
      {
        (migrationStatus === true) ?
          <MigrationBar className='inProgress'>Migration Started</MigrationBar> :
        (migrationResponse.completed === true && migrationResponse.failed === false) ?
          <MigrationBar className='complete'>Migration Complete</MigrationBar> :
        (migrationResponse.completed === true && migrationResponse.failed === true) ?
          <MigrationBar className='fail'>Migration Complete</MigrationBar> :
        <></>
      }
      </div>
    </Width>
  );
};

Header.propTypes = {
  large: PropTypes.bool,
  dispatch: PropTypes.any,
  updateWallet: PropTypes.bool,
  uuid: PropTypes.string,
  username: PropTypes.string,
};

function mapProps(store) {
  return {
    updateWallet: store.user.updateWallet,
    uuid: store.user.uuid,
    username: store.user.username,
    flowmigration: store.flowmigration,
  };
}

export default connect(mapProps)(Header);
