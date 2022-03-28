import styled from 'styled-components';

export const ThumbContainer = styled.div`
    .power {
        &::-webkit-slider-thumb {
            background-color: #ff9500;
        }
        &::-moz-range-thumb {
            background-color: #ff9500;
        }
    }
    .accuracy {
        &::-webkit-slider-thumb {
            background-color: #00ccff;
        }
        &::-moz-range-thumb {
            background-color: #00ccff;
        }
    }
    .focus {
        &::-webkit-slider-thumb {
            background-color: #d361ff;
        }
        &::-moz-range-thumb {
            background-color: #d361ff;
        }
    }
    .stamina {
         &::-webkit-slider-thumb {
            background-color: #ff296e;
        }
        &::-moz-range-thumb {
            background-color: #ff296e;
        }
    }
    .skill {
         &::-webkit-slider-thumb {
            background-color: #ff296e;
        }
        &::-moz-range-thumb {
            background-color: #ff296e;
        }
    }
    .potentialSkill {
         &::-webkit-slider-thumb {
            background-color: #ff296e;
        }
        &::-moz-range-thumb {
            background-color: #ff296e;
        }
    }
    .wind {
         &::-webkit-slider-thumb {
            background-color: ${props => (props.cardType !== 'charged' ? '#9ee8cc' : '#0ac47e')}
        }
        &::-moz-range-thumb {
            background-color: #0ac47e;
        }
    }
    .price { 
        &::-webkit-slider-thumb {
           background-color: ${props => (props.proShop === true ? 'white' : '#322c8f')};
       }
        &::-moz-range-thumb {
           background-color: ${props => (props.proShop === true ? 'white' : '#322c8f')};
       }
    }
`

export const LeftSideThumb = styled.input`
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        border: 2px solid ${props => props.outline};
        border-radius: 50%;
        cursor: pointer;
        height: 21px;
        width: 21px;
        margin-top: 10px;
        pointer-events: all;
        position: relative;
    }
    &::-moz-range-thumb {
        border: 2px solid ${props => props.outline};
        border-radius: 50%;
        cursor: pointer;
        height: 21px;
        width: 21px;
        margin-top: 10px;
        pointer-events: all;
        position: relative;
    }
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 240px;
    outline: none;
    z-index: 3;
`
export const RightSideThumb = styled.input`
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        border: 2px solid ${props => props.outline};
        border-radius: 50%;
        cursor: pointer;
        height: 21px;
        width: 21px;
        margin-top: 10px;
        pointer-events: all;
        position: relative;
    }
    &::-moz-range-thumb {
        border: 2px solid ${props => props.outline};
        border-radius: 50%;
        cursor: pointer;
        height: 21px;
        width: 21px;
        margin-top: 10px;
        pointer-events: all;
        position: relative;
    }
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 240px;
    outline: none;
    z-index: 4;
`
export const Slider = styled.div`
    position: relative;
    width: 240px;
    .power {
        background-color: #ff9500;
    }
    .accuracy {
        background-color: #00ccff;
    }
    .focus {
        background-color: #d361ff;
    }
    .stamina {
        background-color: #ff296e;
    }
    .skill {
        background-color: #ff296e;
    }
    .price {
        background-color: ${props => (props.proShop === true ? 'white' : '#322c8f')};
    }
    .potentialSkill {
        background-color: #ff296e;
    }
    .wind {
        background-color: ${props => (props.cardType !== 'charged' ? '#9ee8cc' : '#0ac47e')}
    }
    .powerLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
    .accuracyLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
    .focusLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
    .staminaLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
    .skillLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
    .priceLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
    .potentialSkillLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
    .windLabel {
        color: ${props => props.proShop ? 'white' : '#7b7b7b'};
        font-weight: ${props => props.proShop ? 'normal' : 'bold'};
    }
`
export const SliderTrack = styled.div`
    border-radius: 20px;
    height: 12px;
    position: absolute;
    background-color:  ${props => (props.proShop === true ? '#322c8f' : 'white')};
    border: ${props => (props.proShop === true ? 'none' : '1px solid #d8d8d8')};
    width: 100%;
    z-index: 1;
`
export const SliderRange = styled.div`
    border-radius: 20px;
    height: 12px;
    position: absolute;
    z-index: 2;
`
export const SliderLeftValue = styled.div`
    font-size: 14px;
    margin-top: 20px;
    position: absolute;
    left: 6px;
    font-weight: bold;
`
export const SliderRightValue = styled.div`
    font-size: 14px;
    margin-top: 20px;
    position: absolute;
    right: -4px;
    font-weight: bold;
`