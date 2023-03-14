//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Item.sol";
import "./Ownable.sol";

contract ItemManager is Ownable {

    struct S_Item {
        Item _item;
        ItemManager.SupplyChainSteps _step;
        string _identifier;
    }
    mapping(uint => S_Item) public items;
    uint index;

    enum SupplyChainSteps {Created, Paid, Delivered}

    event SupplyChainStep(uint _itemIndex, string _step, address _address);

    function createItem(string memory _identifier, uint _priceInWei) onlyOwner public {
         Item item = new Item(this, _priceInWei, index);
         items[index]._item = item;
         items[index]._step = SupplyChainSteps.Created;
         items[index]._identifier = _identifier;
         emit SupplyChainStep(index, stepName(uint(items[index]._step)), address(item));
         index++;

    }

    function triggerPayment(uint _index) public payable {
        Item item = items[_index]._item;
        require(address(item) == msg.sender, "Only items are allowed to update themselves");
        require(item.priceInWei() == msg.value, "Not fully paid yet");
        require(items[_index]._step == SupplyChainSteps.Created, "Item is further in the supply chain");
        items[_index]._step = SupplyChainSteps.Paid;
        emit SupplyChainStep(_index, stepName(uint(items[_index]._step)), address(item));
    }

    function triggerDelivery(uint _index) onlyOwner public {
        require(items[_index]._step == SupplyChainSteps.Paid, "Item is further in the supply chain");
        items[_index]._step = SupplyChainSteps.Delivered;
        emit SupplyChainStep(_index, stepName(uint(items[_index]._step)), address(items[_index]._item));
    }

    function stepName(uint _step) private pure returns(string memory){
        if(_step==0){return "Created";}
        else if(_step==1){return "Paid";}
        else{return "Delivered";}
    }
}
   

