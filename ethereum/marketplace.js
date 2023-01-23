import web3 from './web3';
import Marketplace from './build/sepehrMarket.json';

//telling web3 the factory contract is already deployed ad here is its address
const instance = new web3.eth.Contract(
    Marketplace.abi,
    '0xFA9F9Dabc4ba17bA58c7c1b859f9044B5B917C11'
);

export default instance;