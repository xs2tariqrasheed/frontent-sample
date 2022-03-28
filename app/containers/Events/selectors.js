import { createSelector } from 'reselect';
import moment from 'moment-timezone';
import { initialState } from './reducer';

/**
 * Direct selector to the events state domain
 */

const selectEventsDomain = state => state.events || initialState;
const selectUserDomain = state => state.user.uuid || null;
const selectGolferCompetitionsDomain = state =>
  state.golferdetails.competitionHistory || [];

/**
 * Other specific selectors
 */

/**
 * Default selector used by Events
 */

const makeSelectEvents = () =>
  createSelector(
    selectEventsDomain,
    substate => substate,
  );

const makeSelectUserUuid = () =>
  createSelector(
    selectUserDomain,
    substate => substate,
  );

const makeSelectUpcomingEvents = () =>
  createSelector(
    selectEventsDomain,
    substate => {
      const contests = substate.events.filter(
        el => moment(el.starttime) >= moment(),
      );

      const privEvents = substate.privateEvents ? substate.privateEvents : [];
      const privateContest = privEvents.filter(
        el => moment(el.starttime) >= moment(),
      );

      const tourneyEvents = substate.tournaments ? substate.tournaments : [];
      const tourneyContest = tourneyEvents.filter(
        el => moment(el.starttime) >= moment(),
      );

      const allEvents = contests.concat(privateContest).concat(tourneyContest);

      return allEvents.sort(el => moment(el.starttime) + moment());
    },
  );

const makeSelectCompletedEvents = () =>
  createSelector(
    selectEventsDomain,
    substate => {
      const privEvents = substate.privateEvents ? substate.privateEvents : [];
      const tourneyEvents = substate.tournaments ? substate.tournaments : [];
      return substate.events
        .concat(privEvents, tourneyEvents)
        .filter(el => moment(el.endtime) < moment())
        .sort(el => moment(el.endtime) - moment());
    },
  );

const makeSelectActiveEvents = () =>
  createSelector(
    [selectEventsDomain],
    substate => {
      const contests = substate.events.filter(el => {
        const nowTime = moment();
        const startTime = moment(el.starttime);
        const endTime = moment(el.endtime);
        return startTime <= nowTime && endTime > nowTime;
      });

      const privEvents = substate.privateEvents ? substate.privateEvents : [];
      const privateContest = privEvents.filter(el => {
        const nowTime = moment();
        const startTime = moment(el.starttime);
        const endTime = moment(el.endtime);
        return startTime <= nowTime && endTime > nowTime;
      });

      const tourneyEvents = substate.tournaments ? substate.tournaments : [];
      const tourneyContest = tourneyEvents.filter(el => {
        const nowTime = moment();
        const startTime = moment(el.starttime);
        const endTime = moment(el.endtime);
        return startTime <= nowTime && endTime > nowTime;
      });

      const allEvents = contests.concat(privateContest).concat(tourneyContest);
      return allEvents.sort(el => moment(el.starttime) + moment());
    },
  );

const makeSelectGolferPastEvents = () =>
  createSelector(
    [selectEventsDomain, selectGolferCompetitionsDomain],
    (allEvents, golferEvent) => {
      const contests = allEvents.events
        .filter(el => golferEvent.some(inner => inner.competitionid === el.id))
        .filter(el => {
          const nowTime = moment();
          const endTime = moment(el.endtime);
          return endTime < nowTime;
        });

      const privEvents = allEvents.privateEvents ? allEvents.privateEvents : [];
      const privateContest = privEvents
        .filter(el => golferEvent.some(inner => inner.competitionid === el.id))
        .filter(el => {
          const nowTime = moment();
          const endTime = moment(el.endtime);
          return endTime < nowTime;
        });

      const tourneyEvents = allEvents.tournaments ? allEvents.tournaments : [];
      const tourneyContest = tourneyEvents
        .filter(el => golferEvent.some(inner => inner.competitionid === el.id))
        .filter(el => {
          const nowTime = moment();
          const endTime = moment(el.endtime);
          return endTime < nowTime;
        });

      const finalEvents = contests
        .concat(privateContest)
        .concat(tourneyContest);
      return finalEvents.sort(el => moment(el.starttime) - moment());
    },
  );

export default makeSelectEvents;
export {
  selectEventsDomain,
  makeSelectUpcomingEvents,
  makeSelectActiveEvents,
  makeSelectGolferPastEvents,
  makeSelectUserUuid,
  makeSelectCompletedEvents,
};
