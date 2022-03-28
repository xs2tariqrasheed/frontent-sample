import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useInjectSaga } from '../../../utils/injectSaga';
import PropTypes from 'prop-types';
import GolferImage from 'components/GolferImageClubhouse';
import {
  GolferContainer,
  GolferBackgroundImg,
  Industry,
  BottomCircle
} from './styled';
import {
  makeSelectGolferDetails,
  makeSelectUserData,
} from '../../../containers/GolferDetails/selectors';
import saga from '../../../containers/GolferDetails/saga';
import accuracy from '../../../images/marketplace/accuracy.svg';
import stamina from '../../../images/marketplace/stamina.svg';
import focus from '../../../images/marketplace/focus.svg';
import power from '../../../images/marketplace/power.svg';
import { createStructuredSelector } from 'reselect';

const ClubhouseCard = props => {
  useInjectSaga({ key: 'golferDetails', saga });

  //get price without trailing digits
  // const displayPrice = props.golfer.price.replace(/\.00$/, '');

  const overallScore =
    props.golfer.accuracytotal +
    props.golfer.composuretotal +
    props.golfer.staminatotal +
    props.golfer.powertotal;
  props.golfer.overallScore = overallScore;

  props.golfer.rarity = props.golfer.GolfType.class;

  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };

  // console.log('golfer in Clubhouse card', props.golfer)
  // console.log('golfer details in Clubhousecard', props.golferDetails)

  /*eslint-disable*/
  return (
    <GolferContainer 
      className={`relative grid xs:grid-cols-11 md:grid-cols-6 pt-4 cursor-pointer ${props.golfer.rarity.toLowerCase()}`}
      onClick={() =>
        props.history.push(
          `/clubhouse/${props.golfer.tokenid}`,
        )
      }
    >
      <div className="flex-col xs:col-span-3 md:col-span-1 relative" style={{height: '70px'}}>
        <GolferBackgroundImg className="items-start rounded-t-xl m-auto">
          <div className='golferImgHolder'>
            <img
              src={JSON.parse(props.golfer.traits).image_url}
              alt={`Golfer Image`}
            />
          </div>
          <BottomCircle className='items-end'>
            <div className="text-center">
              <Industry className="m-0 text-xs italic">{tokenPad(props.golfer.tokenid)}</Industry>
            </div>
          </BottomCircle>
        </GolferBackgroundImg>
      </div>
      <div className="flex-col xs:col-span-2 md:col-span-1 justify-items-center">
        <img className="m-auto" src={power} />
        <Industry className="text-center m-0 font-black text-xl">
          {props.golfer.powertotal}
        </Industry>
        <p className="text-center text-subtle-grey font-light text-xs">
          Max {props.golfer.powerpeak}
        </p>
      </div>
      <div className="flex-col xs:col-span-2 md:col-span-1 justify-items-center">
        <img className="m-auto" src={accuracy} />
        <p className="text-center m-0 font-black text-xl">
          {props.golfer.accuracytotal}
        </p>
        <p className="text-center text-subtle-grey font-light text-xs">
          Max {props.golfer.accuracypeak}
        </p>
      </div>
      <div className="flex-col xs:col-span-2 md:col-span-1 justify-items-center">
        <img className="m-auto" src={focus} />
        <p className="text-center m-0 font-black text-xl">
          {props.golfer.composuretotal}
        </p>
        <p className="text-center text-subtle-grey font-light text-xs">
          Max {props.golfer.composurepeak}
        </p>
      </div>
      <div className="flex-col xs:col-span-2 md:col-span-1 justify-items-center">
        <img className="m-auto" src={stamina} />
        <p className="text-center m-0 font-black text-xl">
          {props.golfer.staminatotal}
        </p>
        <p className="text-center text-subtle-grey font-light text-xs">
          Max {props.golfer.staminapeak}
        </p>
      </div>
      <div className='xs:hidden md:block text-center'>
        <div className='bg-indigo-400 pl-3 pr-3 pt-1 pb-1 mb-2 text-white font-extrabold rounded-xl hidden'>PLAY</div>
        <div className='text-indigo-400'>
          <div>GOLFER DETAILS</div>
        </div>
      </div>
    </GolferContainer>
  );
};
/* eslint-enable */

ClubhouseCard.propTypes = {
  selectable: PropTypes.bool,
  playerGolfer: PropTypes.bool,
  etherValue: PropTypes.number,
  golfer: PropTypes.object,
  userid: PropTypes.string,
  detectedEth: PropTypes.string,
  userWallet: PropTypes.string,
  dispatch: PropTypes.any,
  practiceCallback: PropTypes.func,
  onClick: PropTypes.func,
  parentPushCallback: PropTypes.func,
  clubhouseGolfer: PropTypes.bool,
  contestGolfer: PropTypes.bool,
  match: PropTypes.object.isRequired,
};

ClubhouseCard.defaultProps = {
  selectable: true,
};

const mapStateToProps = createStructuredSelector({
  golferDetails: makeSelectGolferDetails(),
  user: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ClubhouseCard),
);
