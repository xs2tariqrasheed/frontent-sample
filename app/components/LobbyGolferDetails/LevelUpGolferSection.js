import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBadgeSvg, getPlayerType } from 'utils/playerType';
import Modal from '../Modal/index'
import close from '../../images/marketplace/icons-close.svg';
const medal = 'https://www.blockletegames.com/images/medal.png';
import LobbyProgressCard from './LobbyProgressCard/LobbyProgressCard';
import { 
  Industry, 
  ApplyMedalsDeactivated, 
  ApplyMedalsError,
  ApplyMedals,
  Parallelogram,
  CancelButton
} from './styled';
import { apiLocation } from '../../config';
import { getSession } from '../../utils/session';
import { loadMyMedals } from '../../containers/Header/NavBar/UserLink/actions';

const LevelUpGolferSection = props => {
  const [medalsApplied, setMedalsApplied] = useState(0);
  
  const [powerMedals, setPowerMedals] = useState(0); //overall medals used
  const [powerMedalsForLevel, setTempPowerMedals] = useState(0); //medals used for the current level
  const [additionalPower, setAdditionalPower] = useState(0); //shows levels gained before applying

  const [accuracyMedals, setAccuracyMedals] = useState(0);
  const [accuracyMedalsForLevel, setTempAccuracyMedals] = useState(0);
  const [additionalAccuracy, setAdditionalAccuracy] = useState(0);

  const [focusMedals, setFocusMedals] = useState(0);
  const [focusMedalsForLevel, setTempFocusMedals] = useState(0);
  const [additionalFocus, setAdditionalFocus] = useState(0);
 
  const [staminaMedals, setStaminaMedals] = useState(0);
  const [staminaMedalsForLevel, setTempStaminaMedals] = useState(0);
  const [additionalStamina, setAdditionalStamina] = useState(0);

  const collectibleType = props.golferDetails.GolfType.class;
  const playerType = getPlayerType(props.golferDetails);

  const [golferUpgradeSuccess, golferUpgradeResponse] = useState(false);

  // const golferTrophies = props.golferDetails.GolferTrophyInfo;
  // console.log('golferTrophies', golferTrophies);
  // console.log('session', getSession());
  // console.log('medals', props.medals);

  const totalTrophies = props.medals.medals;

  const insuffcientMedals = totalTrophies === 0 || medalsApplied > totalTrophies;

  const applyMedals = (type) => {
    console.log('[LevelUpGolferSection] - applyMedals ' + type);
    setMedalsApplied(medalsApplied + 1);
    switch (type) {
      case 'power':
        setPowerMedals(powerMedals + 1);
        setTempPowerMedals(powerMedalsForLevel + 1);
        break;
      case 'accuracy':
        setAccuracyMedals(accuracyMedals + 1);
        setTempAccuracyMedals(accuracyMedalsForLevel + 1);
        break;
      case 'focus':
        setFocusMedals(focusMedals + 1);
        setTempFocusMedals(focusMedalsForLevel + 1);
        break;
      case 'stamina':
        setStaminaMedals(staminaMedals + 1);
        setTempStaminaMedals(staminaMedalsForLevel + 1);
        break;
    }
    // console.log('[LevelUpGolferModal] - powerMedals', powerMedalsForLevel);
  };

  const unapplyMedals = (type) => {
    console.log('[LevelUpGolferSection] - unapplyMedals');
    setMedalsApplied(medalsApplied - 1);
    switch (type) {
      case 'power':
        setPowerMedals(powerMedals - 1);
        setTempPowerMedals(powerMedalsForLevel - 1);
        break;
      case 'accuracy':
        setAccuracyMedals(accuracyMedals - 1);
        setTempAccuracyMedals(accuracyMedalsForLevel - 1);
        break;
      case 'focus':
        setFocusMedals(focusMedals - 1);
        setTempFocusMedals(focusMedalsForLevel - 1);
        break;
      case 'stamina':
        setStaminaMedals(staminaMedals - 1);
        setTempStaminaMedals(staminaMedalsForLevel - 1);
        break;
    }
    // console.log('powerMedalsForLevel', powerMedalsForLevel);
  };

  const levelTempStat = (type) => {
    console.log('levelTempStat', type);
    // console.log('medalsUsed', medalsUsed);
    switch (type) {
      case 'power':
        // setTempPowerMedals(medalsUsed);
        setPowerMedals(powerMedals + 1);
        setTempPowerMedals(0);
        setAdditionalPower(additionalPower + 1);
        break;
      case 'accuracy':
        setAccuracyMedals(accuracyMedals + 1);
        setTempAccuracyMedals(0);
        setAdditionalAccuracy(additionalAccuracy + 1);
        break;
      case 'focus':
        setFocusMedals(focusMedals + 1);
        setTempFocusMedals(0);
        setAdditionalFocus(additionalFocus + 1);
        break;
      case 'stamina':
        setStaminaMedals(staminaMedals + 1);
        setTempStaminaMedals(0);
        setAdditionalStamina(additionalStamina + 1);
        break;
    }
    // console.log('additionalPower', additionalPower);
    // console.log('powerMedalsForLevel', powerMedalsForLevel);
  };

  const unlevelTempStat = (type, medalsUsed) => {
    console.log('unlevelTempStat', type);
    console.log('medalsUsed', medalsUsed);
    setMedalsApplied(medalsApplied - 1);
    switch (type) {
      case 'power':
        setPowerMedals(powerMedals - 1);
        setTempPowerMedals(medalsUsed);
        setAdditionalPower(additionalPower - 1);
        break;
      case 'accuracy':
        setAccuracyMedals(accuracyMedals - 1);
        setTempAccuracyMedals(medalsUsed);
        setAdditionalAccuracy(additionalAccuracy - 1);
        break;
      case 'focus':
        setFocusMedals(focusMedals - 1);
        setTempFocusMedals(medalsUsed);
        setAdditionalFocus(additionalFocus - 1);
        break;
      case 'stamina':
        setStaminaMedals(staminaMedals - 1);
        setTempStaminaMedals(medalsUsed);
        setAdditionalStamina(additionalStamina - 1);
        break;
    }
    // console.log('additionalPower', additionalPower);
  };

  const getTextStyle = () => {
    let textStyle = '';
    if(medalsApplied === 0 && insuffcientMedals === false) {
      textStyle = 'mb-0 mt-1 font-black text-lg italic';
    } else if(insuffcientMedals) {
      textStyle = 'mb-0 mt-1 font-black text-lg italic text-error-red'
    } else if(medalsApplied > 0 && insuffcientMedals === false) {
      textStyle = 'mb-0 mt-1 font-black text-lg italic text-golf-green'
    }
    return textStyle;
  }

  const upgradeGolfer = () => {
    const session = getSession();
    fetch(`${apiLocation}/private/user/upgradegolfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.itasToken}`,
      },
      body: JSON.stringify(
          {
            tokenId: props.golferDetails.tokenid, 
            upgrade: {
              total: medalsApplied,
              power: powerMedals,
              composure: focusMedals,
              stamina: staminaMedals,
              accuracy: accuracyMedals,
            }
          }
        ),
    }).then(response => {
      console.log(response);
      window.dataLayer.push({
        event: 'golfer level up',
        event_source_page: window.location.href,
        event_version: 'v2',
        golfer_type: collectibleType,
        skills_upgraded: ('total-'+ medalsApplied + ',power-' + powerMedals + ',composure-' + focusMedals + ',stamina-' + staminaMedals + ',accuracy-' + accuracyMedals),
      });
      if (response.ok && response.status == 200) {
        golferUpgradeResponse(true);
        props.completeLevelUpProcess();
        props.callbackClose();
        setMedalsApplied(0);
        setPowerMedals(0);
        setTempPowerMedals(0);
        setAdditionalPower(0);
        setAccuracyMedals(0);
        setTempAccuracyMedals(0);
        setAdditionalAccuracy(0);
        setFocusMedals(0);
        setTempFocusMedals(0);
        setAdditionalFocus(0);
        setStaminaMedals(0);
        setTempStaminaMedals(0);
        setAdditionalStamina(0);
        props.dispatch(loadMyMedals());
      }
    });
  };

  /*eslint-disable*/
  return (
    <div
      onOpen={props.onOpen}
      callbackClose={props.callbackClose}
      lobbyModal={true}
    >
      <div onOpen={golferUpgradeSuccess} callbackClose={() => golferUpgradeResponse(false)}></div>
      <div className="grid gap-2">
        {/* <div className='flex justify-between mx-3 mt-3'>
          <img
            onClick={() => {
              props.callbackClose();
            }}
            src={close}
          />
        </div> */}
        <LobbyProgressCard
            watchlist={true}
            addSubtractIcons={true}
            applyMedals={applyMedals}
            unapplyMedals={unapplyMedals}
            levelTempStat={levelTempStat}
            unlevelTempStat={unlevelTempStat}
            powerMedals={powerMedals}
            powerMedalsForLevel={powerMedalsForLevel}
            powerPeak={props.golferDetails.powerpeak}
            powerTotal={props.golferDetails.powertotal}
            powerBoost={additionalPower}
            acrcyMedals={accuracyMedals}
            acrcyMedalsForLevel={accuracyMedalsForLevel}
            acrcyPeak={props.golferDetails.accuracypeak}
            acrcyTotal={props.golferDetails.accuracytotal}
            acrcyBoost={additionalAccuracy}
            focusMedals={focusMedals}
            focusMedalsForLevel={focusMedalsForLevel}
            focusPeak={props.golferDetails.composurepeak}
            focusTotal={props.golferDetails.composuretotal}
            focusBoost={additionalFocus}
            stmnaMedals={staminaMedals}
            stmnaMedalsForLevel={staminaMedalsForLevel}
            stmnaPeak={props.golferDetails.staminapeak}
            stmnaTotal={props.golferDetails.staminatotal}
            stmnaBoost={additionalStamina}
        />
        <div className='bg-subtle-grey py-2 flex justify-center'>
          <div className='flex'>
              <img src={medal} className='mx-1 w-8 h-8'/>
              <Industry className={getTextStyle()}>{totalTrophies}</Industry>
              <Industry className={getTextStyle()}>/</Industry>
              <Industry className={getTextStyle()}>{medalsApplied}</Industry>
          </div>
        </div>
        {medalsApplied === 0 && insuffcientMedals === false && (
          <ApplyMedalsDeactivated
            className='mx-auto py-1 mb-1 text-grey font-black text-sm'
            >
            Apply Medals
          </ApplyMedalsDeactivated>
        )}
        {insuffcientMedals && (
          <ApplyMedalsError
            className='mx-auto py-1 mb-1 text-error-red font-black text-sm'
          >
            Insufficient Medals
          </ApplyMedalsError>
        )}
        {medalsApplied > 0 && insuffcientMedals === false && (
          <ApplyMedals
            className='mx-auto py-1 mb-1 text-white font-black text-sm'
            onClick={() => upgradeGolfer()}
          >
            Apply Medals
         </ApplyMedals>
        )}
        <CancelButton
          className='mx-auto py-1 text-error-red font-black text-sm'
          onClick={() => {
            props.callbackClose();
          }}
          >Cancel
        </CancelButton>
        
      </div>
    </div>
  );
  /* eslint-enable */
};

LevelUpGolferSection.propTypes = {
  callbackClose: PropTypes.func,
  completeLevelUpProcess: PropTypes.func,
  onOpen: PropTypes.bool,
  tokenId: PropTypes.number,
};

function mapProps(store) {
  return {
    medals: store.headerInfo.medals,
  };
}

export default connect(mapProps)(LevelUpGolferSection);
