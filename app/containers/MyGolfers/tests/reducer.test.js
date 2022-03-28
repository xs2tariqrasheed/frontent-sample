import myGolferReducer from '../reducer';
import { UPDATE_MY_GOLFERS } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('myGolferReducer', () => {
  it('returns the initial state', () => {
    expect(myGolferReducer(undefined, {})).toEqual({
      myGolfers: [],
      myWatchList: [],
      loadingPacks: false,
      packErrorText: '',
      packs: [],
    });
  });

  it('changes the my golfers', () => {
    expect(
      myGolferReducer(undefined, {
        type: UPDATE_MY_GOLFERS,
        golfers:
          '[{name:henry,power:100,stamina:30},{name:martin,power:40,stamina:50}]',
      }),
    ).toEqual({
      myGolfers:
        '[{name:henry,power:100,stamina:30},{name:martin,power:40,stamina:50}]',
      myWatchList: [],
      loadingPacks: false,
      packErrorText: '',
      packs: [],
    });
  });
});
