import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  GolferBackground,
  GolferBackgroundImg,
  GolferDetailsBackground,
} from '../Golfers/PurchaseCard/styled';
// import { getBadgeSvg } from '../../../utils/playerType';
import {
  makeSelectGolferDetails,
  makeSelectUserData,
  makeSelectMyWatchlist,
} from '../../containers/GolferDetails/selectors';
import {
  addToWatchList,
  removeFromWatchlist,
} from '../../containers/GolferDetails/actions';
import saga from '../../containers/GolferDetails/saga';
// import PercentageMeter from './PercentageMeter';
import accuracy from '../../images/marketplace/accuracy.svg';
import stamina from '../../images/marketplace/stamina.svg';
import focus from '../../images/marketplace/focus.svg';
import power from '../../images/marketplace/power.svg';
import { AiFillStar } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa';
import { createStructuredSelector } from 'reselect';
import { loadMyWatchList } from '../../containers/Header/actions';
import GearStyle from '../GearStyle';
import ChargeProgressBar from '../ChargeProgressBar';
import { capitalize } from 'lodash';

const GearCard = props => {
  const [ownerOfTheToken, setOwnerOfTheToken] = useState(false);

  useInjectSaga({ key: 'golferDetails', saga });

  //when page loads, get updated watchlist from redux
  useEffect(() => {
    if (!props.clubhouseGear && props.golfer.tokenId) {
      props.golfer.tokenid = props.golfer.tokenId;
    }
    // props.dispatch(getGolferDetails(props.golfer.tokenid));
    if (props.user.uuid || !props.user.uuid === '') {
      props.dispatch(loadMyWatchList(props.user.uuid));
    }
  }, []);

  //when golferDetails is available, see if current user is the owner of a golfer
  useEffect(() => {
    console.log(
      'props.user.flowaddress ',
      props.user.flowaddress,
      ' props.golferDetails.details.owner ',
      props.golferDetails.details.owner,
    );
    if (
      !props.clubhouseGear &&
      (props.clubhouseGolfer ||
        props.user.flowaddress === props.golferDetails.details.owner ||
        props.user.flowaddress === props.golfer.seller ||
        (props.golferDetails.details.FlowGolfersForSale &&
          props.golferDetails.details.FlowGolfersForSale.flowaddress ===
            props.user.flowaddress))
    ) {
      setOwnerOfTheToken(true);
    } else {
      setOwnerOfTheToken(false);
    }
  }, [props.golferDetails.details]);

  let thisCard = {};
  let gearRarity = '';
  let gearColor = '';
  let gearOdds = 0;
  if (props.renderingForWatchlist && props.golfer) {
    thisCard = {
      ...props.allAvailableGolfers.find(
        g => g.tokenid === props.golfer.tokenid,
      ),
    };
  } else if (props.clubhouseGear) {
    thisCard = props.gear;
    switch (thisCard.rarity) {
      case 'novice':
        gearRarity = 'novice';
        gearColor = 'bronze';
        gearOdds = 10000;
        break;
      case 'pro':
        gearRarity = 'pro';
        gearColor = 'silver';
        gearOdds = 5000;
        break;
      case 'elite':
        gearRarity = 'select';
        gearColor = 'gold';
        gearOdds = 1000;
        break;
      case 'legend':
        gearRarity = 'exclusive';
        gearColor = 'diamond';
        gearOdds = 50;
        break;
    }
  } else if (props.gear) {
    thisCard = props.gear;
    switch (thisCard.rarity) {
      case 'novice':
        gearRarity = 'novice';
        gearColor = 'bronze';
        gearOdds = 10000;
        break;
      case 'pro':
        gearRarity = 'pro';
        gearColor = 'silver';
        gearOdds = 5000;
        break;
      case 'elite':
        gearRarity = 'select';
        gearColor = 'gold';
        gearOdds = 1000;
        break;
      case 'legend':
        gearRarity = 'exclusive';
        gearColor = 'diamond';
        gearOdds = 50;
        break;
    }
  } 

  let displayPrice;
  if (thisCard.price) {
    displayPrice = thisCard.price.toString().replace(/\.00$/, '');
  }

  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };
  const displayToken = tokenPad(thisCard.tokenid);

  const overallScore =
    thisCard.accuracytotal +
    thisCard.composuretotal +
    thisCard.staminatotal +
    thisCard.powertotal;

  const potentialScore =
    thisCard.accuracypeak +
    thisCard.composurepeak +
    thisCard.staminapeak +
    thisCard.powerpeak;

  const overallPercentage = overallScore / potentialScore;

  let CardImage = '';
  let collectibleType = '';
  if (thisCard.image_url) {
    CardImage = thisCard.image_url;
    if (props.renderingForWatchlist) {
      collectibleType = thisCard.class;
    } else {
      collectibleType = props.golfer.class;
    }
  } else if (thisCard.traits) {
    CardImage = JSON.parse(thisCard.traits).image_url;
    collectibleType = thisCard.GolfType.class;
  } else if (thisCard.golfer && thisCard.golfer.traits) {
    CardImage = JSON.parse(thisCard.golfer.traits).image_url;
  } else if (props.clubhouseGear) {
    CardImage = props.gear.skin;
  }

  const gearDescriptors = {
      classOne: props.gear.style[0],
      classTwo: props.gear.style[1],
      classThree: gearColor
  }

  const gearStat = (img, total, title) => {
    return (
      <div className="w-1/2 mx-1 text-center py-1 rounded-3xl border-gray-200 border-2 bg-white">
        <img className="inline pr-1 w-5" src={img} />
        <span className="font-black text-md">
          {total > 0 && '+'}
          {total}
        </span>
      </div>
    );
  };

  let tokenId;
  if (props.clubhouseGear || props.gear) {
    tokenId = thisCard.rarity;
  } else {
    tokenId = thisCard.tokenid;
  }

