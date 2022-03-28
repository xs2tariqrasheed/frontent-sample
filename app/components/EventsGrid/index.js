/**
 *
 * EventsGrid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import EventList from '../EventList';

// import styled from 'styled-components';

function EventsGrid({
  title,
  events,
  className,
  golferId,
  userId,
  showPrivateCard,
}) {
  return (
    <article>
      <div
        className={`${className} container mx-auto px-5 pt-10 pb-20 md:flex justify-between items-center`}
        style={{ backgroundColor: '#e7e6ff' }}
      >
        <h1 className="uppercase text-itas-lavender text-2xl md:text-3xl tracking-wide">
          {title}
        </h1>
      </div>
      <section
        className="container mx-auto md:p-10 md:mb-20"
        style={{ marginTop: '-70px' }}
      >
        <EventList
          events={events}
          golferId={golferId}
          userId={userId}
          showPrivateCard={showPrivateCard}
        />
      </section>
    </article>
  );
}

EventsGrid.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  golferId: PropTypes.number,
  className: PropTypes.string,
  userId: PropTypes.string,
  showPrivateCard: PropTypes.bool,
};

export default EventsGrid;
