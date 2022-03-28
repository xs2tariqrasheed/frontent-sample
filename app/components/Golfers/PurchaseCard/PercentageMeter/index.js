import React from 'react';
import chart1 from '../../../../images/marketplace/meter/chart1BarFilled.svg';
import chart2 from '../../../../images/marketplace/meter/chart2BarsFilled.svg';
import chart3 from '../../../../images/marketplace/meter/chart3BarsFilled.svg';
import chart4 from '../../../../images/marketplace/meter/chart4BarsFilled.svg';
import chart5 from '../../../../images/marketplace/meter/chart5BarsFilled.svg';
import chart6 from '../../../../images/marketplace/meter/chart6BarsFilled.svg';
import chart7 from '../../../../images/marketplace/meter/chart7BarsFilled.svg';
import chart8 from '../../../../images/marketplace/meter/chart8BarsFilled.svg';
import chart9 from '../../../../images/marketplace/meter/chart9BarsFilled.svg';
import chart10 from '../../../../images/marketplace/meter/chart10BarsFilled.svg';
import { GolfGreenText } from '../styled';


const PercentageMeter = props => {
    const {percentage} = props;
    const roundedPercentage = Math.round(percentage * 100);

    const chartBarsFilled = () => {
        if(roundedPercentage >= 1 && roundedPercentage <= 15) {
            return chart1;
        } else if(roundedPercentage >= 16 && roundedPercentage <= 25) {
            return chart2;
        } else if(roundedPercentage >= 26 && roundedPercentage <= 35) {
            return chart3;
        } else if(roundedPercentage >= 36 && roundedPercentage <= 45) {
            return chart4;
        } else if(roundedPercentage >= 46 && roundedPercentage <= 55) {
            return chart5;
        } else if(roundedPercentage >= 56 && roundedPercentage <= 65) {
            return chart6;
        } else if(roundedPercentage >= 66 && roundedPercentage <= 75) {
            return chart7;
        } else if(roundedPercentage >= 76 && roundedPercentage <= 85) {
            return chart8;
        } else if(roundedPercentage >= 86 && roundedPercentage <= 95) {
            return chart9;
        } else if(roundedPercentage >= 96 && roundedPercentage <= 100) {
            return chart10;
        }         
    }

    const displayPercentage = () => {
        if(roundedPercentage >= 1 && roundedPercentage <= 15) {
            return '10%';
        } else if(roundedPercentage >= 16 && roundedPercentage <= 25) {
            return '20%';
        } else if(roundedPercentage >= 26 && roundedPercentage <= 35) {
            return '30%';
        } else if(roundedPercentage >= 36 && roundedPercentage <= 45) {
            return '40%';
        } else if(roundedPercentage >= 46 && roundedPercentage <= 55) {
            return '50%';
        } else if(roundedPercentage >= 56 && roundedPercentage <= 65) {
            return '60%';
        } else if(roundedPercentage >= 66 && roundedPercentage <= 75) {
            return '70%';
        } else if(roundedPercentage >= 76 && roundedPercentage <= 85) {
            return '80%';
        } else if(roundedPercentage >= 86 && roundedPercentage <= 95) {
            return '90%';
        } else if(roundedPercentage >= 96 && roundedPercentage <= 100) {
            return '100%';
        }         
    }

    
    return (
        <div className='flex justify-center items-center'>
            <img className={props.imgStyle} src={chartBarsFilled()} /*width='68'*//>
            <GolfGreenText className={props.textStyle ? 'absolute mb-0 italic font-black text-2xl' : 'absolute mb-0 font-black text-lg'}>{displayPercentage()}</GolfGreenText>
        </div>
    );
};

export default PercentageMeter;
