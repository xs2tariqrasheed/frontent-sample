import web3 from './web3';
import GolferP2PSales from './build/GolferP2PSaleAuction.json';

const GolferP2PSalesAddress = process.env.GOLFER_P2P_SALE_ADDRESS;

const instance = new web3.eth.Contract(
  GolferP2PSales.abi,
  GolferP2PSalesAddress,
);

export default instance;
