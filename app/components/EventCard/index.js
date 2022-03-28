/**
 *
 * EventCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { Container } from './styled';
import medalIcon from '../../images/medal-icon.svg';
import dollarIcon from './images/dollar-icon.svg';
import energyIcon from '../../images/energy.svg';

function EventCard({
  title,
  type,
  cost,
  startTime,
  endTime,
  eventId,
  golferId,
  reward,
  privateInfo,
}) {
  const nowTime = moment().local();
  const eventStartTime = moment(startTime).local();
  const eventEndTime = moment(endTime).local();
  const zoneName = moment.tz.guess();
  const timezone = moment.tz(zoneName).zoneAbbr();

  let linkId = eventId;
  if (privateInfo) {
    linkId = privateInfo.uuid;
  }

  let status = 'upcoming';
  if (nowTime > eventEndTime) {
    status = 'results';
  } else if (nowTime < eventEndTime && eventStartTime < nowTime) {
    status = 'active';
  }

  return (
    <Container>
      <Link
        className="block text-black mb-5"
        to={
          golferId
            ? `/clubhouse/${golferId}/events/${linkId}`
            : `/events/${linkId}`
        }
        onClick={() => {
          window.dataLayer.push({
            category: 'challenge',
            action: 'select card',
            label: title,
            eventStatus: status,
            event: 'select card',
          });
        }}
      >
        <p className="text-itas-lavender border-itas-lavender border-b-2 mx-5 font-heavy uppercase tracking-widest text-xs pt-3 py-2 block">
          {type === 'contest' && 'Skills Challenge'}
          {type === 'skillschallenge' && 'Skills Challenge'}
          {type === 'tournament' && 'Tournament'}
          {type === 'playervplayer' && 'Private Challenge'}
        </p>
        <div className="px-5 pt-2 pb-5">
          <div className="flex items-start justify-start">
            <img
              className="inline-block mt-2 mr-3 w-5"
              src={type === 'tournament' ? dollarIcon : medalIcon}
              alt="event icon"
            />
            <h1 className="inline-block text-base text-cornflower">{title}</h1>
          </div>

          {reward && (
            <p className="ml-8 text-sml tracking-wide text-cornflower">
              Prize: {reward}
            </p>
          )}
          {cost > 0 && (
            <p className="text-green-golf-green text-sml my-2 flex items-center">
              <img
                className="inline-block w-3 mr-4 ml-1"
                src={energyIcon}
                alt="energy icon"
              />
              {cost} Energy
            </p>
          )}
          {eventEndTime < nowTime && (
            <p className="ml-8 text-xs tracking-wide">
              Ended {eventEndTime.fromNow()}
            </p>
          )}
          {eventEndTime > nowTime && (
            <p className="ml-8 text-xs tracking-wide">
              {eventStartTime.format('MMMM Do, h:mmA')} {timezone} -{' '}
              {eventEndTime.format('MMMM Do, h:mmA z')} {timezone}
            </p>
          )}
        </div>
      </Link>
    </Container>
  );
}

EventCard.propTypes = {
  golferId: PropTypes.number,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  reward: PropTypes.string,
  privateInfo: PropTypes.object,
};

export default EventCard;
