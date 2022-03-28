import React, { useState, useEffect } from 'react';
import { Background, Header } from './styled';
import { useSelector, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { createStructuredSelector } from 'reselect';
// import { makeSelectMyWatchlist, filteredAvailable } from '../../../containers/GolferDetails/selectors';
import PurchaseCard from '../../../components/Golfers/PurchaseCard';

const Watchlist = props => {
    // useEffect(() => {
    //     console.log('watchlist', props.myWatchlist)
    // }, [props.myWatchlist])

    const myWatchlistArray = useSelector(state => state.myGolfers.myWatchList);
    // console.log('myWatchlistArray', myWatchlistArray)

    return (
        <>
            <Background>
                <Header className='text-3xl font-black mb-6 mt-4'>Marketplace Watchlist</Header>
                <div className='flex justify-center'>
                    <div className="z-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-5 gap-x-sm gap-y-sm md:mx-5">
                        {myWatchlistArray &&
                        myWatchlistArray.length > 0 &&
                        myWatchlistArray.map(golfer => {
                            if(golfer && golfer.GolferToken && golfer.GolferToken.tokenid) { 
                                return (
                                    <PurchaseCard 
                                        playerGolfer={golfer.playerGolfer}
                                        key={golfer.tokenid}
                                        parentPushCallback={() => {
                                            props.history.push(
                                                `/golfer-details/0/${golfer.tokenid}`,
                                            );
                                        }}
                                        practiceCallback={() => {
                                            props.setPracticeTokenNumber(golfer.tokenid);
                                            props.setOpenPracticeModal(true);
                                        }}
                                        // etherValue={+props.etherValue}
                                        golfer={golfer.GolferToken}
                                        // userid={props.userid}
                                        // userWallet={props.ethaddress}
                                        clubhouseGolfer={false}
                                        myWatchGolfer={false}
                                    />
                                )
                            } else {
                                return <p>no golfer :(</p>
                            }
                        })}
                    </div>
                </div>
                
            </Background>
        </>
    )
}


const mapProps = store => {
    return {
        availableGolfers: store.availableGolfers.availableGolfers,
        // myWatchlist: store.myGolfers.myWatchList
    }
}

  export default withRouter(
    connect(
        mapProps
    )(Watchlist)
  );
  
