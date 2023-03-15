import React, { useState, useEffect } from "react";
import { ItemManagerABI } from "./abi/abi";

import ItemManager from "./abi/ItemManager.json";
import Web3 from "web3";
import './App.css';


const web3 = new Web3(Web3.givenProvider);
var itemManagerContract, accounts;

function App() {

  const [itemPrice, setIP] = useState(0);
  const [itemIdentifier, setItemIdentifier] = useState("Item");
  const [itemIndex, setItemIndex] = useState(-1);

  useEffect(() => {
    console.log("Inside useEffect");
    async function fetchData() {
      var networkId = await web3.eth.net.getId();
      console.log("NetworkID = ", networkId);
      var ItemManagerAddress = ItemManager.networks[networkId].address;
      console.log("ItemManager Address =>", ItemManagerAddress);
      itemManagerContract = new web3.eth.Contract(ItemManagerABI, ItemManagerAddress);
      accounts = await window.ethereum.enable();
      console.log(accounts[0]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    listenToThePayment();
  });

  const CreateItem = async () => {
    console.log("Creating item wait !....");
    try {
      const gas = await itemManagerContract.methods.createItem(itemIdentifier, itemPrice).estimateGas();
      console.log(gas);
      let res = await itemManagerContract.methods.createItem(itemIdentifier, itemPrice).send({
        from: accounts[0],
        gas: 1000000,
      });
      console.log(res);
      alert("Send " + itemPrice + " Wei to buy " + itemIdentifier + " at address " + res.events.SupplyChainStep.returnValues._address);
    } catch (error) {
      console.log("Error => ", error);
    }

  }

  const TriggerDelivery = async () => {
    try {
      const gas = await itemManagerContract.methods.createItem(itemIdentifier, itemPrice).estimateGas();
      console.log(gas);
      let x = await itemManagerContract.methods.triggerDelivery(itemIndex).send({
        from: accounts[0],
        gas: 1000000,
      });
      console.log("Delivery Output",x);
    } catch (error) {
      console.log(error)
    }

  }

  const listenToThePayment = () => {
    itemManagerContract?.events.SupplyChainStep().on("data", async function (evt) {
      let itemObj = await itemManagerContract.methods.items(evt.returnValues._itemIndex).call();
      console.log("ItemIndex = " + evt.returnValues._itemIndex + " ItemIdentifier = " + itemObj._identifier + " Item Status = " + evt.returnValues._step);
    });
  }
  return (
    <div className="main">
      <div className="card">
        <h1 style={{ color: "#45a0eb" }}>Supply chain trigger</h1>
        <form className="form">
          <label>
            Create your Item:
            <input
              placeholder="Price of your item(in wei)"
              className="input"
              type="text"
              name="name"
              onChange={(t) => setIP(t.target.value)}
            />
            <input
              placeholder="Item's Unique Identifier"
              className="input"
              type="text"
              name="name"
              onChange={(t) => setItemIdentifier(t.target.value)}
            />
          </label>
        </form>
        <button className="button" onClick={CreateItem}>
          Save Item
        </button>

        <input
          placeholder="Item Index of item to be delivered"
          className="inputx"
          type="number"
          onChange={(t) => setItemIndex(t.target.value)}
        />
        <button className="buttonx" onClick={TriggerDelivery}>
          Deliver The Product
        </button>
        <br />
      </div>
    </div>
  );
}

export default App;


// <button className="button" onClick={numberGet} type="button">
//           Get your uint256
//         </button>
//         {getNumber}
//         <button className="button" onClick={storageNewFunc} type="button">
//           New contract contact
//         </button>
//         {getNew.toString()}