import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  GolferBackground,
  GolferBackgroundImg,
  GolferDetailsBackground,
} from './styled';
import { getBadgeSvg } from '../../../utils/playerType';
import {
  makeSelectGolferDetails,
  makeSelectUserData,
  makeSelectMyWatchlist,
} from '../../../containers/GolferDetails/selectors';
import {
  addToWatchList,
  removeFromWatchlist,
} from '../../../containers/GolferDetails/actions';
import saga from '../../../containers/GolferDetails/saga';
import PercentageMeter from './PercentageMeter';
import accuracy from '../../../images/marketplace/accuracy.svg';
import stamina from '../../../images/marketplace/stamina.svg';
import focus from '../../../images/marketplace/focus.svg';
import power from '../../../images/marketplace/power.svg';
import { AiFillStar } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa';
import { createStructuredSelector } from 'reselect';
import { loadMyWatchList } from '../../../containers/Header/actions';

const PurchaseCard = props => {
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
  if (props.renderingForWatchlist) {
    thisCard = {
      ...props.allAvailableGolfers.find(
        g => g.tokenid === props.golfer.tokenid,
      ),
    };
  } else if (props.golfer && props.golfer.powertotal) {
    thisCard = props.golfer;
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
  } else if (props.golferDetails) {
    thisCard = props.golferDetails.details;
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

  const gearStat = (img, total, title) => {
    return (
      <div className="text-center mx-4 mt-2 py-1 rounded-3xl border-gray-200 border-4 bg-white">
        <img className="inline pr-2" src={img} />
        <span className="font-black text-md">
          {total > 0 && '+'}
          {total} {title}
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

  // console.log(tokenId);

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
      {(props.golfer || props.clubhouseGear || props.gear) && (
        <GolferBackground className="rounded-t-2xl">
          <div className="grid relative">
            <div className="h-auto items-center justify-center">
              <div>
                <GolferBackgroundImg
                  className={
                    'flex justify-center items-start rounded-t-xl ' +
                    (props.golfer ? 'golfer' : 'gear')
                  }
                  tokenId={tokenId}
                >
                  {props.golfer && (
                    <div className="flex-col items-center text-center p-3 absolute -left-0">
                      <img
                        src={getBadgeSvg(collectibleType)}
                        alt={`${collectibleType} player icon`}
                        className="m-0 w-20"
                      />
                      <p className="text-white text-xs">#{displayToken}</p>
                    </div>
                  )}
                  <img
                    src={CardImage}
                    alt={
                      (props.clubhouseGear || props.gear ? `Gear` : `Golfer`) +
                      ` Image`
                    }
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
                {props.golfer ? (
                  <GolferDetailsBackground
                    className="flex-col rounded-b-2xl"
                    style={{ height: '100%' }}
                  >
                    <div className="flex justify-between items-center m-3 pt-7 text-center">
                      <div className="flex-col justify-items-center">
                        <h1 className="m-0 text-3xl font-black">
                          {overallScore}
                        </h1>
                        <p className="m-0 text-grey font-bold text-xs opacity-70">
                          OVERALL
                        </p>
                      </div>
                      <PercentageMeter percentage={overallPercentage} />
                      <div className="flex-col justify-items-center">
                        <h1 className="m-0 text-3xl font-black">
                          {potentialScore}
                        </h1>
                        <p className="m-0 text-grey text-xs font-bold opacity-70">
                          POTENTIAL
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between m-3 pt-1 items-end">
                      <div className="flex-col justify-items-center pr-3 border-r-2">
                        <img className="m-auto" src={power} />
                        <p className="text-center m-0 font-black text-xl">
                          {thisCard.powertotal}
                        </p>
                        <p className="text-center text-grey font-bold text-xs opacity-70">
                          Power
                        </p>
                      </div>
                      <div className="flex-col justify-items-center pr-3 border-r-2">
                        <img className="m-auto" src={accuracy} />
                        <p className="text-center m-0 font-black text-xl">
                          {thisCard.accuracytotal}
                        </p>
                        <p className="text-center text-grey font-bold text-xs opacity-70">
                          Accuracy
                        </p>
                      </div>
                      <div className="flex-col justify-items-center pr-3 border-r-2">
                        <img className="m-auto" src={focus} />
                        <p className="text-center m-0 font-black text-xl">
                          {thisCard.composuretotal}
                        </p>
                        <p className="text-center text-grey font-bold text-xs opacity-70">
                          Focus
                        </p>
                      </div>
                      <div className="flex-col justify-items-center">
                        <img className="m-auto" src={stamina} />
                        <p className="text-center m-0 font-black text-xl">
                          {thisCard.staminatotal}
                        </p>
                        <p className="text-center text-grey font-bold text-xs opacity-70">
                          Stamina
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex justify-around text-center">
                      {!ownerOfTheToken &&
                        !props.myWatchlist.find(
                          w => w.tokenid == props.golfer.tokenid,
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
                          w => w.tokenid == props.golfer.tokenid,
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
                ) : (
                  <GolferDetailsBackground
                    className="flex-col rounded-b-xl gear-details"
                    style={{ height: '100%' }}
                  >
                    <div className="flex justify-center pt-11 capitalize">
                      <span className="m-0 text-2xl font-black">
                        {gearRarity} {props.gear.type}
                      </span>
                    </div>
                    <div className="flex justify-center uppercase">
                      <span className="m-0 text-sml font-black purple">
                        {props.gear.style[0]} • {props.gear.style[1]} •{' '}
                        {gearColor}
                      </span>
                    </div>
                    <div className="flex justify-center uppercase">
                      <span className="m-0 pb-1 text-sml font-normal">
                        {gearRarity} (1/{gearOdds})
                      </span>
                    </div>
                    {thisCard.powertotal != 0 &&
                      gearStat(power, thisCard.powertotal, 'Power')}
                    {thisCard.accuracytotal != 0 &&
                      gearStat(accuracy, thisCard.accuracytotal, 'Accuracy')}
                    {thisCard.composuretotal != 0 &&
                      gearStat(focus, thisCard.composuretotal, 'Focus')}
                    {thisCard.staminatotal != 0 &&
                      gearStat(stamina, thisCard.staminatotal, 'Stamina')}
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
                )}
              </div>
            </div>
          </div>
        </GolferBackground>
      )}
    </div>
  );
};
/* eslint-enable */

PurchaseCard.propTypes = {
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

PurchaseCard.defaultProps = {
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
  )(PurchaseCard),
);
