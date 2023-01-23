// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SepehrCoin {
    // Token metadata
    string public name = "SepehrCoin";
    string public symbol = "SCT";
    uint8 public decimals = 18;
    uint public totalSupply;

    // Balances for each account
    mapping(address => uint) public balanceOf;

    // Allowance for each account
    mapping(address => mapping(address => uint)) public allowed;

    // Events
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    // Initializes contract with initial supply tokens to the creator of the contract
    constructor(uint _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    // Send `_value` tokens to `_to` from `msg.sender`
    function transfer(address _to, uint _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value && _value > 0);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns (bool) {
        require(_spender != address(0));
        require(_value <= balanceOf[msg.sender]);

        // To change the approve amount you first have to reduce the addresses'
        // allowance to zero by calling `approve(_spender,0)` if it is already
        // nonzero.
        require(_value == 0 || allowed[msg.sender][_spender] == 0);
                allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balanceOf[_from]);
        require(_value <= allowed[_from][msg.sender]);
        balanceOf[_from] -= _value;
        allowed[_from][msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function getBalance(address _owner) public view returns (uint balance) {
        return balanceOf[_owner];
    }

    function allowance(address _owner, address _spender) public view returns (uint remaining) {
        return allowed[_owner][_spender];
    }
}


contract sepehrMarket {
        struct Listing {
        string name;
        address seller;
        address buyer;
        uint price;
        bool sold;
    }

	SepehrCoin public token;

    mapping(uint => Listing) public listings;
    uint public listingCount;
    address public contractAddress = address(this);

    constructor(address _token) public {
        token = SepehrCoin(_token);
    }

    function createListing(string memory _name, uint _price) public returns (uint) {
        listingCount++;
        listings[listingCount].name = _name;
        listings[listingCount].seller = msg.sender;
        listings[listingCount].price = _price;
        return listingCount;
    }

    function getListing(uint _index) public view returns (string memory, uint) {
        Listing storage item = listings[_index];
        require(item.seller != address(0), "Listing does not exist");
        return (item.name, item.price);
    }

    function checkListingExists(uint _index) public view returns (bool) {
        Listing storage item = listings[_index];
        return (item.seller != address(0));
    }

    function checkListingSold(uint _index) public view returns (bool) {
        Listing storage item = listings[_index];
        require(item.seller != address(0), "Listing does not exist");
        return item.sold;
    }

    function removeListing(uint _index) public {
        Listing storage item = listings[_index];
        require(item.seller != address(0), "Listing does not exist");
        require(item.seller == msg.sender, "Only the seller can remove a listing");
        require(!item.sold, "Listing has already been sold");
        delete listings[_index];
    }

    function purchaseListing(uint _index) public {
        Listing storage item = listings[_index];
        require(item.seller != address(0), "Listing does not exist");
        require(!item.sold, "Listing has already been sold");
        require(item.price <= token.balanceOf(msg.sender), "Not enough tokens");
        item.buyer = msg.sender;
        item.sold = true;
        token.transferFrom(msg.sender, item.seller, item.price);
    }
}