import React, {useState} from 'react';
import power from '../../../images/marketplace/power.svg';
import acrcy from '../../../images/marketplace/accuracy.svg';
import stmna from '../../../images/marketplace/stamina.svg';
import focus from '../../../images/marketplace/focus.svg';
import StatsContainer from './StatsContainer';

const LobbyProgressCard = props => {
    const {
		powerMedals,
		powerMedalsForLevel,
		powerPeak,
		powerTotal,
		powerBoost,
		acrcyMedals,
		acrcyMedalsForLevel,
		acrcyPeak,
		acrcyTotal,
		acrcyBoost,
		focusMedals,
		focusMedalsForLevel,
		focusPeak,
		focusTotal,
		focusBoost,
		stmnaMedals,
		stmnaMedalsForLevel,
		stmnaPeak,
		stmnaTotal,
		stmnaBoost,
		addSubtractIcons
    } = props;

	console.log('LobbyProgressCard pre-return');
	console.log('[LobbyProgressCard] acrcyMedalsForLevel', acrcyMedalsForLevel);
    return (
        <div className={'flex flex-wrap justify-center ' + (props.watchlist ? 'mt-1' : 'mt-7')}>
            <StatsContainer addSubtractIcons={addSubtractIcons} applyMedals={props.applyMedals} unapplyMedals={props.unapplyMedals} levelTempStat={props.levelTempStat} unlevelTempStat={props.unlevelTempStat} watchlist={props.watchlist} statImg={power} statTotal={powerTotal} statMax={powerPeak} medals={powerMedals} medalsForLevel={powerMedalsForLevel} boost={powerBoost} stat={'power'}></StatsContainer>
            <StatsContainer addSubtractIcons={addSubtractIcons} applyMedals={props.applyMedals} unapplyMedals={props.unapplyMedals} levelTempStat={props.levelTempStat} unlevelTempStat={props.unlevelTempStat} watchlist={props.watchlist} statImg={acrcy} statTotal={acrcyTotal} statMax={acrcyPeak} medals={acrcyMedals} medalsForLevel={acrcyMedalsForLevel} boost={acrcyBoost} stat={'accuracy'} ></StatsContainer>
            <StatsContainer addSubtractIcons={addSubtractIcons} applyMedals={props.applyMedals} unapplyMedals={props.unapplyMedals} levelTempStat={props.levelTempStat} unlevelTempStat={props.unlevelTempStat} watchlist={props.watchlist} statImg={focus} statTotal={focusTotal} statMax={focusPeak} medals={focusMedals} medalsForLevel={focusMedalsForLevel} boost={focusBoost} stat={'focus'}></StatsContainer>
            <StatsContainer addSubtractIcons={addSubtractIcons} applyMedals={props.applyMedals} unapplyMedals={props.unapplyMedals} levelTempStat={props.levelTempStat} unlevelTempStat={props.unlevelTempStat} watchlist={props.watchlist} statImg={stmna} statTotal={stmnaTotal} statMax={stmnaPeak} medals={stmnaMedals} medalsForLevel={stmnaMedalsForLevel} boost={stmnaBoost} stat={'stamina'}></StatsContainer>
		</div>
    )
}

export default LobbyProgressCard;