//   console.log(tokenId);

  /*eslint-disable*/
  return (
    <div
      className="relative grid"
      style={{
        borderRadius: '13px',
        border: 'solid 3px #d0d0d0',
        margin: '10px',
      }}
    >
      {/* {!props.golfer && <p>loading...</p>} */}
      {props.gear && (
        <GolferBackground className="rounded-t-2xl">
          <div className="grid relative">
            <div className="h-auto items-center justify-center">
              <div>
                <GolferBackgroundImg
                  className={
                    'flex justify-center items-start rounded-t-xl gear'
                  }
                  tokenId={tokenId}
                >
                  <img
                    src={CardImage}
                    alt={'Gear Image'}
                  />
                  {displayPrice && (
                    <div className="flex-col items-center text-center p-3 absolute -right-0">
                      <span className="flex">
                        <h1 className="m-0 text-white font-black text-sm">$</h1>
                        <h1 className="m-0 text-white font-black text-3xl">
                          {displayPrice}
                        </h1>
                      </span>
                    </div>
                  )}
                </GolferBackgroundImg>
                  <GolferDetailsBackground
                    className="flex-col rounded-b-xl gear-details"
                    style={{ height: '100%' }}
                  >
                    <div className="flex justify-start ml-3 mb-0">
                      <span className="m-0 text-sml pt-11 font-normal capitalize">
                        {gearRarity} (1/{gearOdds})
                      </span>
                    </div>
                    <div className="flex justify-start capitalize ml-3">
                      <span className="mb-1 text-2xl font-black">
                        {gearRarity} {props.gear.type}
                      </span>
                    </div>
                    <div className="ml-3 uppercase">
                      <GearStyle descriptors={gearDescriptors} gearCard/>
                    </div>
                    <div className="w-11/12 ml-3 my-3">
                        <ChargeProgressBar  gearCard/>
                    </div>
                    <div className='flex justify-around w-11/12 ml-3'>
                        {thisCard.powertotal != 0 &&
                        gearStat(power, thisCard.powertotal, 'Power')}
                        {thisCard.accuracytotal != 0 &&
                        gearStat(accuracy, thisCard.accuracytotal, 'Accuracy')}
                        {thisCard.composuretotal != 0 &&
                        gearStat(focus, thisCard.composuretotal, 'Focus')}
                        {thisCard.staminatotal != 0 &&
                        gearStat(stamina, thisCard.staminatotal, 'Stamina')}
                    </div>
                    <hr />
                    <div className="flex justify-around text-center">
                      {!ownerOfTheToken &&
                        !props.myWatchlist.find(
                          w => w.tokenid == props.gear.tokenid,
                        ) && (
                          <div
                            className="flex mb-2 mx-auto cursor-pointer"
                            onClick={() => {
                              if (!props.user.uuid || props.user.uuid === '') {
                                // bring user to sign in page
                                props.history.push('/signin');
                              } else {
                                props.dispatch(
                                  addToWatchList({
                                    userId: props.user.uuid,
                                    tokenId: props.golfer.tokenid,
                                    golfer: props.golfer,
                                  }),
                                );
                              }
                            }}
                          >
                            <p className="mb-0 font-light text-dark-indigo">
                              Watchlist
                            </p>
                            <AiFillStar className="my-auto m-1 text-subtle-grey" />
                          </div>
                        )}
                      {!ownerOfTheToken &&
                        props.myWatchlist.find(
                          w => w.tokenid == props.gear.tokenid,
                        ) && (
                          <div
                            className="flex mb-2 mx-auto cursor-pointer"
                            onClick={() => {
                              if (!props.user.uuid || props.user.uuid === '') {
                                // bring user to sign in page
                                props.history.push('/signin');
                              } else {
                                props.dispatch(
                                  removeFromWatchlist({
                                    userId: props.user.uuid,
                                    tokenId: props.golfer.tokenid,
                                    golfer: props.golferDetails.details,
                                  }),
                                );
                              }
                            }}
                          >
                            <p className="mb-0 font-light text-dark-indigo">
                              Remove
                            </p>
                            <AiFillStar className="my-auto m-1 text-green-400" />
                          </div>
                        )}

                      {!ownerOfTheToken && (
                        <div className="border-r-2 mb-2 pl-2" />
                      )}
                      <div
                        className="flex mb-2 mx-auto cursor-pointer"
                        onClick={() => {
                          if (ownerOfTheToken) {
                            props.history.push(
                              `/clubhouse/${props.golfer.tokenid}`,
                            );
                          } else {
                            props.history.push(
                              `/golfer-details/0/${props.golfer.tokenid}`,
                            );
                          }
                        }}
                      >
                        <p className="mb-0 font-normal text-dark-indigo">
                          {ownerOfTheToken ? 'View Details' : 'Buy Now'}
                        </p>
                        <FaChevronRight className="my-auto m-1 text-dark-indigo" />
                      </div>
                    </div>
                  </GolferDetailsBackground>
              </div>
            </div>
          </div>
        </GolferBackground>
      )}
    </div>
  );
};
/* eslint-enable */

GearCard.propTypes = {
  selectable: PropTypes.bool,
  playerGolfer: PropTypes.bool,
  etherValue: PropTypes.number,
  golfer: PropTypes.object,
  userid: PropTypes.string,
  detectedEth: PropTypes.string,
  dispatch: PropTypes.any,
  practiceCallback: PropTypes.func,
  onClick: PropTypes.func,
  clubhouseGolfer: PropTypes.bool,
  myWatchGolfer: PropTypes.bool,
  contestGolfer: PropTypes.bool,
  match: PropTypes.object.isRequired,
  clubhouseGear: PropTypes.bool,
  gear: PropTypes.object,
};

GearCard.defaultProps = {
  selectable: true,
};

const mapStateToProps = createStructuredSelector({
  golferDetails: makeSelectGolferDetails(),
  user: makeSelectUserData(),
  myWatchlist: makeSelectMyWatchlist(),
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
  )(GearCard),
);
