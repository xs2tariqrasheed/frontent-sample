/**
 *
 * GolferDetailsHero
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { DetailGolferImage } from '../../containers/GolferDetails/styled';
import { getBadgeSvg } from '../../utils/playerType';
import web3 from '../../utils/ethereum/web3';

import { Container } from './styled';
import Button from '../Button';

function GolferDetailsHero({ golferDetails }) {
  const golferType = golferDetails.class;
  let price = golferDetails.price.toString();
  const ethPrice = web3.utils.fromWei(price, 'ether');

  if (!golferDetails.price || +golferDetails.price === 0) {
    price = 0;
  }

  if (
    golferDetails.GolfType.type === 'TommyWilson' ||
    golferDetails.GolfType.type === 'GeorgiaBoy' ||
    golferDetails.GolfType.type === 'RareDesigner'
  ) {
    if (golferType === 'elite') {
      price = 100;
    } else if (golferType === 'pro') {
      price = 30;
    }
  } else if (golferType === 'founder') {
    price = 100;
  } else if (golferType === 'elite') {
    price = 50;
  } else if (golferType === 'Pro') {
    price = 25;
  } else if (golferType === 'novice') {
    price = 7;
  }

  return (
    <Container
      className="
      sticky
      left-0
      top-0
      pt-12
      pb-20
      px-3
      bg-green-golf-green
    "
    >
      <div className="xs:mb-8 xs:mr-4 text-right text-gray-200 opacity-80 font-display text-sm">
        #0{golferDetails.tokenid}
      </div>
      <div className="container mx-auto md:grid-cols-12 grid grid-cols-2">
        <div
          className="
      col-span-1
      flex
      flex-col
      space-y-20
      justify-between
      items-start
      md:col-span-4
      lg:col-span-3
      md:bg-green-500
      md:rounded-3xl
      md:p-10
      "
        >
          <img
            className="w-16"
            src={getBadgeSvg(golferType)}
            alt="Golfer Skill Badge"
          />
          <h1 className="uppercase leading-tight text-base font-medium text-white">
            <span className="text-gray-100 block mb-5 font-display font-lg">
              <span className="opacity-70">Sold by</span>
              <br />{' '}
              <a className="text-white underline" href="http://placeholder.it">
                {golferDetails.owner}
              </a>
            </span>
            <span className="block mb-5 xs:text-4xl md:text-6xl font-bold text-white">
              ${parseFloat(ethPrice).toFixed(4)}
            </span>
            {/* <span className="opacity-50 font-body block text-lg tracking-wide font-light text-white uppercase">
              {parseFloat(golferDetails.price).toFixed(4)}
            </span> */}
          </h1>

          <div className="hidden md:block my-10 grid grid-cols-1 grid-rows-2 gap-2 w-full">
            <Button dark="true" textwhite="true" icon="dollar" width="w-full">
              Purchase Golfer
            </Button>
          </div>
        </div>
        <div className="relative md:col-span-8 flex flex-col justify-end items-end md:justify-center md:items-center col-span-1">
          <DetailGolferImage
            className="h-full w-1/2 md:h-2/3"
            sex={golferDetails.reserved}
            shape={golferDetails.shape}
            driverIndex={golferDetails.driver}
            skinToneIndex={golferDetails.skintone}
            eyeIndex={golferDetails.eyes}
            noseIndex={golferDetails.nose}
            mouthIndex={golferDetails.mouth}
            eyebrowIndex={golferDetails.eyebrows}
            hairIndex={golferDetails.hair}
            hatIndex={golferDetails.hat}
            pantsIndex={golferDetails.pants}
            shirtIndex={golferDetails.shirt}
            shoeIndex={golferDetails.shoes}
            glassesIndex={golferDetails.lookattribute1}
            sexAttribute1Index={golferDetails.lookattribute2}
          />
        </div>
      </div>
    </Container>
  );
}

GolferDetailsHero.propTypes = {
  golferDetails: PropTypes.object.isRequired,
};

export default memo(GolferDetailsHero);
