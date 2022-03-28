import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import novice from '../../images/marketplace/Rarity_Novice.svg';
import pro from '../../images/marketplace/RarityBadge_Pro.svg';
import elite from '../../images/marketplace/Rarity_Elite.svg';
import legend from '../../images/marketplace/RarityBadge_Legend.svg';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
} from './styled';

const Rarity = props => {
  const [isChecked, setIsChecked] = useState({});

  //update state of currently checked rarities
  const rarityChange = e => {
    props.filterChanged(true);
    setIsChecked({ ...isChecked, [e.target.value]: e.target.checked });
  };

  useEffect(() => {
    console.log('checked', isChecked)
    if(props.watchlist) {
      props.dispatch(updateWatchlistFilters(isChecked));
    } else {
      props.dispatch(updateCurrentFilters(isChecked));
    }
  }, [isChecked]);

  return (
    <form className="flex flex-wrap w-10/12 mx-auto max-h-32">
      <div className="my-2 w-1/2 overflow-hidden flex space-between max-h-16 items-center">
        <label className='max-h-32'>
          <CheckboxContainer>
            <HiddenCheckbox
              type="checkbox"
              value="novice"
              label="Novice"
              checked={isChecked['novice']}
              onChange={rarityChange}
              className="mr-1"
            />
            <StyledCheckbox
              type="checkbox"
              value="novice"
              label="Novice"
              checked={isChecked['novice']}
              onChange={rarityChange}
              className="mr-1"
              proShop={props.proShop}
            >
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            </StyledCheckbox>
          </CheckboxContainer>
        </label>
          <img className="w-1/5" src={novice} />
          <p className='my-auto text-sm text-grey opacity-90 ml-2'>Novice</p>
      </div>
      <div className="my-2 w-1/2 overflow-hidden flex max-h-16 items-center">
        <label className='max-h-32'>
          <CheckboxContainer>
              <HiddenCheckbox
                type="checkbox"
                value="pro"
                label="Pro"
                checked={isChecked['pro']}
                onChange={rarityChange}
                className="mr-1"
              />
              <StyledCheckbox
                type="checkbox"
                value="pro"
                label="Pro"
                checked={isChecked['pro']}
                onChange={rarityChange}
                className="mr-1"
                proShop={props.proShop}
              >
                <Icon viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </Icon>
              </StyledCheckbox>
          </CheckboxContainer>
        </label>
          <img className="w-1/5" src={pro} />
          <p className='my-auto text-sm text-grey opacity-90 ml-2'>Pro</p>
      </div>
      <div className="my-2 w-1/2 overflow-hidden flex max-h-16 items-center">
        <label className='max-h-32'>
          <CheckboxContainer>
            <HiddenCheckbox
              type="checkbox"
              value="elite"
              label="Elite"
              checked={isChecked['elite']}
              onChange={rarityChange}
              className="mr-1"
            />
            <StyledCheckbox
              type="checkbox"
              value="elite"
              label="Elite"
              checked={isChecked['elite']}
              onChange={rarityChange}
              className="mr-1"
              proShop={props.proShop}
            >
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            </StyledCheckbox>
          </CheckboxContainer>
        </label>
          <img className="w-1/5" src={elite} />
          <p className='my-auto text-sm text-grey opacity-90 ml-2'>Elite</p>
      </div>
      <div className="my-2 w-1/2 overflow-hidden flex max-h-16 items-center">
        <label className='max-h-32'>
          <CheckboxContainer>
            <HiddenCheckbox
              type="checkbox"
              value="legend"
              label="Legend"
              checked={isChecked['legend']}
              onChange={rarityChange}
              className="mr-1"
            />
            <StyledCheckbox
              type="checkbox"
              value="legend"
              label="Legend"
              checked={isChecked['legend']}
              onChange={rarityChange}
              className="mr-1"
              proShop={props.proShop}
            >
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            </StyledCheckbox>
          </CheckboxContainer>
        </label>
          <img className="w-1/5" src={legend} />
          <p className='my-auto text-sm text-grey opacity-90 ml-2'>Legend</p>
      </div>
    </form>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapDispatchToProps)(Rarity));
