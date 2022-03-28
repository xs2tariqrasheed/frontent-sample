import React, { useState, useEffect } from 'react';
import { StyledStatsContainer } from './styled.js';

const StatsContainer = props => {
  const stat = props.stat; //power, accuracy, etc
  const statTotal = props.statTotal; //base stat
  const boost = props.boost; //boost being applied
  const statMax = props.statMax; //max level
  const [medals, adjustMedals] = useState(props.medals); //total medals used
  const [thisLevelMedals, adjustThisLevelMedals] = useState(
    props.medalsForLevel,
  ); //medals used for this level
  const [prevLevelMedalsNeeded, updatePrevLevelMedalsNeeded] = useState(0);

  const statProgress = Math.round((statTotal / statMax) * 100);
  const statPotentialPercent = statMax / 10;
  const statPercent = (statTotal + boost) / 10;
  const [intitialMedals, setInitalMedals] = useState(false);
  const [statTrophyReq, setStatTrophyReq] = useState(0);

  const getRatio = () => {
    const ratio = ((statTotal + boost) / statMax) * 100;
    const calc = ratio <= 25 ? 5 : ratio <= 50 ? 10 : ratio <= 75 ? 15 : 20;
    // console.log('props.medalsForLevel', props.medalsForLevel, 'ratio', ratio);
    // console.log('set trophyReq to', (props.medalsForLevel + calc));
    console.log('props.medals', props.medals, 'ratio', ratio);
    // console.log('set trophyReq to', (props.medals + calc));
    console.log('set trophyReq to');
    // setStatTrophyReq(props.medalsForLevel + calc);
    // setStatTrophyReq(props.medals + calc);
    setStatTrophyReq(calc);
    updatePrevLevelMedalsNeeded(calc);
    console.log('statTrophyReq', statTrophyReq);
  };

  useEffect(() => {
    console.log('intitialMedals', intitialMedals);
    if (intitialMedals === false) {
      getRatio();
    }
    setInitalMedals(true);
  }, []);

  if (stat == 'power') {
    console.log(
      '[StatsContainer] power - statTrophyReq',
      statTrophyReq,
      'thisLevelMedals',
      thisLevelMedals,
    );
  }
  let statMedalsNeeded = statTrophyReq - thisLevelMedals;
  console.log('[statsContainer] statMedalsNeeded', statMedalsNeeded);
  if (thisLevelMedals > 0) {
    /*if (statMedalsNeeded > medals ) {
			console.log('[statsContainer] stat down; readjust medals to next skill point');
			console.log('statMedalsNeeded', statMedalsNeeded, 'medals', medals);
			getRatio();
		}
		else */ if (
      statTrophyReq - thisLevelMedals !==
      0
    ) {
      console.log(
        `[statsContainer] statTrophyReq: ${statTrophyReq}; thisLevelMedals: ${thisLevelMedals}`,
      );
      statMedalsNeeded = statTrophyReq - thisLevelMedals;
      console.log(`[statsContainer] statMedalsNeeded: ${statMedalsNeeded}`);
    } else {
      getRatio(); //after level up, need to find total medals for next level up
    }
  }

  const addMedal = () => {
    console.log('[addMedal] - pre adjustThisLevelMedals', thisLevelMedals);
    let tempMedals = thisLevelMedals + 1;
    adjustMedals(medals + 1);
    adjustThisLevelMedals(tempMedals);
    console.log('[addMedal] - post adjustThisLevelMedals', thisLevelMedals);
    console.log(
      `[addMedal] - statTrophyReq: ${statTrophyReq}; tempMedals: ${tempMedals}`,
    );
    statMedalsNeeded = statTrophyReq - tempMedals;
    console.log(`[addMedal] - statMedalsNeeded: ${statMedalsNeeded}`);
    /*if (statTrophyReq - tempMedals > 0) {
			props.applyMedals(stat);
		}
		else {
			console.log('[addMedal] - level up golfer; tempMedals', tempMedals);
			props.levelTempStat({stat, tempMedals});
		}*/
    props.applyMedals(stat); //goes back to LevelUpGolferModal to add medal
    if (statMedalsNeeded == 0) {
      console.log('[addMedal] - level up golfer; tempMedals', tempMedals);
      // props.levelTempStat(stat, tempMedals);
      props.levelTempStat(stat);
      adjustThisLevelMedals(0);
    }
  };

  const removeMedal = () => {
    console.log('[removeMedal] - pre adjustThisLevelMedals', thisLevelMedals);
    adjustMedals(medals - 1);
    console.log('medals', medals);
    if (thisLevelMedals > 0) {
      let tempMedals = thisLevelMedals - 1;
      adjustThisLevelMedals(tempMedals);
      console.log(
        '[removeMedal] - post adjustThisLevelMedals',
        thisLevelMedals,
      );
      console.log(
        `[removeMedal] - statTrophyReq: ${statTrophyReq}; tempMedals: ${tempMedals}`,
      );
      statMedalsNeeded = statTrophyReq - tempMedals;
      console.log(`[removeMedal] - statMedalsNeeded: ${statMedalsNeeded}`);
      props.unapplyMedals(stat);
      console.log('props.medals', props.medals, ' v tempMedals', tempMedals);
      // if (props.medalsForLevel > tempMedals) {
      // if (medals > 0 && tempMedals == 0) {
      // console.log('[removeMedal] - level down golfer; tempMedals', tempMedals);
      // props.unlevelTempStat(stat, tempMedals);
      // console.log('[removeMedal] - reset required trophies', statTrophyReq - thisLevelMedals);
      // setStatTrophyReq(statTrophyReq - thisLevelMedals);
      // }
    } else if (medals > 0) {
      console.log('[removeMedal] - level down golfer');
      let tempMedals = prevLevelMedalsNeeded - 1;
      adjustThisLevelMedals(tempMedals);
      props.unlevelTempStat(stat, tempMedals);
    } else {
      console.log('trying to remove too many medals');
    }
  };

  console.log('StatsContainer pre-return');
  return (
    <StyledStatsContainer
      className={`flex justify-center w-full ${
        props.watchlist ? 'my-0.5' : 'my-2'
      }`}
    >
      <div className="flex-col mt-2">
        <img
          className={`mx-2 h-1/3 ${props.watchlist ? 'my-0.5' : 'my-1'}`}
          src={props.statImg}
        />
      </div>
      <div className="flex-col w-4/5">
        <div className="flex justify-between">
          <div
            className={`capitalize mx-2 h-1/3 font-black text-base ${
              props.watchlist ? 'my-0.5' : 'my-1'
            }`}
          >
            {stat}
          </div>
          <div
            className={`h-1/3 font-black ${
              props.watchlist ? 'my-0.5' : 'my-1'
            }`}
          >
            {statTotal}{' '}
            <span className={`${stat}-boost`}>
              {boost > 0 ? ` +${boost}` : ''}
            </span>{' '}
            / {statMax}
          </div>
          {/* <div
            className={`mx-2 h-1/3 font-black ${
              props.watchlist ? 'my-0.5' : 'my-1'
            }`}
          >/ {statMax}</div> */}
          {props.addSubtractIcons ? (
            <div className="flex">
              <img
                src={'https://www.blockletegames.com/images/minus.png'}
                className="w-5 h-5"
                onClick={removeMedal}
              />
              <img
                src={'https://www.blockletegames.com/images/plus.png'}
                className="w-5 h-5"
                onClick={addMedal}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className={`mx-2 h-1/3 relative flex items-center${
            props.watchlist ? '' : ' my-1'
          }`}
        >
          <div className="bar-container relative w-full h-3">
            <div
              className="w-full absolute top-0 overflow-hidden h-3 mb-4 text-xs flex rounded bg-gray-200"
              role="progressbar"
              aria-valuenow={statProgress}
            >
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
            </div>
            <div className={stat}>
              <div
                style={{ width: `${statPotentialPercent}%` }}
                className="opacity-40 h-full absolute top-0 shadow-none rounded-l-full flex flex-col whitespace-nowrap"
              />
              <div
                style={{ width: `${statPercent}%` }}
                className="h-full absolute top-0 shadow-none rounded-l-full flex flex-col whitespace-nowrap"
              />
            </div>
          </div>
        </div>
        <div className="mx-2 h-1/3 flex">
          <img
            className="mr-2 h-5"
            src={'https://www.blockletegames.com/images/medal.png'}
          />
          <div>
            <span className="text-sm">{statMedalsNeeded}</span>
            <span className="text-xs font-light">
              {' '}
              medals to next skill point
            </span>
          </div>
        </div>
      </div>
    </StyledStatsContainer>
  );
};
export default StatsContainer;
