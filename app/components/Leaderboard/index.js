/**
 *
 * Leaderboard
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Modal from '../Modal';
import HeadingLabel from '../HeadingLabel';
import {
  GradientWrapper,
  GolferImageWrapper,
  GolferImageCropped,
} from './styled';
import TogglePill from '../TogglePill';
import MyBlockleteSnippet from '../MyBlockleteSnippet';

function Leaderboard({
  myGolferId,
  eventDetails,
  eventTitle,
  competitions,
  startDate,
  endDate,
  modalOnly,
  openModalFromParent,
  closeModal,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rank = findIndex(competitions, { tokenid: myGolferId });
  const myGolferResults = competitions[rank];
  const isGolferResultsEmpty = isEmpty(myGolferResults);

  useEffect(() => {
    if (openModalFromParent) {
      setIsOpenModal(true);
    }
  }, [openModalFromParent]);

  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };

  function renderLeaderboard(data, isModal = false) {
    return (
      <ul>
        {data.map((v, k) => (
          <GradientWrapper
            first={k === 0}
            isModal={isModal}
            className={`rounded ${
              k === 0 ? 'mb-12' : 'mb-3'
            } grid grid-cols-12 gap-6 relative p-2`}
            key={v.id}
          >
            <div className="col-span-1">
              <h1 className="z-10 text-lg text-green-golf-green">{k + 1}</h1>
            </div>
            <div className="col-span-5">
              <p
                className={`${
                  k === 0 ? 'text-lg' : 'text-sm'
                } font-heavy text-itas-lavender`}
              >
                {v.username}
              </p>
              <p className="text-sml text-itas-lavender">
                Golfer ID {tokenPad(v.tokenid)}
              </p>
            </div>
            <div className="col-span-3">
              <p
                className={`font-heavy text-itas-lavender ${
                  k === 0 ? 'text-xl' : 'text-lg'
                }`}
              >
                {v.bestscore}
                <br />
              </p>
              <p
                className={`text-sm ${k === 0 && 'text-blueberry'} font-light`}
              >
                Points
              </p>
            </div>
            <div className="col-span-3 w-100 h-auto flex items-center justify-center">
              {k === 0 && (
                <>
                  <GolferImageWrapper
                    className="absolute h-full"
                    style={{ minWidth: '50px' }}
                    sex={v.GolferToken.reserved}
                    shape={v.GolferToken.shape}
                    driverIndex={v.GolferToken.driver}
                    skinToneIndex={v.GolferToken.skintone}
                    eyeIndex={v.GolferToken.eyes}
                    noseIndex={v.GolferToken.nose}
                    mouthIndex={v.GolferToken.mouth}
                    eyebrowIndex={v.GolferToken.eyebrows}
                    hairIndex={v.GolferToken.hair}
                    hatIndex={v.GolferToken.hat}
                    pantsIndex={v.GolferToken.pants}
                    shirtIndex={v.GolferToken.shirt}
                    shoeIndex={v.GolferToken.shoes}
                    glassesIndex={v.GolferToken.lookattribute1}
                    sexAttribute1Index={v.GolferToken.lookattribute2}
                  />
                  <div className="absolute w-20" style={{ bottom: '-30px' }} />
                </>
              )}
              {k > 0 && k < 5 && (
                <GolferImageCropped
                  className="absolute h-full"
                  style={{ minWidth: '50px', top: '-5px' }}
                  sex={v.GolferToken.reserved}
                  shape={v.GolferToken.shape}
                  driverIndex={v.GolferToken.driver}
                  skinToneIndex={v.GolferToken.skintone}
                  eyeIndex={v.GolferToken.eyes}
                  noseIndex={v.GolferToken.nose}
                  mouthIndex={v.GolferToken.mouth}
                  eyebrowIndex={v.GolferToken.eyebrows}
                  hairIndex={v.GolferToken.hair}
                  hatIndex={v.GolferToken.hat}
                  pantsIndex={v.GolferToken.pants}
                  shirtIndex={v.GolferToken.shirt}
                  shoeIndex={v.GolferToken.shoes}
                  glassesIndex={v.GolferToken.lookattribute1}
                  sexAttribute1Index={v.GolferToken.lookattribute2}
                />
              )}
            </div>
          </GradientWrapper>
        ))}
      </ul>
    );
  }

  return (
    <>
      {!modalOnly && (
        <>
          <HeadingLabel className="mb-0">Leaderboard</HeadingLabel>
          {competitions && renderLeaderboard(competitions.slice(0, 5))}
          <button
            type="button"
            className="flex justify-center items-center text-sm mb-10 uppercase text-cornflower font-heavy tracking-wide"
            onClick={e => {
              e.preventDefault();
              setIsOpenModal(true);
            }}
          >
            See full Leaderboard
            <span className="inline-block ml-2 w-3 right-arrow">&nbsp;</span>
          </button>
        </>
      )}
      <Modal
        title={eventTitle}
        subtitle={`${startDate} – ${endDate}`}
        onOpen={isOpenModal}
        callbackClose={() => {
          setIsOpenModal(false);
          closeModal();
        }}
      >
        <TogglePill
          className={classNames('md:hidden', {
            hidden: isGolferResultsEmpty,
          })}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          options={['My Golfer', 'Leaderboard']}
        />
        <div className="md:grid grid-cols-12 gap-6">
          <div
            className={classNames('col-span-6', {
              block: activeIndex === 0,
              hidden: isGolferResultsEmpty || activeIndex !== 0,
            })}
          >
            <MyBlockleteSnippet
              golferDetails={{ ...myGolferResults, rank: rank + 1 }}
              eventDetails={eventDetails}
            />
          </div>
          <div
            className={classNames('overflow-scroll h-64 md:block', {
              'col-span-6': !isGolferResultsEmpty,
              'col-span-12': isGolferResultsEmpty,
              block: activeIndex === 1,
              hidden: isGolferResultsEmpty || activeIndex !== 1,
            })}
          >
            <HeadingLabel className="mb-0">Leaderboard</HeadingLabel>
            {renderLeaderboard(competitions, true)}
          </div>
        </div>
      </Modal>
    </>
  );
}

Leaderboard.propTypes = {
  myGolferId: PropTypes.number,
  eventDetails: PropTypes.object,
  eventTitle: PropTypes.string,
  competitions: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  modalOnly: PropTypes.bool,
  openModalFromParent: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default memo(Leaderboard);
