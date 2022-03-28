import web3 from './web3';
import ArenaGolfMainContract from './build/ArenaGolfMain.json';
import ERC1538DelegateContract from './build/ERC1538Delegate.json';
import ArenaGolfNFTDelegate from './build/ArenaGolfNFT.json';
import ArenaGolfAbilityUpgrades from './build/ArenaGolfAbilityUpgrades.json';
import ERC1538QueryDelegatesContract from './build/ERC1538QueryDelegates.json';

// const ArenaGolfMainAddress = '0x8cD606B8e251a93E57ba464e559E36d54a310f64';
const ArenaGolfMainAddress = process.env.GOLFER_NFT_ADDRESS;
// const GolferTraitsAddress = '0xCd7597A5484719FA1c59B54244AcfFc4E0F18F5f';

let transparentContractAbi = ArenaGolfMainContract.abi;
transparentContractAbi = transparentContractAbi.concat(
  ERC1538DelegateContract.abi,
);
transparentContractAbi = transparentContractAbi.concat(
  ArenaGolfNFTDelegate.abi,
);
transparentContractAbi = transparentContractAbi.concat(
  ArenaGolfAbilityUpgrades.abi,
);
transparentContractAbi = transparentContractAbi.concat(
  ERC1538QueryDelegatesContract.abi,
);

const instance = new web3.eth.Contract(
  transparentContractAbi,
  ArenaGolfMainAddress,
);

export default instance;
