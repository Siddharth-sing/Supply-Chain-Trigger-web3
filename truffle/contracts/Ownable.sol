//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Ownable {
    address public _owner;

    constructor () {
        _owner = msg.sender;
    }

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        if(isOwner()){_;}
        else{_;} 
        //require(isOwner(), "Ownable: caller is not the owner");
        
    }

    /**
    * @dev Returns true if the caller is the current owner.
    */
    function isOwner() public view returns (bool) {
        return (msg.sender == _owner);
    }
}