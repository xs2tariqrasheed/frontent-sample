/*
 *
 * Season Two Welcome reducer
 *
 */
import produce from 'immer';
import {
  MIGRATE_GOLFERS,
  MIGRATE_GOLFERS_SUCCESS,
  MIGRATE_GOLFERS_FAILURE,
  SET_FLOW_ADDRESS_USER,
  SET_FLOW_ADDRESS_USER_SUCCESS,
  SET_FLOW_ADDRESS_USER_FAILURE,
  SET_TOTAL_GOLFERS_OWNED,
  WALLET_SETUP_BLOCKLETES,
  RESET_VIEW,
} from './constants';

export const initialState = {
  completed: false,
  accountBlockleteReady: false,
  readyToMigrate: false,
  migratingState: false,
  numberOfTokensToMigrate: 0,
  numberGolfersMigrated: 0,
  migrationErrorText: '',
  flowAddress: '',
  currentUpdateState: 'Set up a Flow blockchain wallet to migrate golfers.',
  jobId: ''
};

/* eslint-disable default-case, no-param-reassign */
const SeasonTwoMigrationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_VIEW:
        draft.completed = false;
        draft.accountBlockleteReady = false;
        draft.readyToMigrate = false;
        draft.migratingState = false;
        draft.numberOfTokensToMigrate = 0;
        draft.numberGolfersMigrated = 0;
        draft.migrationErrorText = '';
        draft.flowAddress = '';
        draft.currentUpdateState =
          'Set up a Flow blockchain wallet to migrate golfers.';
        break;
      case MIGRATE_GOLFERS:
        draft.migratingState = true;
        draft.migrationErrorText = '';
        draft.currentUpdateState = `Initiating the migration of tokens to flow.`;
        break;
      case MIGRATE_GOLFERS_SUCCESS:
        draft.migratingState = false;
        draft.completed = true;
        draft.numberGolfersMigrated = action.payload.golfers;
        draft.jobId = action.payload.jobId;
        draft.currentUpdateState = `Migrated ${
          action.payload.golfers
        } Blockletes to the Flow blockchain.`;
        draft.migrationErrorText = '';
        break;
      case MIGRATE_GOLFERS_FAILURE:
        draft.migratingState = false;
        draft.migrationErrorText = action.payload.err;
        break;
      case SET_FLOW_ADDRESS_USER:
        draft.flowAddress = action.payload.flowAddress;
        draft.migrationErrorText = '';
        draft.currentUpdateState = `Linking Flow address ${
          action.payload.flowAddress
        } to user account.`;
        break;
      case SET_FLOW_ADDRESS_USER_SUCCESS:
        draft.migrationErrorText = '';
        draft.readyToMigrate = state.accountBlockleteReady && true;
        draft.currentUpdateState = 'Account successfully linked.';
        break;
      case SET_FLOW_ADDRESS_USER_FAILURE:
        draft.migrationErrorText = action.payload.err;
        break;
      case SET_TOTAL_GOLFERS_OWNED:
        draft.numberOfTokensToMigrate = action.payload.golfers;
        draft.currentUpdateState = `Migrating ${
          state.numberOfTokensToMigrate
        } Golfers to Flow.`;
        break;
      case WALLET_SETUP_BLOCKLETES:
        draft.accountBlockleteReady = true;
        draft.readyToMigrate = true;
        break;
    }
  });

export default SeasonTwoMigrationReducer;
