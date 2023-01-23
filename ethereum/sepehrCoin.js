import web3 from './web3';
import SepehrCoin from './build/SepehrCoin.json';

//telling web3 the factory contract is already deployed ad here is its address
const instance = new web3.eth.Contract(
    SepehrCoin.abi,
    '0x7916AD6567f622B60B587C627d92Cab581A0CA7D'
);

export default instance;