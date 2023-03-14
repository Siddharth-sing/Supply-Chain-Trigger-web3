export const ItemManagerABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_itemIndex",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "string",
          name: "_step",
          type: "string"
        },
        {
          indexed: false,
          internalType: "address",
          name: "_address",
          type: "address"
        }
      ],
      name: "SupplyChainStep",
      type: "event"
    },
    {
      inputs: [],
      name: "_owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "items",
      outputs: [
        {
          internalType: "contract Item",
          name: "_item",
          type: "address"
        },
        {
          internalType: "enum ItemManager.SupplyChainSteps",
          name: "_step",
          type: "uint8"
        },
        {
          internalType: "string",
          name: "_identifier",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_identifier",
          type: "string"
        },
        {
          internalType: "uint256",
          name: "_priceInWei",
          type: "uint256"
        }
      ],
      name: "createItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256"
        }
      ],
      name: "triggerPayment",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256"
        }
      ],
      name: "triggerDelivery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "returnOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
];