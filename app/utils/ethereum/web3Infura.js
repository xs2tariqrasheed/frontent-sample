import Web3 from 'web3';
const { InfuraURL } = require('./config');

// We are on the server *OR* the user is not running metamask
const provider = new Web3.providers.HttpProvider(InfuraURL);
// const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(provider);

const web3Provider = web3;

export default web3Provider;
