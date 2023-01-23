import web3 from './web3';
import Item from './build/Item.json'

// You pass an address to this function and it creates an instance of the contract associated with that address
const item = (address) => {
    return new web3.eth.Contract(JSON.parse(Item.abi), address);
  };
  export default item;
  