/**
 *
 * Events
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectActiveEvents,
  makeSelectCompletedEvents,
  makeSelectUpcomingEvents,
  makeSelectUserUuid,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Layout from '../Layout';
import {
  fetchEventsAction,
  fetchPrivateEventsAction,
  clearPrivateEventsAction,
  fetchTournamentsAction,
} from './actions';
import EventsGrid from '../../components/EventsGrid';

export function Events({
  dispatch,
  activeEvents,
  completedEvents,
  isEventsPage,
  upcomingEvents,
  userId,
}) {
  useInjectReducer({ key: 'events', reducer });
  useInjectSaga({ key: 'events', saga });

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

  return (
    <Layout>
      {!isEventsPage && (
        <div className="container mx-auto">
          <p className="text-sm font-heavy mt-10">
            <Link to="/events">&larr; See active events</Link>
          </p>
        </div>
      )}
      {isEventsPage && (
        <div className="container mx-auto">
          <p className="text-sm font-heavy text-right mt-10 mb-5">
            <Link to="/events/completed">See completed events &rarr;</Link>
          </p>
        </div>
      )}
      <EventsGrid
        className="mt-10"
        title={isEventsPage ? 'Active Games' : 'Completed Games'}
        events={isEventsPage ? activeEvents : completedEvents}
        showPrivateCard
        userId={userId}
      />
      {isEventsPage && (
        <EventsGrid title="Upcoming Games" events={upcomingEvents} />
      )}
    </Layout>
  );
}

Events.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeEvents: PropTypes.array,
  completedEvents: PropTypes.array,
  isEventsPage: PropTypes.bool,
  upcomingEvents: PropTypes.array,
  userId: PropTypes.string,
};

const mapStateToProps = () =>
  createStructuredSelector({
    activeEvents: makeSelectActiveEvents(),
    completedEvents: makeSelectCompletedEvents(),
    upcomingEvents: makeSelectUpcomingEvents(),
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

export default compose(withConnect)(Events);
