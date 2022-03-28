import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
} from './styled';

const Characteristics = props => {
  const [isChecked, setIsChecked] = useState({});

  const genderChange = e => {
     props.filterChanged(true);
    setIsChecked({ ...isChecked, [e.target.value]: e.target.checked });
  };

  useEffect(() => {
    if(props.watchlist) {
      props.dispatch(updateWatchlistFilters(isChecked));
    } else {
      props.dispatch(updateCurrentFilters(isChecked));
    }
  }, [isChecked]);

  return (
    <>
      <form className="flex flex-col flex-wrap">
        <CheckboxContainer>
          <label>
            <HiddenCheckbox
              type="checkbox"
              value="Male"
              checked={isChecked['Male']}
              onChange={genderChange}
              className="mr-2"
            />
            <StyledCheckbox
              type="checkbox"
              value="Male"
              checked={isChecked['Male']}
              onChange={genderChange}
              className="mr-2"
            >
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            </StyledCheckbox>
            Male
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <HiddenCheckbox
              type="checkbox"
              value="Female"
              checked={isChecked['Female']}
              onChange={genderChange}
              className="mr-2"
            />
            <StyledCheckbox
              type="checkbox"
              value="Female"
              checked={isChecked['Female']}
              onChange={genderChange}
              className="mr-2"
            >
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            </StyledCheckbox>
            Female
          </label>
        </CheckboxContainer>
      </form>

      {/* Waiting to complete, need designs delivered */}
      {/* <DropdownButtonStyle className='pb-80'>
                <DropdownButton
                    id="dropdown-style-button"
                    title={style}
                    style={{ width: '50%' }}
                    variant="outline-secondary"
                    as={ButtonGroup}
                    onSelect={key => {
                        setStyle(key);
                    }}
                >
                {[
                    'Glasses',
                    'Hat',
                    'Pants',
                    'Shorts',
                    'Shirt',
                    'Shoes',
                ].map(i => (
                    <Dropdown.Item eventKey={i}>{i}</Dropdown.Item>
                ))}
                </DropdownButton>
                <DropdownButton
                    id="dropdown-color-button"
                    title={color}
                    style={{ width: '50%', borderTopLeftRadius: '0px' }}
                    variant="outline-secondary"
                    as={ButtonGroup}
                    onSelect={key => {
                        setColor(key);
                }}
                >
                {[
                    'Black',
                    'Blue',
                    'Brown',
                    'Gray',
                    'Green',
                    'Orange',
                    'Pink',
                    'Purple',
                    'Red',
                    'White',
                    'Yellow',
                ].map(i => (
                    <Dropdown.Item eventKey={i}>{i}</Dropdown.Item>
                ))}
                </DropdownButton>
                <Button
                    type="button"
                    variant="link"
                    className="mt-3"
                    onClick={() => props.dispatch(filterGolfers({style, color}))}
                >
                    Add Filter
                </Button>
            </DropdownButtonStyle> */}
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapDispatchToProps)(Characteristics));
