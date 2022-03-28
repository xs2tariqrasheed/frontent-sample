import web3 from './web3';
import FounderCrowdsale from './build/FounderCrowdsale.json';

// const FounderCrowdsaleAddress = '0xB5896F930641E36Aa2dfe431e6f9044BAc756442';
const FounderCrowdsaleAddress = process.env.CROWD_SALE_ADDRESS;

const instance = new web3.eth.Contract(
  FounderCrowdsale.abi,
  FounderCrowdsaleAddress,
);

export default instance;
