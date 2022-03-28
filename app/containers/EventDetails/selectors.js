import { createSelector } from 'reselect';
import has from 'lodash/has';
import sum from 'lodash/sum';
import lowerCase from 'lodash/lowerCase';
import { initialState } from './reducer';

function getRestriction(eventDetails) {
  let filterProp = false;
  if (eventDetails.golferclass !== 'none') {
    filterProp = 'golferclass';
  }
  if (eventDetails.golfertype !== 'none') {
    filterProp = 'golfertype';
  }
  if (eventDetails.traitrestriction !== 'none') {
    filterProp = 'traitrestriction';
  }
  if (eventDetails.minimummedalcount > 0) {
    filterProp = 'minimummedalcount';
  }
  if (eventDetails.maxtokenid > 0) {
    filterProp = 'maxtokenid';
  }
  return {
    filterProp,
    value: lowerCase(eventDetails[filterProp]),
    traitvalue: eventDetails.traitvalue,
  };
}

/**
 * FIXME: these are some pretty fragile magic strings that do specific actions
 * @param restriction
 * @param golfer
 * @returns {boolean}
 */
function isSelectableFromTrait(golfer, restriction) {
  switch (restriction.value) {
    case 'dnaversion':
      return golfer.dnaversion === restriction.traitvalue;
    case 'reserved':
      return golfer.reserved === restriction.traitvalue;
    case 'hat':
      return golfer.hat === restriction.traitvalue;
    case 'glasses':
      return golfer.lookattribute1 > 0;
    default:
      return true;
  }
}

function isGolferSelectable(golfer, restriction) {
  const {
    powertrophiestotal,
    composuretrophiestotal,
    accuracytrophiestotal,
    staminatrophiestotal,
  } = golfer.GolferTrophyInfo;
  let selectable = true;
  const collectibleType = lowerCase(golfer.class);
  const restrictionValue = lowerCase(restriction.value);
  switch (restriction.filterProp) {
    case 'golferclass':
      selectable =
        collectibleType === restrictionValue ||
        collectibleType === `${restrictionValue} founder`;
      break;
    case 'golfertype':
      selectable =
        lowerCase(golfer.GolfType.class) === lowerCase(restriction.value) ||
        lowerCase(golfer.GolfType.type) === lowerCase(restriction.value);
      break;
    case 'traitrestriction':
      selectable = isSelectableFromTrait(golfer, restriction);
      break;
    case 'minimummedalcount':
      selectable =
        restriction.value <=
        sum([
          powertrophiestotal,
          composuretrophiestotal,
          accuracytrophiestotal,
          staminatrophiestotal,
        ]);
      break;
    case 'maxtokenid':
      selectable = golfer.tokenid < restriction.value;
      break;
    default:
      selectable = true;
      break;
  }
  return {
    ...golfer,
    selectable,
  };
}

/**
 * Direct selector to the eventDetails state domain
 */

const selectEventDetailsDomain = state => state.eventDetails || initialState;
const selectUserDetailsDomain = state => state.user || initialState;
const selectMyGolferDetailsDomain = state => {
  const { eventDetails } = state.eventDetails;
  let golfers = state.myGolfers.myGolfers.map(golfer => ({
    ...golfer,
    selectable: true,
  }));
  if (has(eventDetails, 'TournamentCompetition')) {
    const restriction = getRestriction(eventDetails.TournamentCompetition);
    if (restriction.filterProp) {
      golfers = golfers.map(golfer => isGolferSelectable(golfer, restriction));
    }
  }
  return golfers || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by EventDetails
 */

const makeSelectEventDetails = () =>
  createSelector(
    selectEventDetailsDomain,
    substate => substate,
  );

const makeSelectUserInfo = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate,
  );

const makeSelectMyGolferInfo = () =>
  createSelector(
    selectMyGolferDetailsDomain,
    substate => substate,
  );

export {
  selectEventDetailsDomain,
  selectUserDetailsDomain,
  selectMyGolferDetailsDomain,
  makeSelectUserInfo,
  makeSelectEventDetails,
  makeSelectMyGolferInfo,
};
