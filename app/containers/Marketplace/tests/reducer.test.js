import availableGolferReducer from '../reducer';
import { RECEIVED_BLOCKLETES_FOR_SALE } from '../constants';

import settingsReducer from '../settingsReducer';

/* eslint-disable default-case, no-param-reassign */
describe('availableGolferReducer', () => {
  it('returns the initial state', () => {
    expect(availableGolferReducer(undefined, {})).toEqual({
      availableGolfers: [],
    });
  });

  it('changes the available golfers', () => {
    const golfers =
      '[{name:henry,power:100,stamina:30},{name:martin,power:40,stamina:50}]';
    expect(
      availableGolferReducer(undefined, {
        type: RECEIVED_BLOCKLETES_FOR_SALE,
        golfers,
      }),
    ).toEqual({
      availableGolfers:
        '[{name:henry,power:100,stamina:30},{name:martin,power:40,stamina:50}]',
    });
  });
});

/* eslint-disable default-case, no-param-reassign */
describe('settingsReducer', () => {
  it('returns the initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual({
      sortSetting: { key: 'tokenid', order: 'desc' },
      filterSettings: [],
      scrollIndex: 15,
      p2pGolfersFlag: true,
      itasGolfersFlag: true,
    });
  });
});
