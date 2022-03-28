/*
 * Marketplace
 *
 * This is the game's marketplace for purchasing golfers.
 *
 *  Will switch to use a selector class for the state props piece.
 *  The reason for this change is to build out filters and sorting
 *  into the selector.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PurchaseCard from 'components/Golfers/PurchaseCard/Loadable';
import { withRouter } from 'react-router-dom';
import { MarketplaceContainer } from '../styled';

const FeaturedArtistsView = props => (
  <MarketplaceContainer className="mx-0 mb-10 lg:pr-10 lg:pl-10 lg:pb-10">
    <div className="container xs:container mx-auto md:relative lg:p-10">
      <div className="z-10 relative grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5 gap-6 md:mx-5">
        {props.artistGolfers &&
          props.artistGolfers.map(golfer => (
            <PurchaseCard
              playerGolfer={golfer.playerGolfer}
              golfer={golfer}
              key={golfer.originaldna}
              onClick={() => {
                props.history.push(`/golfer-details/0/${golfer.tokenid}`);
              }}
              parentPushCallback={() => {
                props.history.push(`/golfer-details/0/${golfer.tokenid}`);
              }}
              practiceCallback={() => {
                props.setPracticeTokenNumber(golfer.tokenid);
                props.setOpenPracticeModal(true);
              }}
              etherValue={+props.etherValue}
              userid={props.userid}
              userWallet={props.ethaddress}
              clubhouseGolfer={false}
              myWatchGolfer={false}
            />
          ))}
      </div>
    </div>
  </MarketplaceContainer>
);

/*eslint-disable */
FeaturedArtistsView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  artistGolfers: PropTypes.array,
  userid: PropTypes.string,
  etherValue: PropTypes.number,
  detectedEth: PropTypes.string,
  ethaddress: PropTypes.string,
  dispatch: PropTypes.func,
  setPracticeTokenNumber: PropTypes.func,
  setOpenPracticeModal: PropTypes.func,
};

/* eslint-enable */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapDispatchToProps)(FeaturedArtistsView));
