import { filteredAvailable } from '../selectors';

describe('filteredAvailable', () => {
  it('should select the available golfers', () => {
    const globalState = {
      availableGolfers: [{ Test: 'Test' }],
      p2pGolfers: [],
      auctionGolfers: [],
    };
    const globalFilterState = {
      sortSetting: { key: 'tokenid', order: 'desc' },
      filterSettings: [],
      p2pGolfersFlag: true,
      itasGolfersFlag: true,
    };

    const mockedState = {
      availableGolfers: globalState,
      marketplaceSettings: globalFilterState,
    };
    expect(filteredAvailable(mockedState)).toEqual([{ Test: 'Test' }]);
  });
});
