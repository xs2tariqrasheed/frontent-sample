import sum from 'lodash/sum';
import max from 'lodash/max';
import forIn from 'lodash/forIn';

import eliteBadge from '../images/marketplace/Rarity_Elite.svg';
import noviceBadge from '../images/marketplace/Rarity_Novice.svg';
import legendBadge from '../images/marketplace/RarityBadge_Legend.svg';
import proBadge from '../images/marketplace/RarityBadge_Pro.svg';

export const getPlayerType = golferToken => {
  const { staminapeak, composurepeak, accuracypeak, powerpeak } = golferToken;
  const maxStat = max([staminapeak, composurepeak, accuracypeak, powerpeak]);

  function playerType(keyName) {
    switch (keyName) {
      case 'staminapeak':
        return 'Stamina';
      case 'composurepeak':
        return 'Composure';
      case 'accuracypeak':
        return 'Accuracy';
      case 'powerpeak':
        return 'Power';
      default:
        return '';
    }
  }

  let foundKey = '';
  forIn(golferToken, (v, k) => {
    if (v === maxStat) {
      foundKey = k;
      return false;
    }
    return true;
  });

  return playerType(foundKey);
};

export const getBadgeSvg = type => {
  switch (type) {
    case 'novice':
      return noviceBadge;
    case 'pro':
      return proBadge;
    case 'elite':
      return eliteBadge;
    case 'legend':
      return legendBadge;
    default:
      return '';
  }
};
