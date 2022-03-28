import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { sortGolfers } from '../../containers/Marketplace/actions';
import { sortWatchlistGolfers } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';
import {
  DropDownContainer,
  DropDownHeader,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from './styled';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Sorting = props => {
  const options = [
    'Lowest Price',
    'Highest Price',
    'Newest Listed',
    'Oldest Listed',
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setselectedOption] = useState(options[2]);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions(),
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  const { height, width } = useWindowDimensions();

  const onItemClick = (sortVal, selected) => {
    setselectedOption(selected);
    if (props.watchlist) {
      props.dispatch(sortWatchlistGolfers(sortVal));
    } else {
      props.dispatch(sortGolfers(sortVal));
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className="mr-5">
      {!isOpen && (
        <DropDownHeader
          className={`w-32 lg:w-60 mt-auto mb-auto ml-auto text-right rounded-lg ${props.proShop && 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          backgroundColor={props.proShop ? '#322c8f' : 'white'}
        >
          {width < 1024 ? (
            <div className="flex justify-center">
              <ListItem className="text-dark-indigo w-32 lg:w-60 text-center">
                Sort By
              </ListItem>
              <FaChevronDown className="text-center my-auto" />
            </div>
          ) : (
            <div className={`flex justify-between items-center pl-2 pr-2 border-2 rounded-lg ${props.proShop ?
              'border-ps-lavender' : 'border-light-grey'}`}>
              <ListItem className="font-light w-32 lg:w-60 text-left pt-0.5 pb-0.5">
                {selectedOption}
              </ListItem>
              <FaChevronDown className={`${props.proShop ? 'text-white' : 'text-dark-indigo'} h-3`} />
            </div>
          )}
        </DropDownHeader>
      )}
      {isOpen && (
        <DropDownContainer
          className="w-32 lg:w-60 rounded-lg"
          backgroundColor={props.proShop ? '#322c8f' : 'white'}
        >
          <DropDownListContainer className="w-32 lg:w-60 rounded-lg">
            <DropDownList
              className={`flex flex-col justify-between rounded-lg ${props.proShop && 'text-white'}`}
              backgroundColor={props.proShop ? '#322c8f' : 'white'}
            >
              <ListItem
                className={`pt-2 pl-2 font-normal w-32 lg:w-60 border-r-2 border-l-2  ${props.proShop &&
                  'border-ps-lavender border-t-2'} rounded-tl-lg rounded-tr-lg`}
                onClick={() =>
                  props.watchlist
                    ? onItemClick(
                        {
                          currentArray: props.watchlistUpdatedGolfers,
                          price: 'highToLow',
                        },
                        options[1],
                      )
                    : onItemClick(
                        {
                          currentArray: props.updatedGolfers,
                          price: 'highToLow',
                        },
                        options[1],
                      )
                }
              >
                Highest Price
              </ListItem>
              <ListItem
                className={`pt-2 pl-2 font-normal w-32 lg:w-60 border-r-2 border-l-2 ${props.proShop &&
                  'border-ps-lavender'}`}
                onClick={() =>
                  props.watchlist
                    ? onItemClick(
                        {
                          currentArray: props.watchlistUpdatedGolfers,
                          price: 'lowToHigh',
                        },
                        options[0],
                      )
                    : onItemClick(
                        {
                          currentArray: props.updatedGolfers,
                          price: 'lowToHigh',
                        },
                        options[0],
                      )
                }
              >
                Lowest Price
              </ListItem>
              <ListItem
                className={`pt-2 pl-2 font-normal w-32 lg:w-60 border-r-2 border-l-2 ${props.proShop &&
                  'border-ps-lavender'}`}
                onClick={() =>
                  props.watchlist
                    ? onItemClick(
                        {
                          currentArray: props.watchlistUpdatedGolfers,
                          tokenId: 'mostRecent',
                        },
                        options[2],
                      )
                    : onItemClick(
                        {
                          currentArray: props.updatedGolfers,
                          tokenId: 'mostRecent',
                        },
                        options[2],
                      )
                }
              >
                Newest Listed
              </ListItem>
              <ListItem
                className={`pt-2 pl-2 font-normal w-32 lg:w-60 border-r-2 border-l-2 border-b-2 ${props.proShop &&
                  'border-ps-lavender'} rounded-bl-lg rounded-br-lg`}
                onClick={() =>
                  props.watchlist
                    ? onItemClick(
                        {
                          currentArray: props.watchlistUpdatedGolfers,
                          tokenId: 'leastRecent',
                        },
                        options[3],
                      )
                    : onItemClick(
                        {
                          currentArray: props.updatedGolfers,
                          tokenId: 'leastRecent',
                        },
                        options[3],
                      )
                }
              >
                Oldest Listed
              </ListItem>
            </DropDownList>
          </DropDownListContainer>
        </DropDownContainer>
      )}
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapProps(store) {
  return {
    updatedGolfers: store.marketplaceSettings.filteredGolfers,
    watchlistUpdatedGolfers: store.watchlist.filteredWatchlistGolfers,
  };
}

export default withRouter(
  connect(
    mapProps,
    mapDispatchToProps,
  )(Sorting),
);
