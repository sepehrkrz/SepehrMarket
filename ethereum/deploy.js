const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
//const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json');
const provider = new HDWalletProvider(
  'involve trigger farm document oblige soul pipe spice enforce denial gold south',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/161b59e127f64187a62870d1d7c130d8'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });  
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

//deploted address: 0x54FaD6ae027fDE50f0F4DdCce13E96084de54e93