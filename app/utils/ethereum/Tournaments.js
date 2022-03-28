import web3 from './web3';
// import Tournaments from './build/BlockletesTournament.json';

// const FounderCrowdsaleAddress = '0xB5896F930641E36Aa2dfe431e6f9044BAc756442';
const TournamentsAddress = process.env.TOURNAMENTS_ADDRESS;
const instance = {};

try {
    const instance = new web3.eth.Contract(Tournaments.abi, TournamentsAddress);
}
catch (e) {
    console.log("Error finding Tournaments in utils/eth", e);
}

export default instance;
