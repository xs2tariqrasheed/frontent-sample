// Want to say... Welcome to Season 2, etc...
// Have them create a Flow wallet.
// Link that wallet to the user.
// Say how many golfers they have.
// Start the migration of the golfers.
// once complete show button for take me to season 2.
// Show their clubhouse pulling from Flow.

/**
 *
 * AdminPage
 *
 */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import {
  setupAccountForFusd,
  setupAccount,
  checkIfBlockletesAlreadySetup,
} from 'utils/flow/flowConnector';
import { useInjectReducer } from 'utils/injectReducer';
import Alert from 'components/Alert';
import saga from './saga';
import { makeSelectSeasonTwoWelcomePage } from './selectors';
import {
  setWalletConnectedBlockletes,
  migrateSeasonTwoGolfers,
  resetView,
} from './actions';
import reducer from './reducer';
import { Modal, Button } from './styled';
const cancel = 'https://www.blockletegames.com/images/close%403x-light.png';
import startMigrationButton from '../../images/buttons/buttons-desktop-green-start-migration.svg';
import axios from 'utils/axios';

export function SeasonTwoWelcomeModal(props) {
  const {
    completed,
    currentUpdateState,
    readyToMigrate,
    migrationErrorText,
  } = props.flowmigration;
  const {
    onAddressSetupForBlockletes,
    onStartTokenMigration,
    onOpen,
    onModalLoad,
    callbackClose,
    flowaddress,
  } = props;



  const [triggerSetup, setTriggerSetup] = useState(false);

  const history = useHistory();

  useInjectReducer({ key: 'flowmigration', reducer });
  useInjectSaga({ key: 'SeasonTwoWelcomeModal', saga });

  useEffect(() => {
    onModalLoad();
  }, []);

  useEffect(() => {
    console.log('in useEffect,,,')
    const asyncAccountSetup = async () => {
      console.log('in asyncAccountSetup', flowaddress)
      const alreadyConnected = await checkIfBlockletesAlreadySetup(flowaddress);
      if (alreadyConnected) {
        console.log('already connected.....')
        onAddressSetupForBlockletes();
      } else {
        console.log('not conncted, continuying.....')
        // I would like to add a check for the vault and it there just not try this at all.
        await setupAccountForFusd();
        const resp = await setupAccount();
        if (resp && resp.status === 4) {
          onAddressSetupForBlockletes();
        }
      }
    };

    if (triggerSetup) {
      console.log('triggerSetup is true');
      asyncAccountSetup();
    }
  }, [triggerSetup]);

  useEffect(() => {
    if (readyToMigrate && triggerSetup) {
      onStartTokenMigration();
    }
  }, [readyToMigrate]);

  const viewTree = () => {
    if (!readyToMigrate) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1 className="text-4xl font-black leading-none text-purple-400">
            Welcome to the Migration Assistant
          </h1>
          <div
            style={{ marginTop: '30px' }}
            className="font-display text-base mb-2"
          >
            Current step to migrate to Flow: {currentUpdateState}
          </div>
          <div
            style={{ marginTop: '30px' }}
            className="font-display text-base mb-2"
          >
            Ready to migrate = {readyToMigrate ? 'Ready' : 'Not Ready'}
          </div>
          <Button
            type="submit"
            style={{ marginTop: '20px', marginBottom: '20px' }}
            align="center"
            onClick={() => {
              console.log('clicked....')
              setTriggerSetup(true);
            }}
          >
            <img src={startMigrationButton} alt="marketplace button" />
          </Button>
        </div>
      );
    }
    if (!completed) {
      return (
        <>
          <h1 className="text-4xl font-black leading-none text-purple-400">
            Migration in progress...
          </h1>
          <div
            style={{ marginTop: '30px' }}
            className="font-display text-base mb-2"
          >
            This may take a minute for all your golfers to migrate. Not to worry, we will let you know once you have had success migrating them to their new home!
          </div>
          <div className="loader">
            <div id="circle4" />
          </div>
          {migrationErrorText && <Alert message={migrationErrorText} />}
        </>
      );
    }

    return (
      <h1 className="text-4xl font-black leading-none text-purple-400 text-center">
        Migration complete!
      </h1>
    );
  };

  return (
    <Modal open={onOpen}>
      <div className="rounded">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src={cancel}
          className="absolute right-0 top-0 m-3 cursor-pointer"
          onClick={callbackClose}
          alt="close icon"
        />
        {viewTree()}
      </div>
    </Modal>
  );
}

SeasonTwoWelcomeModal.propTypes = {
  SeasonTwoWelcomePage: PropTypes.object,
  flowaddress: PropTypes.string,
  onAddressSetupForBlockletes: PropTypes.func,
  onStartTokenMigration: PropTypes.func,
  onOpen: PropTypes.bool,
  callbackClose: PropTypes.func,
  onModalLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  flowmigration: makeSelectSeasonTwoWelcomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddressSetupForBlockletes: () => {
      dispatch(setWalletConnectedBlockletes());
    },
    onStartTokenMigration: () => {
      dispatch(migrateSeasonTwoGolfers());
    },
    onModalLoad: () => {
      dispatch(resetView());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SeasonTwoWelcomeModal);
