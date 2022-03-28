/**
 *
 * EventDetails
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';
import has from 'lodash/has';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import moment from 'moment-timezone';
import GolferSelectorModal from 'components/GolferSelectorModal';
import { Link } from 'react-router-dom';
import {
  makeSelectEventDetails,
  makeSelectUserInfo,
  makeSelectMyGolferInfo,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import eventsReducer from '../Events/reducer';
import eventsSaga from '../Events/saga';
import Layout from '../Layout';
import NavBackTo from '../../components/NavBackTo';
import Leaderboard from '../../components/Leaderboard';
import PrizesTable from '../../components/PrizesTable';
import {
  fetchEventDetails,
  fetchEventLeaderboard,
  fetchPrivateEventDetails,
  joinPrivateEvent,
} from './actions';
import HeadingLabel from '../../components/HeadingLabel';
import {
  GradientWrapper,
  TableCellLabel,
  TableCellValue,
  TableRow,
} from './styled';
import UserModal from '../UserModal';
import PrivateEventJoinForm from '../../components/PrivateEventJoinForm';
import {
  clearPrivateEventsAction,
  fetchEventsAction,
  fetchPrivateEventsAction,
  fetchTournamentsAction,
} from '../Events/actions';
import { makeSelectUserUuid } from '../Events/selectors';

export function EventDetails({
  userId,
  dispatch,
  match,
  eventDetails,
  userInfo,
  myGolferInfo,
}) {
  useInjectReducer({ key: 'eventDetails', reducer });
  useInjectSaga({ key: 'eventDetails', saga });
  useInjectReducer({ key: 'events', reducer: eventsReducer });
  useInjectSaga({ key: 'events', saga: eventsSaga });

  // TODO: Refactor Play.js to not depend on all events existing
  // Fetch all events because Play.js expects this data
  useEffect(() => {
    dispatch(fetchEventsAction());
    dispatch(fetchTournamentsAction());
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPrivateEventsAction(userId));
    } else {
      dispatch(clearPrivateEventsAction());
    }
  }, [userId]);

  useEffect(() => {
    if (!isNaN(match.params.eventId) && match.params.eventId < 900000) { //eslint-disable-line
      dispatch(fetchEventDetails(match.params.eventId));
      dispatch(fetchEventLeaderboard(match.params.eventId));
    } else {
      dispatch(fetchPrivateEventDetails(match.params.eventId, userInfo.uuid));
    }
  }, []);

  const [newAccount, setNewAccount] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openGolferModal, setOpenGolferModal] = useState(false);
  const [openLeaderboard, setOpenLeaderboard] = useState(false);

  const { eventDetails: details, competitions } = eventDetails;
  const nowTime = moment();

  if (!details) {
    return <></>;
  }

  // Note need to pull the time and not use the browser time as it could be off.
  const startTime = moment(details.starttime).local();
  const endTime = moment(details.endtime).local();
  const timeRemaining = moment.duration(endTime.diff(nowTime));
  const eventInProgress = endTime > nowTime && startTime <= nowTime;
  const zoneName = moment.tz.guess();
  const timezone = moment.tz(zoneName).zoneAbbr();

  let disableButton = true;
  let endedEvent = false;
  if (eventInProgress) {
    disableButton = false;
  } else if (endTime < nowTime) {
    disableButton = false;
    endedEvent = true;
  }

  const isTourney = details.competitiontype === 'tournament';

  if (isTourney) {
    if (
      details.TournamentCompetition.numberattemptsallowed <=
        details.roundsstarted &&
      details.TournamentCompetition.numberattemptsallowed !== 0
    ) {
      disableButton = true;
    }
  }

  const renderTime = () => {
    if (startTime > nowTime)
      return (
        <h3 className="text-sm text-blueberry">
          {isTourney ? 'Tournament' : 'Skills Challenge'} starts at{' '}
          {startTime.local().format('M/D/YY h:mm A')} {timezone}
        </h3>
      );
    if (endTime > nowTime)
      return (
        <h3 className="text-sm text-blueberry">
          Ends in: {Math.floor(timeRemaining.asDays()).toFixed(0)} days{' '}
          {timeRemaining.hours()} hours {timeRemaining.minutes()} minutes
        </h3>
      );
    return (
      <h3 className="text-sm text-blueberry">
        {isTourney ? 'Tournament' : 'Contest'} ended on{' '}
        {endTime.format('M/D/YY h:mm A z')} {timezone}
      </h3>
    );
  };

  const renderPlayJoinButton = () => {
    if (!details.PrivateCompetition) {
      return (
        <p className="mt-5 md:mt-0 flex flex-col items-end justify-center w-full">
          <button
            disabled={disableButton}
            type="button"
            className="btn rounded w-full md:w-64 text-center"
            onClick={() => {
              if (!userInfo.uuid) {
                setOpenModal(true);
              } else {
                window.dataLayer.push({
                  category: 'challenge',
                  action: 'enter event',
                  label: details.title,
                  event: 'enter event',
                });

                setOpenGolferModal(true);
              }
            }}
          >
            Play: {details.energycost} energy
          </button>
          {details.competitiontype === 'tournament' && (
            <span className="mt-5 text-sm">
              By participating in this contest, you agree to the{' '}
              <Link to="/tournament-rules">official rules.</Link>
            </span>
          )}
        </p>
      );
    }
    if (
      details.PrivateCompetition.Participants &&
      details.PrivateCompetition.Participants.length > 0
    ) {
      let disableState = disableButton;
      if (
        details.PrivateCompetition.numberattemptsallowed <=
          details.roundsstarted &&
        details.PrivateCompetition.numberattemptsallowed !== 0
      ) {
        disableState = true;
      }

      return (
        <p className="mt-5 md:mt-0 flex items-center justify-end w-full">
          <Link
            to={`/play/privatecontest/${
              details.PrivateCompetition.Participants[0].tokenid
            }/${details.courseid}`}
            disabled={disableState}
            className="btn rounded overflow-hidden w-full md:w-64 text-center"
            onClick={() => {
              window.dataLayer.push({
                category: 'private competition',
                action: 'enter event',
                label: details.title,
                event: 'enter event',
              });
            }}
          >
            Play
          </Link>
        </p>
      );
    }

    return (
      <p className="mt-5 md:mt-0 flex items-center justify-end w-full">
        <button
          disabled={disableButton}
          type="button"
          className="btn rounded overflow-hidden w-full md:w-64 text-center"
          onClick={() => {
            if (!userInfo.uuid) {
              setOpenModal(true);
            } else {
              window.dataLayer.push({
                category: 'private competition',
                action: 'join event',
                label: details.title,
                event: 'join event',
              });

              setOpenGolferModal(true);
            }
          }}
        >
          Select a Blocklete
        </button>
      </p>
    );
  };

  return (
    <>
      <Layout>
        <NavBackTo target="events" />
        <UserModal
          tag="event"
          newAccount={newAccount}
          onOpen={openModal}
          callbackClose={() => setOpenModal(false)}
          callbackSwitch={() => {
            if (!newAccount) {
              let tempObj = {
                event: 'create account',
                type: 'modal',
              };
              try {
                Bootstrapper.PubSub.publish('interaction', tempObj); // eslint-disable-line
              } catch {
                tempObj = {
                  event: 'create account',
                  type: 'modal',
                };
              }
            } else {
              let tempObj = {
                event: 'sign in',
                type: 'modal',
              };
              try {
                Bootstrapper.PubSub.publish('interaction', tempObj); // eslint-disable-line
              } catch {
                tempObj = {
                  event: 'sign in',
                  type: 'modal',
                };
              }
            }
            setNewAccount(!newAccount);
          }}
        />
        <GolferSelectorModal
          onOpen={openGolferModal}
          callbackClose={() => setOpenGolferModal(false)}
          myTokens={myGolferInfo}
          courseId={details.courseid}
          user={userInfo}
          privateComp={details.PrivateCompetition}
          golferJoined={golferId =>
            dispatch(
              joinPrivateEvent(match.params.eventId, userInfo.uuid, golferId),
            )
          }
        />
        <article className="mb-32 md:mx-10">
          <div className="container bg-white p-5 mx-auto md:px-12 lg:px-32 mt-10 md:pt-20 md:flex justify-between items-center md:items-start">
            <div>
              <h2 className="uppercase text-sm tracking-wide">
                {has(details, 'PrivateCompetition')
                  ? 'Private Game'
                  : 'Golfer Game'}
              </h2>
              <h1 className="my-3 text-blueberry leading-7 md:text-3xl">
                {details.title}
              </h1>
              {renderTime()}
            </div>
            <GradientWrapper className="md:flex justify-end items-end">
              {endedEvent && (
                <button
                  disabled={disableButton}
                  type="button"
                  className="mt-5 btn w-full md:w-1/3  md:mt-0"
                  onClick={() => {
                    setOpenLeaderboard(true);
                  }}
                >
                  See Results
                </button>
              )}
              {!endedEvent && renderPlayJoinButton()}
            </GradientWrapper>
          </div>
          <div className="container mx-auto md:px-12 lg:px-32 p-5 bg-white py-10 md:flex flex-row-reverse justify-between gap-10">
            <div className="md:w-1/2 xl:w-1/3">
              {!isEmpty(competitions) && (
                <Leaderboard
                  myGolferId={parseInt(match.params.golferId, 10)}
                  eventDetails={details}
                  eventInProgress={eventInProgress}
                  eventTitle={details.title}
                  competitions={competitions}
                  startDate={startTime.format('MMMM D, h:mm A z')}
                  endDate={endTime.format('MMMM D, h:mm A z')}
                  openModalFromParent={openLeaderboard}
                  closeModal={() => {
                    setOpenLeaderboard(false);
                  }}
                />
              )}
              {details.Reward && (
                <PrizesTable reward={details.Reward} isTourney={isTourney} />
              )}
              {details.PrivateCompetition && (
                <PrivateEventJoinForm
                  darkMode
                  tokenForInvite={details.PrivateCompetition.uuid}
                />
              )}
            </div>
            <div className="md:w-1/2 xl:w-1/3">
              <article className="mt-10 md:mt-0">
                <section className="mb-5">
                  <p>{details.description}</p>
                </section>

                {!details.PrivateCompetition && (
                  <>
                    {details.rules && (
                      <section className="mb-10">
                        <HeadingLabel>Eligibility</HeadingLabel>
                        <p>{details.rules}</p>
                      </section>
                    )}
                    <section className="mb-10">
                      <HeadingLabel>Course Conditions</HeadingLabel>
                      <table className="table-auto">
                        <tbody>
                          {details.arenadescription && (
                            <TableRow>
                              <TableCellLabel>Arena</TableCellLabel>
                              <TableCellValue>
                                {details.arenadescription}
                              </TableCellValue>
                            </TableRow>
                          )}
                          {details.windspeed && (
                            <TableRow>
                              <TableCellLabel>Wind</TableCellLabel>
                              <TableCellValue>
                                {details.windspeed} Winds
                              </TableCellValue>
                            </TableRow>
                          )}
                          {details.hazards && (
                            <TableRow>
                              <TableCellLabel>Hazards</TableCellLabel>
                              <TableCellValue>{details.hazards}</TableCellValue>
                            </TableRow>
                          )}
                        </tbody>
                      </table>
                    </section>
                  </>
                )}

                {details.Challenge && !isTourney && (
                  <section className="mb-5">
                    <HeadingLabel>Bonus Challenges</HeadingLabel>
                    <table className="table-auto">
                      <tbody>
                        <TableRow>
                          <TableCellLabel>
                            {details.Challenge.title}
                          </TableCellLabel>
                          <TableCellValue>
                            {details.Challenge.description}
                          </TableCellValue>
                        </TableRow>
                        <TableRow>
                          <TableCellLabel>Prize</TableCellLabel>
                          <TableCellValue>
                            {details.Challenge.trophyreward}{' '}
                            {capitalize(details.Challenge.attribute)} Medals
                          </TableCellValue>
                        </TableRow>
                      </tbody>
                    </table>
                  </section>
                )}
                {details.PrivateCompetition && (
                  <section className="mb-5">
                    <HeadingLabel>Play with Friends</HeadingLabel>
                    <table className="table-auto">
                      <tbody>
                        {details.creatorusername && (
                          <TableRow>
                            <TableCellLabel>Host</TableCellLabel>
                            <TableCellValue>
                              {details.creatorusername}
                            </TableCellValue>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCellLabel>Attempts Allowed</TableCellLabel>
                          <TableCellValue>
                            {details.PrivateCompetition.numberattemptsallowed}
                          </TableCellValue>
                        </TableRow>
                        <TableRow>
                          <TableCellLabel>Wind</TableCellLabel>
                          <TableCellValue>
                            {capitalize(details.PrivateCompetition.windsetting)}
                          </TableCellValue>
                        </TableRow>
                        <br />
                        <br />
                        <TableRow>
                          <TableCellLabel>My Blocklete</TableCellLabel>
                          <TableCellValue>
                            {details.PrivateCompetition.Participants &&
                              (details.PrivateCompetition.Participants.length >
                              0
                                ? details.PrivateCompetition.Participants[0]
                                    .tokenid
                                : 'N/A')}
                          </TableCellValue>
                        </TableRow>
                        <TableRow>
                          <TableCellLabel>Attempts Used</TableCellLabel>
                          <TableCellValue>
                            {details.roundsstarted}
                          </TableCellValue>
                        </TableRow>
                      </tbody>
                    </table>
                  </section>
                )}
              </article>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}

EventDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  eventDetails: PropTypes.object,
  userInfo: PropTypes.object,
  myGolferInfo: PropTypes.array,
  userId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  eventDetails: makeSelectEventDetails(),
  userInfo: makeSelectUserInfo(),
  myGolferInfo: makeSelectMyGolferInfo(),
  userId: makeSelectUserUuid(),
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

export default compose(withConnect)(EventDetails);
