import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
    LeftSideThumb, 
    RightSideThumb,
    Slider,
    SliderTrack,
    SliderRange,
    SliderLeftValue,
    SliderRightValue,
    ThumbContainer
} from './styled.js';
import PropTypes from "prop-types";

const MultiRangeSlider = ({min, max, type, label, onChange, cardType, proShop}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    //convert to percentage
    const getPercent = useCallback((value) => {
       return Math.round(((value-min) / (max-min)) * 100);
    }, [min, max]);

    //when minVal changes, create a sliderRange width based on percent distance between maxVal and minVal
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);
        // console.log(minPercent)

        if(range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`
            // console.log(range.current.style)
        }
    }, [minVal, getPercent])

    //when maxVal changes, create a sliderRange width based on percent distance between maxVal and minVal
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if(range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`
        }
    }, [maxVal, getPercent])


    return (
        <>
            <ThumbContainer cardType proShop={proShop}>
                <LeftSideThumb
                    type="range"
                    min={min} 
                    max={max}
                    value={minVal}
                    //onChange event ensures minVal is never more than maxVal
                    onChange={event => {
                        const value = Math.min(Number(event.target.value), maxVal - 1);
                        setMinVal(value);
                        minValRef.current = value;
                        onChange({minVal: minVal})
                    }}
                    //changing z-index ensures if the sliders overlap, they can still be moved
                    style={{ zIndex: minVal > max - 100 && "5" }}
                    className={type}
                    outline={proShop ? '#181376' : 'white'}
                    proShop={proShop}
                />
                <RightSideThumb
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    //onChange event ensures maxVal is never less than minVal
                    onChange={event => {
                        const value = Math.max(Number(event.target.value), minVal + 1);
                        setMaxVal(value);
                        maxValRef.current = value;
                        onChange({maxVal: maxVal})
                    }}
                    className={type}
                    outline={proShop ? '#181376' : 'white'}
                    proShop={proShop}
                />
            </ThumbContainer>
            
            <Slider cardType proShop={proShop}>
                <SliderTrack cardType proShop={proShop}/>
                <SliderRange ref={range} className={type}/>
                <SliderLeftValue className={label}>{minVal}</SliderLeftValue>
                <SliderRightValue className={label}>{maxVal}</SliderRightValue>
            </Slider>
        </>
    )
}

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default MultiRangeSlider;