/**
 *
 * EventList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import web3 from 'web3';
import EventCard from '../EventCard';
import PrivateInviteCard from '../PrivateInviteCard';

// import styled from 'styled-components';

function EventList({ events, golferId, userId, showPrivateCard }) {
  const formatReward = (reward, competitiontype) => {
    if (reward) {
      if (competitiontype === 'tournament') {
        const amount = web3.utils.fromWei(
          web3.utils.toWei(reward.firstplace.toString(), 'gwei'),
          'ether',
        );
        return `${amount} Ethereum`;
      }

      return `${reward && reward.firstplace} ${reward &&
        reward.type.toUpperCase()} medals`;
    }

    return null;
  };

  return (
    <ul className="md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {events.map(
        ({
          id,
          title,
          competitiontype,
          energycost,
          starttime,
          endtime,
          PrivateCompetition,
          Reward,
        }) => (
          <EventCard
            golferId={golferId}
            key={id}
            eventId={id}
            title={title}
            type={competitiontype}
            reward={formatReward(Reward, competitiontype)}
            cost={energycost}
            startTime={starttime}
            endTime={endtime}
            privateInfo={PrivateCompetition}
          />
        ),
      )}
      {showPrivateCard && <PrivateInviteCard userId={userId} />}
    </ul>
  );
}

EventList.propTypes = {
  golferId: PropTypes.number,
  events: PropTypes.array,
  userId: PropTypes.string,
  showPrivateCard: PropTypes.bool,
};

export default memo(EventList);
