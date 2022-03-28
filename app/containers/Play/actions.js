import { GET_TOKEN_FOR_PLAY } from './constants';

export function getGameToken(dataForToken) {
  return {
    type: GET_TOKEN_FOR_PLAY,
    dataForToken,
  };
}
