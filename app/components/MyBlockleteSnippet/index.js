/**
 *
 * MyBlockleteSnippet
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { GolferImageWrapper } from './styled';
import ordinalSuffixOf from '../../utils/ordinal';
import TrophyStat from '../TrophyStat';

// import styled from 'styled-components';

function MyBlockleteSnippet({ golferDetails, eventDetails }) {
  // const golferDetails = eventDetails.golferDetails;
  const token = golferDetails.GolferToken;
  const trophyInfo = token && token.GolferTrophyInfo;
  return (
    <article>
      <section className="grid grid-cols-12 gap-6 h-full">
        <dl className="col-span-6">
          <dt className="hidden">Username</dt>
          <dd className="text-base text-blueberry font-heavy">
            {golferDetails.username}
          </dd>

          <dt className="hidden">golferId</dt>
          <dd className="text-sml tracking-wide mb-3">
            Golfer ID {golferDetails.tokenid}
          </dd>

          <div className="flex flex-col-reverse mb-3">
            <dt className="text-sml tracking-wide">Rank</dt>
            <dd className="text-base text-blueberry font-heavy">
              {ordinalSuffixOf(golferDetails.rank)}
            </dd>
          </div>

          <div className="flex flex-col-reverse mb-3">
            <dt className="text-sml tracking-wide">High Score</dt>
            <dd className="text-base text-blueberry font-heavy">
              {golferDetails.bestscore}
            </dd>
          </div>

          <dt className="text-base text-blueberry font-heavy">
            {eventDetails.Challenge && eventDetails.Challenge.title}
          </dt>
          <dd className="text-sml tracking-wide">
            Challenge{' '}
            {golferDetails.challengecompleted ? 'Complete' : 'Incomplete'}
          </dd>
        </dl>
        {!isEmpty(token) && (
          <div className="col-span-6 relative">
            <GolferImageWrapper
              className="h-full"
              style={{ minWidth: '100px' }}
              sex={token.reserved}
              shape={token.shape}
              driverIndex={token.driver}
              skinToneIndex={token.skintone}
              eyeIndex={token.eyes}
              noseIndex={token.nose}
              mouthIndex={token.mouth}
              eyebrowIndex={token.eyebrows}
              hairIndex={token.hair}
              hatIndex={token.hat}
              pantsIndex={token.pants}
              shirtIndex={token.shirt}
              shoeIndex={token.shoes}
              glassesIndex={token.lookattribute1}
              sexAttribute1Index={token.lookattribute2}
            />
          </div>
        )}
      </section>

      {trophyInfo && (
        <div className="mt-10">
          <TrophyStat
            powerTrophies={trophyInfo.powertrophiestotal}
            accuracyTrophies={trophyInfo.accuracytrophiestotal}
            composureTrophies={trophyInfo.composuretrophiestotal}
            staminaTrophies={trophyInfo.staminatrophiestotal}
          />
        </div>
      )}
    </article>
  );
}

MyBlockleteSnippet.propTypes = {
  eventDetails: PropTypes.object.isRequired,
  golferDetails: PropTypes.object.isRequired,
};

export default memo(MyBlockleteSnippet);
