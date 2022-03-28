import Web3 from 'web3';
const { InfuraURL } = require('./config');

async function enableFunc() {
  await window.ethereum.enable();
}

let web3;

if (typeof window !== 'undefined') {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      enableFunc();
    } catch (error) {
      // console.log('Not sure what to do with errors.');
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(InfuraURL);
    // const provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(provider);
  }
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(InfuraURL);
  // const provider = new Web3.providers.HttpProvider('http://localhost:7545');
  web3 = new Web3(provider);
}

const web3Provider = web3;

export default web3Provider;
