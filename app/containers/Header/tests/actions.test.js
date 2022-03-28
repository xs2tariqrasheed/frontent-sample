import { updateDetectedEthAddress } from '../actions';
import { UPDATE_DETECTED_ETH_ADDRESS } from '../constants';

describe('Header actions', () => {
  describe('Update Eth Wallet Address Action', () => {
    it('has a type of UPDATE_DETECTED_ETH_ADDRESS', () => {
      const expected = {
        type: UPDATE_DETECTED_ETH_ADDRESS,
        address: '0x09192920089123798172341',
      };
      expect(updateDetectedEthAddress('0x09192920089123798172341')).toEqual(
        expected,
      );
    });
  });
});
