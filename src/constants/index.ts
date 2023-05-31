export const RebalancerFactoryABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_automate",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
    ],
    name: "TaskCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "automate",
    outputs: [
      {
        internalType: "contract IAutomate",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "contractsByUser",
    outputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "portfolioValue",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokenAddresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "targetWeights",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "priceFeedAddresses",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "portfolioValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
    ],
    name: "createPortfolioRebalancer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dedicatedMsgSender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositToGelatotreasury",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundsOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getContractDeployedByUser",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "tokenAddresses",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "targetWeights",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "priceFeedAddresses",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "portfolioValue",
            type: "uint256",
          },
        ],
        internalType: "struct PortfolioRebalancerFactory.ContractData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskTreasury",
    outputs: [
      {
        internalType: "contract ITaskTreasuryUpgradable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export const SIPFactoryABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
      {
        internalType: "contract ISuperToken",
        name: "_token",
        type: "address",
      },
      {
        internalType: "int96",
        name: "flowRate",
        type: "int96",
      },
    ],
    name: "createSIP",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositToGelatotreasury",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_automate",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
    ],
    name: "TaskCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "automate",
    outputs: [
      {
        internalType: "contract IAutomate",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dedicatedMsgSender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedSIPContracts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundsOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedSIPContracts",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskTreasury",
    outputs: [
      {
        internalType: "contract ITaskTreasuryUpgradable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenx",
    outputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const SocketFactoryABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_automate",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
    ],
    name: "TaskCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "automate",
    outputs: [
      {
        internalType: "contract IAutomate",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "createTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dedicatedMsgSender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedSocketContracts",
    outputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositToGelatotreasury",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundsOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getContractsByUser",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct SocketBuyerFactory.ContractDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastExecuted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskTreasury",
    outputs: [
      {
        internalType: "contract ITaskTreasuryUpgradable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userDeployedContracts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export const socketABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "buyImmediately",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checker",
    outputs: [
      {
        internalType: "bool",
        name: "canExec",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "execPayload",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolFee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract ISwapRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetTokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export const cfaABI = [
  {
    inputs: [
      { internalType: "contract ISuperfluid", name: "host", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "CFA_FWD_INVALID_FLOW_RATE", type: "error" },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowrate", type: "int96" },
      { internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "createFlow",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "deleteFlow",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "getAccountFlowInfo",
    outputs: [
      { internalType: "uint256", name: "lastUpdated", type: "uint256" },
      { internalType: "int96", name: "flowrate", type: "int96" },
      { internalType: "uint256", name: "deposit", type: "uint256" },
      { internalType: "uint256", name: "owedDeposit", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "getAccountFlowrate",
    outputs: [{ internalType: "int96", name: "flowrate", type: "int96" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "int96", name: "flowrate", type: "int96" },
    ],
    name: "getBufferAmountByFlowrate",
    outputs: [
      { internalType: "uint256", name: "bufferAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "getFlowInfo",
    outputs: [
      { internalType: "uint256", name: "lastUpdated", type: "uint256" },
      { internalType: "int96", name: "flowrate", type: "int96" },
      { internalType: "uint256", name: "deposit", type: "uint256" },
      { internalType: "uint256", name: "owedDeposit", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "flowOperator", type: "address" },
    ],
    name: "getFlowOperatorPermissions",
    outputs: [
      { internalType: "uint8", name: "permissions", type: "uint8" },
      { internalType: "int96", name: "flowrateAllowance", type: "int96" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "getFlowrate",
    outputs: [{ internalType: "int96", name: "flowrate", type: "int96" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "flowOperator", type: "address" },
    ],
    name: "grantPermissions",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "flowOperator", type: "address" },
    ],
    name: "revokePermissions",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowrate", type: "int96" },
    ],
    name: "setFlowrate",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowrate", type: "int96" },
    ],
    name: "setFlowrateFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowrate", type: "int96" },
      { internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "updateFlow",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "token", type: "address" },
      { internalType: "address", name: "flowOperator", type: "address" },
      { internalType: "uint8", name: "permissions", type: "uint8" },
      { internalType: "int96", name: "flowrateAllowance", type: "int96" },
    ],
    name: "updateFlowOperatorPermissions",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
