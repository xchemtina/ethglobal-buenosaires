module.exports = [
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/constants/abis.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* [Multicall3](https://github.com/mds1/multicall) */ __turbopack_context__.s([
    "addressResolverAbi",
    ()=>addressResolverAbi,
    "batchGatewayAbi",
    ()=>batchGatewayAbi,
    "erc1155Abi",
    ()=>erc1155Abi,
    "erc1271Abi",
    ()=>erc1271Abi,
    "erc20Abi",
    ()=>erc20Abi,
    "erc20Abi_bytes32",
    ()=>erc20Abi_bytes32,
    "erc4626Abi",
    ()=>erc4626Abi,
    "erc6492SignatureValidatorAbi",
    ()=>erc6492SignatureValidatorAbi,
    "erc721Abi",
    ()=>erc721Abi,
    "multicall3Abi",
    ()=>multicall3Abi,
    "textResolverAbi",
    ()=>textResolverAbi,
    "universalResolverResolveAbi",
    ()=>universalResolverResolveAbi,
    "universalResolverReverseAbi",
    ()=>universalResolverReverseAbi
]);
const multicall3Abi = [
    {
        inputs: [
            {
                components: [
                    {
                        name: 'target',
                        type: 'address'
                    },
                    {
                        name: 'allowFailure',
                        type: 'bool'
                    },
                    {
                        name: 'callData',
                        type: 'bytes'
                    }
                ],
                name: 'calls',
                type: 'tuple[]'
            }
        ],
        name: 'aggregate3',
        outputs: [
            {
                components: [
                    {
                        name: 'success',
                        type: 'bool'
                    },
                    {
                        name: 'returnData',
                        type: 'bytes'
                    }
                ],
                name: 'returnData',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getCurrentBlockTimestamp',
        outputs: [
            {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
const batchGatewayAbi = [
    {
        name: 'query',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            {
                type: 'tuple[]',
                name: 'queries',
                components: [
                    {
                        type: 'address',
                        name: 'sender'
                    },
                    {
                        type: 'string[]',
                        name: 'urls'
                    },
                    {
                        type: 'bytes',
                        name: 'data'
                    }
                ]
            }
        ],
        outputs: [
            {
                type: 'bool[]',
                name: 'failures'
            },
            {
                type: 'bytes[]',
                name: 'responses'
            }
        ]
    },
    {
        name: 'HttpError',
        type: 'error',
        inputs: [
            {
                type: 'uint16',
                name: 'status'
            },
            {
                type: 'string',
                name: 'message'
            }
        ]
    }
];
const universalResolverErrors = [
    {
        inputs: [
            {
                name: 'dns',
                type: 'bytes'
            }
        ],
        name: 'DNSDecodingFailed',
        type: 'error'
    },
    {
        inputs: [
            {
                name: 'ens',
                type: 'string'
            }
        ],
        name: 'DNSEncodingFailed',
        type: 'error'
    },
    {
        inputs: [],
        name: 'EmptyAddress',
        type: 'error'
    },
    {
        inputs: [
            {
                name: 'status',
                type: 'uint16'
            },
            {
                name: 'message',
                type: 'string'
            }
        ],
        name: 'HttpError',
        type: 'error'
    },
    {
        inputs: [],
        name: 'InvalidBatchGatewayResponse',
        type: 'error'
    },
    {
        inputs: [
            {
                name: 'errorData',
                type: 'bytes'
            }
        ],
        name: 'ResolverError',
        type: 'error'
    },
    {
        inputs: [
            {
                name: 'name',
                type: 'bytes'
            },
            {
                name: 'resolver',
                type: 'address'
            }
        ],
        name: 'ResolverNotContract',
        type: 'error'
    },
    {
        inputs: [
            {
                name: 'name',
                type: 'bytes'
            }
        ],
        name: 'ResolverNotFound',
        type: 'error'
    },
    {
        inputs: [
            {
                name: 'primary',
                type: 'string'
            },
            {
                name: 'primaryAddress',
                type: 'bytes'
            }
        ],
        name: 'ReverseAddressMismatch',
        type: 'error'
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: 'selector',
                type: 'bytes4'
            }
        ],
        name: 'UnsupportedResolverProfile',
        type: 'error'
    }
];
const universalResolverResolveAbi = [
    ...universalResolverErrors,
    {
        name: 'resolveWithGateways',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            {
                name: 'name',
                type: 'bytes'
            },
            {
                name: 'data',
                type: 'bytes'
            },
            {
                name: 'gateways',
                type: 'string[]'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bytes'
            },
            {
                name: 'address',
                type: 'address'
            }
        ]
    }
];
const universalResolverReverseAbi = [
    ...universalResolverErrors,
    {
        name: 'reverseWithGateways',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            {
                type: 'bytes',
                name: 'reverseName'
            },
            {
                type: 'uint256',
                name: 'coinType'
            },
            {
                type: 'string[]',
                name: 'gateways'
            }
        ],
        outputs: [
            {
                type: 'string',
                name: 'resolvedName'
            },
            {
                type: 'address',
                name: 'resolver'
            },
            {
                type: 'address',
                name: 'reverseResolver'
            }
        ]
    }
];
const textResolverAbi = [
    {
        name: 'text',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            {
                name: 'name',
                type: 'bytes32'
            },
            {
                name: 'key',
                type: 'string'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'string'
            }
        ]
    }
];
const addressResolverAbi = [
    {
        name: 'addr',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            {
                name: 'name',
                type: 'bytes32'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ]
    },
    {
        name: 'addr',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            {
                name: 'name',
                type: 'bytes32'
            },
            {
                name: 'coinType',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bytes'
            }
        ]
    }
];
const erc1271Abi = [
    {
        name: 'isValidSignature',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            {
                name: 'hash',
                type: 'bytes32'
            },
            {
                name: 'signature',
                type: 'bytes'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bytes4'
            }
        ]
    }
];
const erc6492SignatureValidatorAbi = [
    {
        inputs: [
            {
                name: '_signer',
                type: 'address'
            },
            {
                name: '_hash',
                type: 'bytes32'
            },
            {
                name: '_signature',
                type: 'bytes'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        inputs: [
            {
                name: '_signer',
                type: 'address'
            },
            {
                name: '_hash',
                type: 'bytes32'
            },
            {
                name: '_signature',
                type: 'bytes'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function',
        name: 'isValidSig'
    }
];
const erc20Abi = [
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                name: 'to',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'allowance',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'spender',
                type: 'address'
            }
        ],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    },
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'account',
                type: 'address'
            }
        ],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'decimals',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint8'
            }
        ]
    },
    {
        type: 'function',
        name: 'name',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string'
            }
        ]
    },
    {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string'
            }
        ]
    },
    {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'sender',
                type: 'address'
            },
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    }
];
const erc20Abi_bytes32 = [
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                name: 'to',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'allowance',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'spender',
                type: 'address'
            }
        ],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    },
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'account',
                type: 'address'
            }
        ],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'decimals',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint8'
            }
        ]
    },
    {
        type: 'function',
        name: 'name',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'bytes32'
            }
        ]
    },
    {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'bytes32'
            }
        ]
    },
    {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'sender',
                type: 'address'
            },
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    }
];
const erc1155Abi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'balance',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'needed',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'ERC1155InsufficientBalance',
        type: 'error'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'approver',
                type: 'address'
            }
        ],
        name: 'ERC1155InvalidApprover',
        type: 'error'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'idsLength',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'valuesLength',
                type: 'uint256'
            }
        ],
        name: 'ERC1155InvalidArrayLength',
        type: 'error'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address'
            }
        ],
        name: 'ERC1155InvalidOperator',
        type: 'error'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address'
            }
        ],
        name: 'ERC1155InvalidReceiver',
        type: 'error'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address'
            }
        ],
        name: 'ERC1155InvalidSender',
        type: 'error'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'ERC1155MissingApprovalForAll',
        type: 'error'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'approved',
                type: 'bool'
            }
        ],
        name: 'ApprovalForAll',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256[]',
                name: 'ids',
                type: 'uint256[]'
            },
            {
                indexed: false,
                internalType: 'uint256[]',
                name: 'values',
                type: 'uint256[]'
            }
        ],
        name: 'TransferBatch',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
            }
        ],
        name: 'TransferSingle',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'value',
                type: 'string'
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256'
            }
        ],
        name: 'URI',
        type: 'event'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address[]',
                name: 'accounts',
                type: 'address[]'
            },
            {
                internalType: 'uint256[]',
                name: 'ids',
                type: 'uint256[]'
            }
        ],
        name: 'balanceOfBatch',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'operator',
                type: 'address'
            }
        ],
        name: 'isApprovedForAll',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                internalType: 'uint256[]',
                name: 'ids',
                type: 'uint256[]'
            },
            {
                internalType: 'uint256[]',
                name: 'values',
                type: 'uint256[]'
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes'
            }
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes'
            }
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                internalType: 'bool',
                name: 'approved',
                type: 'bool'
            }
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: 'interfaceId',
                type: 'bytes4'
            }
        ],
        name: 'supportsInterface',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'uri',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
const erc721Abi = [
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address'
            },
            {
                indexed: true,
                name: 'tokenId',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'event',
        name: 'ApprovalForAll',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                name: 'operator',
                type: 'address'
            },
            {
                indexed: false,
                name: 'approved',
                type: 'bool'
            }
        ]
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                name: 'to',
                type: 'address'
            },
            {
                indexed: true,
                name: 'tokenId',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'payable',
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        outputs: []
    },
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'account',
                type: 'address'
            }
        ],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'getApproved',
        stateMutability: 'view',
        inputs: [
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'address'
            }
        ]
    },
    {
        type: 'function',
        name: 'isApprovedForAll',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'operator',
                type: 'address'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    },
    {
        type: 'function',
        name: 'name',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string'
            }
        ]
    },
    {
        type: 'function',
        name: 'ownerOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: 'owner',
                type: 'address'
            }
        ]
    },
    {
        type: 'function',
        name: 'safeTransferFrom',
        stateMutability: 'payable',
        inputs: [
            {
                name: 'from',
                type: 'address'
            },
            {
                name: 'to',
                type: 'address'
            },
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        outputs: []
    },
    {
        type: 'function',
        name: 'safeTransferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'from',
                type: 'address'
            },
            {
                name: 'to',
                type: 'address'
            },
            {
                name: 'id',
                type: 'uint256'
            },
            {
                name: 'data',
                type: 'bytes'
            }
        ],
        outputs: []
    },
    {
        type: 'function',
        name: 'setApprovalForAll',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'operator',
                type: 'address'
            },
            {
                name: 'approved',
                type: 'bool'
            }
        ],
        outputs: []
    },
    {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string'
            }
        ]
    },
    {
        type: 'function',
        name: 'tokenByIndex',
        stateMutability: 'view',
        inputs: [
            {
                name: 'index',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'tokenByIndex',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'index',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'tokenURI',
        stateMutability: 'view',
        inputs: [
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'string'
            }
        ]
    },
    {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'payable',
        inputs: [
            {
                name: 'sender',
                type: 'address'
            },
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        outputs: []
    }
];
const erc4626Abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ],
        name: 'Approval',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'sender',
                type: 'address'
            },
            {
                indexed: true,
                name: 'receiver',
                type: 'address'
            },
            {
                indexed: false,
                name: 'assets',
                type: 'uint256'
            },
            {
                indexed: false,
                name: 'shares',
                type: 'uint256'
            }
        ],
        name: 'Deposit',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                name: 'to',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ],
        name: 'Transfer',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'sender',
                type: 'address'
            },
            {
                indexed: true,
                name: 'receiver',
                type: 'address'
            },
            {
                indexed: true,
                name: 'owner',
                type: 'address'
            },
            {
                indexed: false,
                name: 'assets',
                type: 'uint256'
            },
            {
                indexed: false,
                name: 'shares',
                type: 'uint256'
            }
        ],
        name: 'Withdraw',
        type: 'event'
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'spender',
                type: 'address'
            }
        ],
        name: 'allowance',
        outputs: [
            {
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'approve',
        outputs: [
            {
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'asset',
        outputs: [
            {
                name: 'assetTokenAddress',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        name: 'convertToAssets',
        outputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        name: 'convertToShares',
        outputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256'
            },
            {
                name: 'receiver',
                type: 'address'
            }
        ],
        name: 'deposit',
        outputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'caller',
                type: 'address'
            }
        ],
        name: 'maxDeposit',
        outputs: [
            {
                name: 'maxAssets',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'caller',
                type: 'address'
            }
        ],
        name: 'maxMint',
        outputs: [
            {
                name: 'maxShares',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'maxRedeem',
        outputs: [
            {
                name: 'maxShares',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'maxWithdraw',
        outputs: [
            {
                name: 'maxAssets',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256'
            },
            {
                name: 'receiver',
                type: 'address'
            }
        ],
        name: 'mint',
        outputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        name: 'previewDeposit',
        outputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        name: 'previewMint',
        outputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        name: 'previewRedeem',
        outputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        name: 'previewWithdraw',
        outputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256'
            },
            {
                name: 'receiver',
                type: 'address'
            },
            {
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'redeem',
        outputs: [
            {
                name: 'assets',
                type: 'uint256'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalAssets',
        outputs: [
            {
                name: 'totalManagedAssets',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'to',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'transfer',
        outputs: [
            {
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'from',
                type: 'address'
            },
            {
                name: 'to',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'transferFrom',
        outputs: [
            {
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256'
            },
            {
                name: 'receiver',
                type: 'address'
            },
            {
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'withdraw',
        outputs: [
            {
                name: 'shares',
                type: 'uint256'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    }
]; //# sourceMappingURL=abis.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/version.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = '2.39.3'; //# sourceMappingURL=version.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseError",
    ()=>BaseError,
    "setErrorConfig",
    ()=>setErrorConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/version.js [app-route] (ecmascript)");
;
let errorConfig = {
    getDocsUrl: ({ docsBaseUrl, docsPath = '', docsSlug })=>docsPath ? `${docsBaseUrl ?? 'https://viem.sh'}${docsPath}${docsSlug ? `#${docsSlug}` : ''}` : undefined,
    version: `viem@${__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["version"]}`
};
function setErrorConfig(config) {
    errorConfig = config;
}
class BaseError extends Error {
    constructor(shortMessage, args = {}){
        const details = (()=>{
            if (args.cause instanceof BaseError) return args.cause.details;
            if (args.cause?.message) return args.cause.message;
            return args.details;
        })();
        const docsPath = (()=>{
            if (args.cause instanceof BaseError) return args.cause.docsPath || args.docsPath;
            return args.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({
            ...args,
            docsPath
        });
        const message = [
            shortMessage || 'An error occurred.',
            '',
            ...args.metaMessages ? [
                ...args.metaMessages,
                ''
            ] : [],
            ...docsUrl ? [
                `Docs: ${docsUrl}`
            ] : [],
            ...details ? [
                `Details: ${details}`
            ] : [],
            ...errorConfig.version ? [
                `Version: ${errorConfig.version}`
            ] : []
        ].join('\n');
        super(message, args.cause ? {
            cause: args.cause
        } : undefined);
        Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'BaseError'
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.name = args.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["version"];
    }
    walk(fn) {
        return walk(this, fn);
    }
}
function walk(err, fn) {
    if (fn?.(err)) return err;
    if (err && typeof err === 'object' && 'cause' in err && err.cause !== undefined) return walk(err.cause, fn);
    return fn ? null : err;
} //# sourceMappingURL=base.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/isHex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHex",
    ()=>isHex
]);
function isHex(value, { strict = true } = {}) {
    if (!value) return false;
    if (typeof value !== 'string') return false;
    return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith('0x');
} //# sourceMappingURL=isHex.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/data.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidBytesLengthError",
    ()=>InvalidBytesLengthError,
    "SizeExceedsPaddingSizeError",
    ()=>SizeExceedsPaddingSizeError,
    "SliceOffsetOutOfBoundsError",
    ()=>SliceOffsetOutOfBoundsError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
;
class SliceOffsetOutOfBoundsError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ offset, position, size }){
        super(`Slice ${position === 'start' ? 'starting' : 'ending'} at offset "${offset}" is out-of-bounds (size: ${size}).`, {
            name: 'SliceOffsetOutOfBoundsError'
        });
    }
}
class SizeExceedsPaddingSizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size}) exceeds padding size (${targetSize}).`, {
            name: 'SizeExceedsPaddingSizeError'
        });
    }
}
class InvalidBytesLengthError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size} ${type} long.`, {
            name: 'InvalidBytesLengthError'
        });
    }
} //# sourceMappingURL=data.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/pad.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pad",
    ()=>pad,
    "padBytes",
    ()=>padBytes,
    "padHex",
    ()=>padHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/data.js [app-route] (ecmascript)");
;
function pad(hexOrBytes, { dir, size = 32 } = {}) {
    if (typeof hexOrBytes === 'string') return padHex(hexOrBytes, {
        dir,
        size
    });
    return padBytes(hexOrBytes, {
        dir,
        size
    });
}
function padHex(hex_, { dir, size = 32 } = {}) {
    if (size === null) return hex_;
    const hex = hex_.replace('0x', '');
    if (hex.length > size * 2) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: Math.ceil(hex.length / 2),
        targetSize: size,
        type: 'hex'
    });
    return `0x${hex[dir === 'right' ? 'padEnd' : 'padStart'](size * 2, '0')}`;
}
function padBytes(bytes, { dir, size = 32 } = {}) {
    if (size === null) return bytes;
    if (bytes.length > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: bytes.length,
        targetSize: size,
        type: 'bytes'
    });
    const paddedBytes = new Uint8Array(size);
    for(let i = 0; i < size; i++){
        const padEnd = dir === 'right';
        paddedBytes[padEnd ? i : size - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
    }
    return paddedBytes;
} //# sourceMappingURL=pad.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/encoding.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntegerOutOfRangeError",
    ()=>IntegerOutOfRangeError,
    "InvalidBytesBooleanError",
    ()=>InvalidBytesBooleanError,
    "InvalidHexBooleanError",
    ()=>InvalidHexBooleanError,
    "InvalidHexValueError",
    ()=>InvalidHexValueError,
    "SizeOverflowError",
    ()=>SizeOverflowError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
;
class IntegerOutOfRangeError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ max, min, signed, size, value }){
        super(`Number "${value}" is not in safe ${size ? `${size * 8}-bit ${signed ? 'signed' : 'unsigned'} ` : ''}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, {
            name: 'IntegerOutOfRangeError'
        });
    }
}
class InvalidBytesBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(bytes){
        super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
            name: 'InvalidBytesBooleanError'
        });
    }
}
class InvalidHexBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(hex){
        super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, {
            name: 'InvalidHexBooleanError'
        });
    }
}
class InvalidHexValueError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(value){
        super(`Hex value "${value}" is an odd length (${value.length}). It must be an even length.`, {
            name: 'InvalidHexValueError'
        });
    }
}
class SizeOverflowError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ givenSize, maxSize }){
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, {
            name: 'SizeOverflowError'
        });
    }
} //# sourceMappingURL=encoding.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/size.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/isHex.js [app-route] (ecmascript)");
;
function size(value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    })) return Math.ceil((value.length - 2) / 2);
    return value.length;
} //# sourceMappingURL=size.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/trim.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trim",
    ()=>trim
]);
function trim(hexOrBytes, { dir = 'left' } = {}) {
    let data = typeof hexOrBytes === 'string' ? hexOrBytes.replace('0x', '') : hexOrBytes;
    let sliceLength = 0;
    for(let i = 0; i < data.length - 1; i++){
        if (data[dir === 'left' ? i : data.length - i - 1].toString() === '0') sliceLength++;
        else break;
    }
    data = dir === 'left' ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (typeof hexOrBytes === 'string') {
        if (data.length === 1 && dir === 'right') data = `${data}0`;
        return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
    }
    return data;
} //# sourceMappingURL=trim.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/fromHex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertSize",
    ()=>assertSize,
    "fromHex",
    ()=>fromHex,
    "hexToBigInt",
    ()=>hexToBigInt,
    "hexToBool",
    ()=>hexToBool,
    "hexToNumber",
    ()=>hexToNumber,
    "hexToString",
    ()=>hexToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/encoding.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/size.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/trim.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)");
;
;
;
;
function assertSize(hexOrBytes, { size }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(hexOrBytes) > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SizeOverflowError"]({
        givenSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(hexOrBytes),
        maxSize: size
    });
}
function fromHex(hex, toOrOpts) {
    const opts = typeof toOrOpts === 'string' ? {
        to: toOrOpts
    } : toOrOpts;
    const to = opts.to;
    if (to === 'number') return hexToNumber(hex, opts);
    if (to === 'bigint') return hexToBigInt(hex, opts);
    if (to === 'string') return hexToString(hex, opts);
    if (to === 'boolean') return hexToBool(hex, opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToBytes"])(hex, opts);
}
function hexToBigInt(hex, opts = {}) {
    const { signed } = opts;
    if (opts.size) assertSize(hex, {
        size: opts.size
    });
    const value = BigInt(hex);
    if (!signed) return value;
    const size = (hex.length - 2) / 2;
    const max = (1n << BigInt(size) * 8n - 1n) - 1n;
    if (value <= max) return value;
    return value - BigInt(`0x${'f'.padStart(size * 2, 'f')}`) - 1n;
}
function hexToBool(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        assertSize(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trim"])(hex);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x00') return false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x01') return true;
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidHexBooleanError"](hex);
}
function hexToNumber(hex, opts = {}) {
    return Number(hexToBigInt(hex, opts));
}
function hexToString(hex, opts = {}) {
    let bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToBytes"])(hex);
    if (opts.size) {
        assertSize(bytes, {
            size: opts.size
        });
        bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trim"])(bytes, {
            dir: 'right'
        });
    }
    return new TextDecoder().decode(bytes);
} //# sourceMappingURL=fromHex.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToHex",
    ()=>boolToHex,
    "bytesToHex",
    ()=>bytesToHex,
    "numberToHex",
    ()=>numberToHex,
    "stringToHex",
    ()=>stringToHex,
    "toHex",
    ()=>toHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/encoding.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/pad.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/fromHex.js [app-route] (ecmascript)");
;
;
;
const hexes = /*#__PURE__*/ Array.from({
    length: 256
}, (_v, i)=>i.toString(16).padStart(2, '0'));
function toHex(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint') return numberToHex(value, opts);
    if (typeof value === 'string') {
        return stringToHex(value, opts);
    }
    if (typeof value === 'boolean') return boolToHex(value, opts);
    return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
    const hex = `0x${Number(value)}`;
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pad"])(hex, {
            size: opts.size
        });
    }
    return hex;
}
function bytesToHex(value, opts = {}) {
    let string = '';
    for(let i = 0; i < value.length; i++){
        string += hexes[value[i]];
    }
    const hex = `0x${string}`;
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    return hex;
}
function numberToHex(value_, opts = {}) {
    const { signed, size } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size) {
        if (signed) maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
        else maxValue = 2n ** (BigInt(size) * 8n) - 1n;
    } else if (typeof value_ === 'number') {
        maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === 'bigint' && signed ? -maxValue - 1n : 0;
    if (maxValue && value > maxValue || value < minValue) {
        const suffix = typeof value_ === 'bigint' ? 'n' : '';
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IntegerOutOfRangeError"]({
            max: maxValue ? `${maxValue}${suffix}` : undefined,
            min: `${minValue}${suffix}`,
            signed,
            size,
            value: `${value_}${suffix}`
        });
    }
    const hex = `0x${(signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16)}`;
    if (size) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pad"])(hex, {
        size
    });
    return hex;
}
const encoder = /*#__PURE__*/ new TextEncoder();
function stringToHex(value_, opts = {}) {
    const value = encoder.encode(value_);
    return bytesToHex(value, opts);
} //# sourceMappingURL=toHex.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToBytes",
    ()=>boolToBytes,
    "hexToBytes",
    ()=>hexToBytes,
    "numberToBytes",
    ()=>numberToBytes,
    "stringToBytes",
    ()=>stringToBytes,
    "toBytes",
    ()=>toBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/isHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/pad.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/fromHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)");
;
;
;
;
;
const encoder = /*#__PURE__*/ new TextEncoder();
function toBytes(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint') return numberToBytes(value, opts);
    if (typeof value === 'boolean') return boolToBytes(value, opts);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(value)) return hexToBytes(value, opts);
    return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
    const bytes = new Uint8Array(1);
    bytes[0] = Number(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            size: opts.size
        });
    }
    return bytes;
}
// We use very optimized technique to convert hex string to byte array
const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine) return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F) return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f) return char - (charCodeMap.a - 10);
    return undefined;
}
function hexToBytes(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    let hexString = hex.slice(2);
    if (hexString.length % 2) hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for(let index = 0, j = 0; index < length; index++){
        const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
        const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
        if (nibbleLeft === undefined || nibbleRight === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"](`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
        }
        bytes[index] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
}
function numberToBytes(value, opts) {
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToHex"])(value, opts);
    return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
    const bytes = encoder.encode(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            dir: 'right',
            size: opts.size
        });
    }
    return bytes;
} //# sourceMappingURL=toBytes.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/keccak256.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/node_modules/@noble/hashes/esm/sha3.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/isHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)");
;
;
;
;
function keccak256(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["keccak_256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBytes"])(value) : value);
    if (to === 'bytes') return bytes;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(bytes);
} //# sourceMappingURL=keccak256.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/formatAbiItem.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatAbiItem",
    ()=>formatAbiItem,
    "formatAbiParams",
    ()=>formatAbiParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/abi.js [app-route] (ecmascript)");
;
function formatAbiItem(abiItem, { includeName = false } = {}) {
    if (abiItem.type !== 'function' && abiItem.type !== 'event' && abiItem.type !== 'error') throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidDefinitionTypeError"](abiItem.type);
    return `${abiItem.name}(${formatAbiParams(abiItem.inputs, {
        includeName
    })})`;
}
function formatAbiParams(params, { includeName = false } = {}) {
    if (!params) return '';
    return params.map((param)=>formatAbiParam(param, {
            includeName
        })).join(includeName ? ', ' : ',');
}
function formatAbiParam(param, { includeName }) {
    if (param.type.startsWith('tuple')) {
        return `(${formatAbiParams(param.components, {
            includeName
        })})${param.type.slice('tuple'.length)}`;
    }
    return param.type + (includeName && param.name ? ` ${param.name}` : '');
} //# sourceMappingURL=formatAbiItem.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/abi.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbiConstructorNotFoundError",
    ()=>AbiConstructorNotFoundError,
    "AbiConstructorParamsNotFoundError",
    ()=>AbiConstructorParamsNotFoundError,
    "AbiDecodingDataSizeInvalidError",
    ()=>AbiDecodingDataSizeInvalidError,
    "AbiDecodingDataSizeTooSmallError",
    ()=>AbiDecodingDataSizeTooSmallError,
    "AbiDecodingZeroDataError",
    ()=>AbiDecodingZeroDataError,
    "AbiEncodingArrayLengthMismatchError",
    ()=>AbiEncodingArrayLengthMismatchError,
    "AbiEncodingBytesSizeMismatchError",
    ()=>AbiEncodingBytesSizeMismatchError,
    "AbiEncodingLengthMismatchError",
    ()=>AbiEncodingLengthMismatchError,
    "AbiErrorInputsNotFoundError",
    ()=>AbiErrorInputsNotFoundError,
    "AbiErrorNotFoundError",
    ()=>AbiErrorNotFoundError,
    "AbiErrorSignatureNotFoundError",
    ()=>AbiErrorSignatureNotFoundError,
    "AbiEventNotFoundError",
    ()=>AbiEventNotFoundError,
    "AbiEventSignatureEmptyTopicsError",
    ()=>AbiEventSignatureEmptyTopicsError,
    "AbiEventSignatureNotFoundError",
    ()=>AbiEventSignatureNotFoundError,
    "AbiFunctionNotFoundError",
    ()=>AbiFunctionNotFoundError,
    "AbiFunctionOutputsNotFoundError",
    ()=>AbiFunctionOutputsNotFoundError,
    "AbiFunctionSignatureNotFoundError",
    ()=>AbiFunctionSignatureNotFoundError,
    "AbiItemAmbiguityError",
    ()=>AbiItemAmbiguityError,
    "BytesSizeMismatchError",
    ()=>BytesSizeMismatchError,
    "DecodeLogDataMismatch",
    ()=>DecodeLogDataMismatch,
    "DecodeLogTopicsMismatch",
    ()=>DecodeLogTopicsMismatch,
    "InvalidAbiDecodingTypeError",
    ()=>InvalidAbiDecodingTypeError,
    "InvalidAbiEncodingTypeError",
    ()=>InvalidAbiEncodingTypeError,
    "InvalidArrayError",
    ()=>InvalidArrayError,
    "InvalidDefinitionTypeError",
    ()=>InvalidDefinitionTypeError,
    "UnsupportedPackedAbiType",
    ()=>UnsupportedPackedAbiType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/formatAbiItem.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/size.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
;
;
;
class AbiConstructorNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ docsPath }){
        super([
            'A constructor was not found on the ABI.',
            'Make sure you are using the correct ABI and that the constructor exists on it.'
        ].join('\n'), {
            docsPath,
            name: 'AbiConstructorNotFoundError'
        });
    }
}
class AbiConstructorParamsNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ docsPath }){
        super([
            'Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.',
            'Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.'
        ].join('\n'), {
            docsPath,
            name: 'AbiConstructorParamsNotFoundError'
        });
    }
}
class AbiDecodingDataSizeInvalidError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ data, size }){
        super([
            `Data size of ${size} bytes is invalid.`,
            'Size must be in increments of 32 bytes (size % 32 === 0).'
        ].join('\n'), {
            metaMessages: [
                `Data: ${data} (${size} bytes)`
            ],
            name: 'AbiDecodingDataSizeInvalidError'
        });
    }
}
class AbiDecodingDataSizeTooSmallError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ data, params, size }){
        super([
            `Data size of ${size} bytes is too small for given parameters.`
        ].join('\n'), {
            metaMessages: [
                `Params: (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiParams"])(params, {
                    includeName: true
                })})`,
                `Data:   ${data} (${size} bytes)`
            ],
            name: 'AbiDecodingDataSizeTooSmallError'
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = data;
        this.params = params;
        this.size = size;
    }
}
class AbiDecodingZeroDataError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('Cannot decode zero data ("0x") with ABI parameters.', {
            name: 'AbiDecodingZeroDataError'
        });
    }
}
class AbiEncodingArrayLengthMismatchError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ expectedLength, givenLength, type }){
        super([
            `ABI encoding array length mismatch for type ${type}.`,
            `Expected length: ${expectedLength}`,
            `Given length: ${givenLength}`
        ].join('\n'), {
            name: 'AbiEncodingArrayLengthMismatchError'
        });
    }
}
class AbiEncodingBytesSizeMismatchError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ expectedSize, value }){
        super(`Size of bytes "${value}" (bytes${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(value)}) does not match expected size (bytes${expectedSize}).`, {
            name: 'AbiEncodingBytesSizeMismatchError'
        });
    }
}
class AbiEncodingLengthMismatchError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ expectedLength, givenLength }){
        super([
            'ABI encoding params/values length mismatch.',
            `Expected length (params): ${expectedLength}`,
            `Given length (values): ${givenLength}`
        ].join('\n'), {
            name: 'AbiEncodingLengthMismatchError'
        });
    }
}
class AbiErrorInputsNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(errorName, { docsPath }){
        super([
            `Arguments (\`args\`) were provided to "${errorName}", but "${errorName}" on the ABI does not contain any parameters (\`inputs\`).`,
            'Cannot encode error result without knowing what the parameter types are.',
            'Make sure you are using the correct ABI and that the inputs exist on it.'
        ].join('\n'), {
            docsPath,
            name: 'AbiErrorInputsNotFoundError'
        });
    }
}
class AbiErrorNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(errorName, { docsPath } = {}){
        super([
            `Error ${errorName ? `"${errorName}" ` : ''}not found on ABI.`,
            'Make sure you are using the correct ABI and that the error exists on it.'
        ].join('\n'), {
            docsPath,
            name: 'AbiErrorNotFoundError'
        });
    }
}
class AbiErrorSignatureNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(signature, { docsPath }){
        super([
            `Encoded error signature "${signature}" not found on ABI.`,
            'Make sure you are using the correct ABI and that the error exists on it.',
            `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
        ].join('\n'), {
            docsPath,
            name: 'AbiErrorSignatureNotFoundError'
        });
        Object.defineProperty(this, "signature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.signature = signature;
    }
}
class AbiEventSignatureEmptyTopicsError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ docsPath }){
        super('Cannot extract event signature from empty topics.', {
            docsPath,
            name: 'AbiEventSignatureEmptyTopicsError'
        });
    }
}
class AbiEventSignatureNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(signature, { docsPath }){
        super([
            `Encoded event signature "${signature}" not found on ABI.`,
            'Make sure you are using the correct ABI and that the event exists on it.',
            `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
        ].join('\n'), {
            docsPath,
            name: 'AbiEventSignatureNotFoundError'
        });
    }
}
class AbiEventNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(eventName, { docsPath } = {}){
        super([
            `Event ${eventName ? `"${eventName}" ` : ''}not found on ABI.`,
            'Make sure you are using the correct ABI and that the event exists on it.'
        ].join('\n'), {
            docsPath,
            name: 'AbiEventNotFoundError'
        });
    }
}
class AbiFunctionNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(functionName, { docsPath } = {}){
        super([
            `Function ${functionName ? `"${functionName}" ` : ''}not found on ABI.`,
            'Make sure you are using the correct ABI and that the function exists on it.'
        ].join('\n'), {
            docsPath,
            name: 'AbiFunctionNotFoundError'
        });
    }
}
class AbiFunctionOutputsNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(functionName, { docsPath }){
        super([
            `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
            'Cannot decode function result without knowing what the parameter types are.',
            'Make sure you are using the correct ABI and that the function exists on it.'
        ].join('\n'), {
            docsPath,
            name: 'AbiFunctionOutputsNotFoundError'
        });
    }
}
class AbiFunctionSignatureNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(signature, { docsPath }){
        super([
            `Encoded function signature "${signature}" not found on ABI.`,
            'Make sure you are using the correct ABI and that the function exists on it.',
            `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
        ].join('\n'), {
            docsPath,
            name: 'AbiFunctionSignatureNotFoundError'
        });
    }
}
class AbiItemAmbiguityError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(x, y){
        super('Found ambiguous types in overloaded ABI items.', {
            metaMessages: [
                `\`${x.type}\` in \`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiItem"])(x.abiItem)}\`, and`,
                `\`${y.type}\` in \`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiItem"])(y.abiItem)}\``,
                '',
                'These types encode differently and cannot be distinguished at runtime.',
                'Remove one of the ambiguous items in the ABI.'
            ],
            name: 'AbiItemAmbiguityError'
        });
    }
}
class BytesSizeMismatchError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ expectedSize, givenSize }){
        super(`Expected bytes${expectedSize}, got bytes${givenSize}.`, {
            name: 'BytesSizeMismatchError'
        });
    }
}
class DecodeLogDataMismatch extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ abiItem, data, params, size }){
        super([
            `Data size of ${size} bytes is too small for non-indexed event parameters.`
        ].join('\n'), {
            metaMessages: [
                `Params: (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiParams"])(params, {
                    includeName: true
                })})`,
                `Data:   ${data} (${size} bytes)`
            ],
            name: 'DecodeLogDataMismatch'
        });
        Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.abiItem = abiItem;
        this.data = data;
        this.params = params;
        this.size = size;
    }
}
class DecodeLogTopicsMismatch extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ abiItem, param }){
        super([
            `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ''} on event "${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiItem"])(abiItem, {
                includeName: true
            })}".`
        ].join('\n'), {
            name: 'DecodeLogTopicsMismatch'
        });
        Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.abiItem = abiItem;
    }
}
class InvalidAbiEncodingTypeError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(type, { docsPath }){
        super([
            `Type "${type}" is not a valid encoding type.`,
            'Please provide a valid ABI type.'
        ].join('\n'), {
            docsPath,
            name: 'InvalidAbiEncodingType'
        });
    }
}
class InvalidAbiDecodingTypeError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(type, { docsPath }){
        super([
            `Type "${type}" is not a valid decoding type.`,
            'Please provide a valid ABI type.'
        ].join('\n'), {
            docsPath,
            name: 'InvalidAbiDecodingType'
        });
    }
}
class InvalidArrayError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(value){
        super([
            `Value "${value}" is not a valid array.`
        ].join('\n'), {
            name: 'InvalidArrayError'
        });
    }
}
class InvalidDefinitionTypeError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(type){
        super([
            `"${type}" is not a valid definition type.`,
            'Valid types: "function", "event", "error"'
        ].join('\n'), {
            name: 'InvalidDefinitionTypeError'
        });
    }
}
class UnsupportedPackedAbiType extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(type){
        super(`Type "${type}" is not supported for packed encoding.`, {
            name: 'UnsupportedPackedAbiType'
        });
    }
} //# sourceMappingURL=abi.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/constants/solidity.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// https://docs.soliditylang.org/en/v0.8.16/control-structures.html#panic-via-assert-and-error-via-require
__turbopack_context__.s([
    "panicReasons",
    ()=>panicReasons,
    "solidityError",
    ()=>solidityError,
    "solidityPanic",
    ()=>solidityPanic
]);
const panicReasons = {
    1: 'An `assert` condition failed.',
    17: 'Arithmetic operation resulted in underflow or overflow.',
    18: 'Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).',
    33: 'Attempted to convert to an invalid type.',
    34: 'Attempted to access a storage byte array that is incorrectly encoded.',
    49: 'Performed `.pop()` on an empty array',
    50: 'Array index is out of bounds.',
    65: 'Allocated too much memory or created an array which is too large.',
    81: 'Attempted to call a zero-initialized variable of internal function type.'
};
const solidityError = {
    inputs: [
        {
            name: 'message',
            type: 'string'
        }
    ],
    name: 'Error',
    type: 'error'
};
const solidityPanic = {
    inputs: [
        {
            name: 'reason',
            type: 'uint256'
        }
    ],
    name: 'Panic',
    type: 'error'
}; //# sourceMappingURL=solidity.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/slice.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "slice",
    ()=>slice,
    "sliceBytes",
    ()=>sliceBytes,
    "sliceHex",
    ()=>sliceHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/data.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/isHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/size.js [app-route] (ecmascript)");
;
;
;
function slice(value, start, end, { strict } = {}) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    })) return sliceHex(value, start, end, {
        strict
    });
    return sliceBytes(value, start, end, {
        strict
    });
}
function assertStartOffset(value, start) {
    if (typeof start === 'number' && start > 0 && start > (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(value) - 1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SliceOffsetOutOfBoundsError"]({
        offset: start,
        position: 'start',
        size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(value)
    });
}
function assertEndOffset(value, start, end) {
    if (typeof start === 'number' && typeof end === 'number' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(value) !== end - start) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SliceOffsetOutOfBoundsError"]({
            offset: end,
            position: 'end',
            size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(value)
        });
    }
}
function sliceBytes(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = value_.slice(start, end);
    if (strict) assertEndOffset(value, start, end);
    return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = `0x${value_.replace('0x', '').slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
    if (strict) assertEndOffset(value, start, end);
    return value;
} //# sourceMappingURL=slice.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/hashSignature.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashSignature",
    ()=>hashSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/keccak256.js [app-route] (ecmascript)");
;
;
const hash = (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBytes"])(value));
function hashSignature(sig) {
    return hash(sig);
} //# sourceMappingURL=hashSignature.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/normalizeSignature.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeSignature",
    ()=>normalizeSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
;
function normalizeSignature(signature) {
    let active = true;
    let current = '';
    let level = 0;
    let result = '';
    let valid = false;
    for(let i = 0; i < signature.length; i++){
        const char = signature[i];
        // If the character is a separator, we want to reactivate.
        if ([
            '(',
            ')',
            ','
        ].includes(char)) active = true;
        // If the character is a "level" token, we want to increment/decrement.
        if (char === '(') level++;
        if (char === ')') level--;
        // If we aren't active, we don't want to mutate the result.
        if (!active) continue;
        // If level === 0, we are at the definition level.
        if (level === 0) {
            if (char === ' ' && [
                'event',
                'function',
                ''
            ].includes(result)) result = '';
            else {
                result += char;
                // If we are at the end of the definition, we must be finished.
                if (char === ')') {
                    valid = true;
                    break;
                }
            }
            continue;
        }
        // Ignore spaces
        if (char === ' ') {
            // If the previous character is a separator, and the current section isn't empty, we want to deactivate.
            if (signature[i - 1] !== ',' && current !== ',' && current !== ',(') {
                current = '';
                active = false;
            }
            continue;
        }
        result += char;
        current += char;
    }
    if (!valid) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"]('Unable to normalize signature.');
    return result;
} //# sourceMappingURL=normalizeSignature.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/toSignature.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toSignature",
    ()=>toSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/node_modules/abitype/dist/esm/human-readable/formatAbiItem.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$normalizeSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/normalizeSignature.js [app-route] (ecmascript)");
;
;
const toSignature = (def)=>{
    const def_ = (()=>{
        if (typeof def === 'string') return def;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiItem"])(def);
    })();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$normalizeSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeSignature"])(def_);
}; //# sourceMappingURL=toSignature.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/toSignatureHash.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toSignatureHash",
    ()=>toSignatureHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$hashSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/hashSignature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/toSignature.js [app-route] (ecmascript)");
;
;
function toSignatureHash(fn) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$hashSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashSignature"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toSignature"])(fn));
} //# sourceMappingURL=toSignatureHash.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toFunctionSelector",
    ()=>toFunctionSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/slice.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/toSignatureHash.js [app-route] (ecmascript)");
;
;
const toFunctionSelector = (fn)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["slice"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toSignatureHash"])(fn), 0, 4); //# sourceMappingURL=toFunctionSelector.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/address.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidAddressError",
    ()=>InvalidAddressError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
;
class InvalidAddressError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ address }){
        super(`Address "${address}" is invalid.`, {
            metaMessages: [
                '- Address must be a hex value of 20 bytes (40 hex characters).',
                '- Address must match its checksum counterpart.'
            ],
            name: 'InvalidAddressError'
        });
    }
} //# sourceMappingURL=address.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/lru.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map with a LRU (Least recently used) policy.
 *
 * @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */ __turbopack_context__.s([
    "LruMap",
    ()=>LruMap
]);
class LruMap extends Map {
    constructor(size){
        super();
        Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxSize = size;
    }
    get(key) {
        const value = super.get(key);
        if (super.has(key) && value !== undefined) {
            this.delete(key);
            super.set(key, value);
        }
        return value;
    }
    set(key, value) {
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
            const firstKey = this.keys().next().value;
            if (firstKey) this.delete(firstKey);
        }
        return this;
    }
} //# sourceMappingURL=lru.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/address/isAddress.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAddress",
    ()=>isAddress,
    "isAddressCache",
    ()=>isAddressCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/lru.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/address/getAddress.js [app-route] (ecmascript)");
;
;
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const isAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LruMap"](8192);
function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey = `${address}.${strict}`;
    if (isAddressCache.has(cacheKey)) return isAddressCache.get(cacheKey);
    const result = (()=>{
        if (!addressRegex.test(address)) return false;
        if (address.toLowerCase() === address) return true;
        if (strict) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checksumAddress"])(address) === address;
        return true;
    })();
    isAddressCache.set(cacheKey, result);
    return result;
} //# sourceMappingURL=isAddress.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/address/getAddress.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checksumAddress",
    ()=>checksumAddress,
    "getAddress",
    ()=>getAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/address.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/keccak256.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/lru.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/address/isAddress.js [app-route] (ecmascript)");
;
;
;
;
;
const checksumAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LruMap"](8192);
function checksumAddress(address_, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (checksumAddressCache.has(`${address_}.${chainId}`)) return checksumAddressCache.get(`${address_}.${chainId}`);
    const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
    const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringToBytes"])(hexAddress), 'bytes');
    const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split('');
    for(let i = 0; i < 40; i += 2){
        if (hash[i >> 1] >> 4 >= 8 && address[i]) {
            address[i] = address[i].toUpperCase();
        }
        if ((hash[i >> 1] & 0x0f) >= 8 && address[i + 1]) {
            address[i + 1] = address[i + 1].toUpperCase();
        }
    }
    const result = `0x${address.join('')}`;
    checksumAddressCache.set(`${address_}.${chainId}`, result);
    return result;
}
function getAddress(address, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAddress"])(address, {
        strict: false
    })) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidAddressError"]({
        address
    });
    return checksumAddress(address, chainId);
} //# sourceMappingURL=getAddress.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/cursor.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NegativeOffsetError",
    ()=>NegativeOffsetError,
    "PositionOutOfBoundsError",
    ()=>PositionOutOfBoundsError,
    "RecursiveReadLimitExceededError",
    ()=>RecursiveReadLimitExceededError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
;
class NegativeOffsetError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ offset }){
        super(`Offset \`${offset}\` cannot be negative.`, {
            name: 'NegativeOffsetError'
        });
    }
}
class PositionOutOfBoundsError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ length, position }){
        super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, {
            name: 'PositionOutOfBoundsError'
        });
    }
}
class RecursiveReadLimitExceededError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ count, limit }){
        super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, {
            name: 'RecursiveReadLimitExceededError'
        });
    }
} //# sourceMappingURL=cursor.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/cursor.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCursor",
    ()=>createCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$cursor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/cursor.js [app-route] (ecmascript)");
;
const staticCursor = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: Number.POSITIVE_INFINITY,
    assertReadLimit () {
        if (this.recursiveReadCount >= this.recursiveReadLimit) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$cursor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecursiveReadLimitExceededError"]({
            count: this.recursiveReadCount + 1,
            limit: this.recursiveReadLimit
        });
    },
    assertPosition (position) {
        if (position < 0 || position > this.bytes.length - 1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$cursor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PositionOutOfBoundsError"]({
            length: this.bytes.length,
            position
        });
    },
    decrementPosition (offset) {
        if (offset < 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$cursor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NegativeOffsetError"]({
            offset
        });
        const position = this.position - offset;
        this.assertPosition(position);
        this.position = position;
    },
    getReadCount (position) {
        return this.positionReadCount.get(position || this.position) || 0;
    },
    incrementPosition (offset) {
        if (offset < 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$cursor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NegativeOffsetError"]({
            offset
        });
        const position = this.position + offset;
        this.assertPosition(position);
        this.position = position;
    },
    inspectByte (position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position);
        return this.bytes[position];
    },
    inspectBytes (length, position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + length - 1);
        return this.bytes.subarray(position, position + length);
    },
    inspectUint8 (position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position);
        return this.bytes[position];
    },
    inspectUint16 (position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 1);
        return this.dataView.getUint16(position);
    },
    inspectUint24 (position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 2);
        return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
    },
    inspectUint32 (position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 3);
        return this.dataView.getUint32(position);
    },
    pushByte (byte) {
        this.assertPosition(this.position);
        this.bytes[this.position] = byte;
        this.position++;
    },
    pushBytes (bytes) {
        this.assertPosition(this.position + bytes.length - 1);
        this.bytes.set(bytes, this.position);
        this.position += bytes.length;
    },
    pushUint8 (value) {
        this.assertPosition(this.position);
        this.bytes[this.position] = value;
        this.position++;
    },
    pushUint16 (value) {
        this.assertPosition(this.position + 1);
        this.dataView.setUint16(this.position, value);
        this.position += 2;
    },
    pushUint24 (value) {
        this.assertPosition(this.position + 2);
        this.dataView.setUint16(this.position, value >> 8);
        this.dataView.setUint8(this.position + 2, value & ~4294967040);
        this.position += 3;
    },
    pushUint32 (value) {
        this.assertPosition(this.position + 3);
        this.dataView.setUint32(this.position, value);
        this.position += 4;
    },
    readByte () {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectByte();
        this.position++;
        return value;
    },
    readBytes (length, size) {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectBytes(length);
        this.position += size ?? length;
        return value;
    },
    readUint8 () {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint8();
        this.position += 1;
        return value;
    },
    readUint16 () {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint16();
        this.position += 2;
        return value;
    },
    readUint24 () {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint24();
        this.position += 3;
        return value;
    },
    readUint32 () {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint32();
        this.position += 4;
        return value;
    },
    get remaining () {
        return this.bytes.length - this.position;
    },
    setPosition (position) {
        const oldPosition = this.position;
        this.assertPosition(position);
        this.position = position;
        return ()=>this.position = oldPosition;
    },
    _touch () {
        if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
        const count = this.getReadCount();
        this.positionReadCount.set(this.position, count + 1);
        if (count > 0) this.recursiveReadCount++;
    }
};
function createCursor(bytes, { recursiveReadLimit = 8_192 } = {}) {
    const cursor = Object.create(staticCursor);
    cursor.bytes = bytes;
    cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    cursor.positionReadCount = new Map();
    cursor.recursiveReadLimit = recursiveReadLimit;
    return cursor;
} //# sourceMappingURL=cursor.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/fromBytes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bytesToBigInt",
    ()=>bytesToBigInt,
    "bytesToBool",
    ()=>bytesToBool,
    "bytesToNumber",
    ()=>bytesToNumber,
    "bytesToString",
    ()=>bytesToString,
    "fromBytes",
    ()=>fromBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/encoding.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/trim.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/fromHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)");
;
;
;
;
function fromBytes(bytes, toOrOpts) {
    const opts = typeof toOrOpts === 'string' ? {
        to: toOrOpts
    } : toOrOpts;
    const to = opts.to;
    if (to === 'number') return bytesToNumber(bytes, opts);
    if (to === 'bigint') return bytesToBigInt(bytes, opts);
    if (to === 'boolean') return bytesToBool(bytes, opts);
    if (to === 'string') return bytesToString(bytes, opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])(bytes, opts);
}
function bytesToBigInt(bytes, opts = {}) {
    if (typeof opts.size !== 'undefined') (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
        size: opts.size
    });
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])(bytes, opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToBigInt"])(hex, opts);
}
function bytesToBool(bytes_, opts = {}) {
    let bytes = bytes_;
    if (typeof opts.size !== 'undefined') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trim"])(bytes);
    }
    if (bytes.length > 1 || bytes[0] > 1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidBytesBooleanError"](bytes);
    return Boolean(bytes[0]);
}
function bytesToNumber(bytes, opts = {}) {
    if (typeof opts.size !== 'undefined') (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
        size: opts.size
    });
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])(bytes, opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToNumber"])(hex, opts);
}
function bytesToString(bytes_, opts = {}) {
    let bytes = bytes_;
    if (typeof opts.size !== 'undefined') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trim"])(bytes, {
            dir: 'right'
        });
    }
    return new TextDecoder().decode(bytes);
} //# sourceMappingURL=fromBytes.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/concat.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concat",
    ()=>concat,
    "concatBytes",
    ()=>concatBytes,
    "concatHex",
    ()=>concatHex
]);
function concat(values) {
    if (typeof values[0] === 'string') return concatHex(values);
    return concatBytes(values);
}
function concatBytes(values) {
    let length = 0;
    for (const arr of values){
        length += arr.length;
    }
    const result = new Uint8Array(length);
    let offset = 0;
    for (const arr of values){
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}
function concatHex(values) {
    return `0x${values.reduce((acc, x)=>acc + x.replace('0x', ''), '')}`;
} //# sourceMappingURL=concat.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/regex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrayRegex",
    ()=>arrayRegex,
    "bytesRegex",
    ()=>bytesRegex,
    "integerRegex",
    ()=>integerRegex
]);
const arrayRegex = /^(.*)\[([0-9]*)\]$/;
const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/; //# sourceMappingURL=regex.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/encodeAbiParameters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeAbiParameters",
    ()=>encodeAbiParameters,
    "getArrayComponents",
    ()=>getArrayComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/abi.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/address.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/encoding.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/address/isAddress.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/concat.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/pad.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/size.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/slice.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/regex.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
function encodeAbiParameters(params, values) {
    if (params.length !== values.length) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiEncodingLengthMismatchError"]({
        expectedLength: params.length,
        givenLength: values.length
    });
    // Prepare the parameters to determine dynamic types to encode.
    const preparedParams = prepareParams({
        params: params,
        values: values
    });
    const data = encodeParams(preparedParams);
    if (data.length === 0) return '0x';
    return data;
}
function prepareParams({ params, values }) {
    const preparedParams = [];
    for(let i = 0; i < params.length; i++){
        preparedParams.push(prepareParam({
            param: params[i],
            value: values[i]
        }));
    }
    return preparedParams;
}
function prepareParam({ param, value }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
        const [length, type] = arrayComponents;
        return encodeArray(value, {
            length,
            param: {
                ...param,
                type
            }
        });
    }
    if (param.type === 'tuple') {
        return encodeTuple(value, {
            param: param
        });
    }
    if (param.type === 'address') {
        return encodeAddress(value);
    }
    if (param.type === 'bool') {
        return encodeBool(value);
    }
    if (param.type.startsWith('uint') || param.type.startsWith('int')) {
        const signed = param.type.startsWith('int');
        const [, , size = '256'] = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integerRegex"].exec(param.type) ?? [];
        return encodeNumber(value, {
            signed,
            size: Number(size)
        });
    }
    if (param.type.startsWith('bytes')) {
        return encodeBytes(value, {
            param
        });
    }
    if (param.type === 'string') {
        return encodeString(value);
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidAbiEncodingTypeError"](param.type, {
        docsPath: '/docs/contract/encodeAbiParameters'
    });
}
function encodeParams(preparedParams) {
    // 1. Compute the size of the static part of the parameters.
    let staticSize = 0;
    for(let i = 0; i < preparedParams.length; i++){
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic) staticSize += 32;
        else staticSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(encoded);
    }
    // 2. Split the parameters into static and dynamic parts.
    const staticParams = [];
    const dynamicParams = [];
    let dynamicSize = 0;
    for(let i = 0; i < preparedParams.length; i++){
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic) {
            staticParams.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToHex"])(staticSize + dynamicSize, {
                size: 32
            }));
            dynamicParams.push(encoded);
            dynamicSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(encoded);
        } else {
            staticParams.push(encoded);
        }
    }
    // 3. Concatenate static and dynamic parts.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])([
        ...staticParams,
        ...dynamicParams
    ]);
}
function encodeAddress(value) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAddress"])(value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidAddressError"]({
        address: value
    });
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padHex"])(value.toLowerCase())
    };
}
function encodeArray(value, { length, param }) {
    const dynamic = length === null;
    if (!Array.isArray(value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidArrayError"](value);
    if (!dynamic && value.length !== length) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiEncodingArrayLengthMismatchError"]({
        expectedLength: length,
        givenLength: value.length,
        type: `${param.type}[${length}]`
    });
    let dynamicChild = false;
    const preparedParams = [];
    for(let i = 0; i < value.length; i++){
        const preparedParam = prepareParam({
            param,
            value: value[i]
        });
        if (preparedParam.dynamic) dynamicChild = true;
        preparedParams.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
        const data = encodeParams(preparedParams);
        if (dynamic) {
            const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToHex"])(preparedParams.length, {
                size: 32
            });
            return {
                dynamic: true,
                encoded: preparedParams.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])([
                    length,
                    data
                ]) : length
            };
        }
        if (dynamicChild) return {
            dynamic: true,
            encoded: data
        };
    }
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])(preparedParams.map(({ encoded })=>encoded))
    };
}
function encodeBytes(value, { param }) {
    const [, paramSize] = param.type.split('bytes');
    const bytesSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(value);
    if (!paramSize) {
        let value_ = value;
        // If the size is not divisible by 32 bytes, pad the end
        // with empty bytes to the ceiling 32 bytes.
        if (bytesSize % 32 !== 0) value_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padHex"])(value_, {
            dir: 'right',
            size: Math.ceil((value.length - 2) / 2 / 32) * 32
        });
        return {
            dynamic: true,
            encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToHex"])(bytesSize, {
                    size: 32
                })),
                value_
            ])
        };
    }
    if (bytesSize !== Number.parseInt(paramSize, 10)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiEncodingBytesSizeMismatchError"]({
        expectedSize: Number.parseInt(paramSize, 10),
        value
    });
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padHex"])(value, {
            dir: 'right'
        })
    };
}
function encodeBool(value) {
    if (typeof value !== 'boolean') throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"](`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolToHex"])(value))
    };
}
function encodeNumber(value, { signed, size = 256 }) {
    if (typeof size === 'number') {
        const max = 2n ** (BigInt(size) - (signed ? 1n : 0n)) - 1n;
        const min = signed ? -max - 1n : 0n;
        if (value > max || value < min) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IntegerOutOfRangeError"]({
            max: max.toString(),
            min: min.toString(),
            signed,
            size: size / 8,
            value: value.toString()
        });
    }
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToHex"])(value, {
            size: 32,
            signed
        })
    };
}
function encodeString(value) {
    const hexValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringToHex"])(value);
    const partsLength = Math.ceil((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(hexValue) / 32);
    const parts = [];
    for(let i = 0; i < partsLength; i++){
        parts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["slice"])(hexValue, i * 32, (i + 1) * 32), {
            dir: 'right'
        }));
    }
    return {
        dynamic: true,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(hexValue), {
                size: 32
            })),
            ...parts
        ])
    };
}
function encodeTuple(value, { param }) {
    let dynamic = false;
    const preparedParams = [];
    for(let i = 0; i < param.components.length; i++){
        const param_ = param.components[i];
        const index = Array.isArray(value) ? i : param_.name;
        const preparedParam = prepareParam({
            param: param_,
            value: value[index]
        });
        preparedParams.push(preparedParam);
        if (preparedParam.dynamic) dynamic = true;
    }
    return {
        dynamic,
        encoded: dynamic ? encodeParams(preparedParams) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])(preparedParams.map(({ encoded })=>encoded))
    };
}
function getArrayComponents(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches ? [
        matches[2] ? Number(matches[2]) : null,
        matches[1]
    ] : undefined;
} //# sourceMappingURL=encodeAbiParameters.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeAbiParameters",
    ()=>decodeAbiParameters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/abi.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/address/getAddress.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$cursor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/cursor.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/size.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/slice.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/trim.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/fromBytes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/encodeAbiParameters.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
function decodeAbiParameters(params, data) {
    const bytes = typeof data === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToBytes"])(data) : data;
    const cursor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$cursor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCursor"])(bytes);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(bytes) === 0 && params.length > 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiDecodingZeroDataError"]();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(data) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(data) < 32) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiDecodingDataSizeTooSmallError"]({
        data: typeof data === 'string' ? data : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])(data),
        params: params,
        size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["size"])(data)
    });
    let consumed = 0;
    const values = [];
    for(let i = 0; i < params.length; ++i){
        const param = params[i];
        cursor.setPosition(consumed);
        const [data, consumed_] = decodeParameter(cursor, param, {
            staticPosition: 0
        });
        consumed += consumed_;
        values.push(data);
    }
    return values;
}
function decodeParameter(cursor, param, { staticPosition }) {
    const arrayComponents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getArrayComponents"])(param.type);
    if (arrayComponents) {
        const [length, type] = arrayComponents;
        return decodeArray(cursor, {
            ...param,
            type
        }, {
            length,
            staticPosition
        });
    }
    if (param.type === 'tuple') return decodeTuple(cursor, param, {
        staticPosition
    });
    if (param.type === 'address') return decodeAddress(cursor);
    if (param.type === 'bool') return decodeBool(cursor);
    if (param.type.startsWith('bytes')) return decodeBytes(cursor, param, {
        staticPosition
    });
    if (param.type.startsWith('uint') || param.type.startsWith('int')) return decodeNumber(cursor, param);
    if (param.type === 'string') return decodeString(cursor, {
        staticPosition
    });
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidAbiDecodingTypeError"](param.type, {
        docsPath: '/docs/contract/decodeAbiParameters'
    });
}
////////////////////////////////////////////////////////////////////
// Type Decoders
const sizeOfLength = 32;
const sizeOfOffset = 32;
function decodeAddress(cursor) {
    const value = cursor.readBytes(32);
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checksumAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sliceBytes"])(value, -20))),
        32
    ];
}
function decodeArray(cursor, param, { length, staticPosition }) {
    // If the length of the array is not known in advance (dynamic array),
    // this means we will need to wonder off to the pointer and decode.
    if (!length) {
        // Dealing with a dynamic type, so get the offset of the array data.
        const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(sizeOfOffset));
        // Start is the static position of current slot + offset.
        const start = staticPosition + offset;
        const startOfData = start + sizeOfLength;
        // Get the length of the array from the offset.
        cursor.setPosition(start);
        const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(sizeOfLength));
        // Check if the array has any dynamic children.
        const dynamicChild = hasDynamicChild(param);
        let consumed = 0;
        const value = [];
        for(let i = 0; i < length; ++i){
            // If any of the children is dynamic, then all elements will be offset pointer, thus size of one slot (32 bytes).
            // Otherwise, elements will be the size of their encoding (consumed bytes).
            cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed));
            const [data, consumed_] = decodeParameter(cursor, param, {
                staticPosition: startOfData
            });
            consumed += consumed_;
            value.push(data);
        }
        // As we have gone wondering, restore to the original position + next slot.
        cursor.setPosition(staticPosition + 32);
        return [
            value,
            32
        ];
    }
    // If the length of the array is known in advance,
    // and the length of an element deeply nested in the array is not known,
    // we need to decode the offset of the array data.
    if (hasDynamicChild(param)) {
        // Dealing with dynamic types, so get the offset of the array data.
        const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(sizeOfOffset));
        // Start is the static position of current slot + offset.
        const start = staticPosition + offset;
        const value = [];
        for(let i = 0; i < length; ++i){
            // Move cursor along to the next slot (next offset pointer).
            cursor.setPosition(start + i * 32);
            const [data] = decodeParameter(cursor, param, {
                staticPosition: start
            });
            value.push(data);
        }
        // As we have gone wondering, restore to the original position + next slot.
        cursor.setPosition(staticPosition + 32);
        return [
            value,
            32
        ];
    }
    // If the length of the array is known in advance and the array is deeply static,
    // then we can just decode each element in sequence.
    let consumed = 0;
    const value = [];
    for(let i = 0; i < length; ++i){
        const [data, consumed_] = decodeParameter(cursor, param, {
            staticPosition: staticPosition + consumed
        });
        consumed += consumed_;
        value.push(data);
    }
    return [
        value,
        consumed
    ];
}
function decodeBool(cursor) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToBool"])(cursor.readBytes(32), {
            size: 32
        }),
        32
    ];
}
function decodeBytes(cursor, param, { staticPosition }) {
    const [_, size] = param.type.split('bytes');
    if (!size) {
        // Dealing with dynamic types, so get the offset of the bytes data.
        const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(32));
        // Set position of the cursor to start of bytes data.
        cursor.setPosition(staticPosition + offset);
        const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(32));
        // If there is no length, we have zero data.
        if (length === 0) {
            // As we have gone wondering, restore to the original position + next slot.
            cursor.setPosition(staticPosition + 32);
            return [
                '0x',
                32
            ];
        }
        const data = cursor.readBytes(length);
        // As we have gone wondering, restore to the original position + next slot.
        cursor.setPosition(staticPosition + 32);
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])(data),
            32
        ];
    }
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])(cursor.readBytes(Number.parseInt(size, 10), 32));
    return [
        value,
        32
    ];
}
function decodeNumber(cursor, param) {
    const signed = param.type.startsWith('int');
    const size = Number.parseInt(param.type.split('int')[1] || '256', 10);
    const value = cursor.readBytes(32);
    return [
        size > 48 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToBigInt"])(value, {
            signed
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(value, {
            signed
        }),
        32
    ];
}
function decodeTuple(cursor, param, { staticPosition }) {
    // Tuples can have unnamed components (i.e. they are arrays), so we must
    // determine whether the tuple is named or unnamed. In the case of a named
    // tuple, the value will be an object where each property is the name of the
    // component. In the case of an unnamed tuple, the value will be an array.
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name })=>!name);
    // Initialize the value to an object or an array, depending on whether the
    // tuple is named or unnamed.
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    // If the tuple has a dynamic child, we must first decode the offset to the
    // tuple data.
    if (hasDynamicChild(param)) {
        // Dealing with dynamic types, so get the offset of the tuple data.
        const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(sizeOfOffset));
        // Start is the static position of referencing slot + offset.
        const start = staticPosition + offset;
        for(let i = 0; i < param.components.length; ++i){
            const component = param.components[i];
            cursor.setPosition(start + consumed);
            const [data, consumed_] = decodeParameter(cursor, component, {
                staticPosition: start
            });
            consumed += consumed_;
            value[hasUnnamedChild ? i : component?.name] = data;
        }
        // As we have gone wondering, restore to the original position + next slot.
        cursor.setPosition(staticPosition + 32);
        return [
            value,
            32
        ];
    }
    // If the tuple has static children, we can just decode each component
    // in sequence.
    for(let i = 0; i < param.components.length; ++i){
        const component = param.components[i];
        const [data, consumed_] = decodeParameter(cursor, component, {
            staticPosition
        });
        value[hasUnnamedChild ? i : component?.name] = data;
        consumed += consumed_;
    }
    return [
        value,
        consumed
    ];
}
function decodeString(cursor, { staticPosition }) {
    // Get offset to start of string data.
    const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(32));
    // Start is the static position of current slot + offset.
    const start = staticPosition + offset;
    cursor.setPosition(start);
    const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToNumber"])(cursor.readBytes(32));
    // If there is no length, we have zero data (empty string).
    if (length === 0) {
        cursor.setPosition(staticPosition + 32);
        return [
            '',
            32
        ];
    }
    const data = cursor.readBytes(length, 32);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToString"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trim"])(data));
    // As we have gone wondering, restore to the original position + next slot.
    cursor.setPosition(staticPosition + 32);
    return [
        value,
        32
    ];
}
function hasDynamicChild(param) {
    const { type } = param;
    if (type === 'string') return true;
    if (type === 'bytes') return true;
    if (type.endsWith('[]')) return true;
    if (type === 'tuple') return param.components?.some(hasDynamicChild);
    const arrayComponents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getArrayComponents"])(param.type);
    if (arrayComponents && hasDynamicChild({
        ...param,
        type: arrayComponents[1]
    })) return true;
    return false;
} //# sourceMappingURL=decodeAbiParameters.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/decodeErrorResult.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeErrorResult",
    ()=>decodeErrorResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$solidity$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/constants/solidity.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/abi.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/slice.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/formatAbiItem.js [app-route] (ecmascript)");
;
;
;
;
;
;
function decodeErrorResult(parameters) {
    const { abi, data } = parameters;
    const signature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["slice"])(data, 0, 4);
    if (signature === '0x') throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiDecodingZeroDataError"]();
    const abi_ = [
        ...abi || [],
        __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$solidity$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["solidityError"],
        __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$solidity$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["solidityPanic"]
    ];
    const abiItem = abi_.find((x)=>x.type === 'error' && signature === (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toFunctionSelector"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiItem"])(x)));
    if (!abiItem) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiErrorSignatureNotFoundError"](signature, {
        docsPath: '/docs/contract/decodeErrorResult'
    });
    return {
        abiItem,
        args: 'inputs' in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(abiItem.inputs, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$slice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["slice"])(data, 4)) : undefined,
        errorName: abiItem.name
    };
} //# sourceMappingURL=decodeErrorResult.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/stringify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stringify",
    ()=>stringify
]);
const stringify = (value, replacer, space)=>JSON.stringify(value, (key, value_)=>{
        const value = typeof value_ === 'bigint' ? value_.toString() : value_;
        return typeof replacer === 'function' ? replacer(key, value) : value;
    }, space); //# sourceMappingURL=stringify.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatAbiItemWithArgs",
    ()=>formatAbiItemWithArgs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/stringify.js [app-route] (ecmascript)");
;
function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
    if (!('name' in abiItem)) return;
    if (!('inputs' in abiItem)) return;
    if (!abiItem.inputs) return;
    return `${includeFunctionName ? abiItem.name : ''}(${abiItem.inputs.map((input, i)=>`${includeName && input.name ? `${input.name}: ` : ''}${typeof args[i] === 'object' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(args[i]) : args[i]}`).join(', ')})`;
} //# sourceMappingURL=formatAbiItemWithArgs.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/accounts/utils/parseAccount.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAccount",
    ()=>parseAccount
]);
function parseAccount(account) {
    if (typeof account === 'string') return {
        address: account,
        type: 'json-rpc'
    };
    return account;
} //# sourceMappingURL=parseAccount.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/uid.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uid",
    ()=>uid
]);
const size = 256;
let index = size;
let buffer;
function uid(length = 11) {
    if (!buffer || index + length > size * 2) {
        buffer = '';
        index = 0;
        for(let i = 0; i < size; i++){
            buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
        }
    }
    return buffer.substring(index, index++ + length);
} //# sourceMappingURL=uid.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/clients/createClient.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "rpcSchema",
    ()=>rpcSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$parseAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/accounts/utils/parseAccount.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/uid.js [app-route] (ecmascript)");
;
;
function createClient(parameters) {
    const { batch, chain, ccipRead, key = 'base', name = 'Base Client', type = 'base' } = parameters;
    const experimental_blockTag = parameters.experimental_blockTag ?? (typeof chain?.experimental_preconfirmationTime === 'number' ? 'pending' : undefined);
    const blockTime = chain?.blockTime ?? 12_000;
    const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4_000);
    const pollingInterval = parameters.pollingInterval ?? defaultPollingInterval;
    const cacheTime = parameters.cacheTime ?? pollingInterval;
    const account = parameters.account ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$parseAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseAccount"])(parameters.account) : undefined;
    const { config, request, value } = parameters.transport({
        account,
        chain,
        pollingInterval
    });
    const transport = {
        ...config,
        ...value
    };
    const client = {
        account,
        batch,
        cacheTime,
        ccipRead,
        chain,
        key,
        name,
        pollingInterval,
        request,
        transport,
        type,
        uid: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uid"])(),
        ...experimental_blockTag ? {
            experimental_blockTag
        } : {}
    };
    function extend(base) {
        return (extendFn)=>{
            const extended = extendFn(base);
            for(const key in client)delete extended[key];
            const combined = {
                ...base,
                ...extended
            };
            return Object.assign(combined, {
                extend: extend(combined)
            });
        };
    }
    return Object.assign(client, {
        extend: extend(client)
    });
}
function rpcSchema() {
    return null;
} //# sourceMappingURL=createClient.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getContractAddress",
    ()=>getContractAddress,
    "getUrl",
    ()=>getUrl
]);
const getContractAddress = (address)=>address;
const getUrl = (url)=>url; //# sourceMappingURL=utils.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/request.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpRequestError",
    ()=>HttpRequestError,
    "RpcRequestError",
    ()=>RpcRequestError,
    "SocketClosedError",
    ()=>SocketClosedError,
    "TimeoutError",
    ()=>TimeoutError,
    "WebSocketRequestError",
    ()=>WebSocketRequestError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/utils.js [app-route] (ecmascript)");
;
;
;
class HttpRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, headers, status, url }){
        super('HTTP request failed.', {
            cause,
            details,
            metaMessages: [
                status && `Status: ${status}`,
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                body && `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ].filter(Boolean),
            name: 'HttpRequestError'
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.body = body;
        this.headers = headers;
        this.status = status;
        this.url = url;
    }
}
class WebSocketRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, url }){
        super('WebSocket request failed.', {
            cause,
            details,
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                body && `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ].filter(Boolean),
            name: 'WebSocketRequestError'
        });
    }
}
class RpcRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, error, url }){
        super('RPC Request failed.', {
            cause: error,
            details: error.message,
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ],
            name: 'RpcRequestError'
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = error.code;
        this.data = error.data;
    }
}
class SocketClosedError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ url } = {}){
        super('The socket has been closed.', {
            metaMessages: [
                url && `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUrl"])(url)}`
            ].filter(Boolean),
            name: 'SocketClosedError'
        });
    }
}
class TimeoutError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, url }){
        super('The request took too long to respond.', {
            details: 'The request timed out.',
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ],
            name: 'TimeoutError'
        });
    }
} //# sourceMappingURL=request.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/transport.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UrlRequiredError",
    ()=>UrlRequiredError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
;
class UrlRequiredError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.', {
            docsPath: '/docs/clients/intro',
            name: 'UrlRequiredError'
        });
    }
} //# sourceMappingURL=transport.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withResolvers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @internal */ __turbopack_context__.s([
    "withResolvers",
    ()=>withResolvers
]);
function withResolvers() {
    let resolve = ()=>undefined;
    let reject = ()=>undefined;
    const promise = new Promise((resolve_, reject_)=>{
        resolve = resolve_;
        reject = reject_;
    });
    return {
        promise,
        resolve,
        reject
    };
} //# sourceMappingURL=withResolvers.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/createBatchScheduler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBatchScheduler",
    ()=>createBatchScheduler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withResolvers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withResolvers.js [app-route] (ecmascript)");
;
const schedulerCache = /*#__PURE__*/ new Map();
function createBatchScheduler({ fn, id, shouldSplitBatch, wait = 0, sort }) {
    const exec = async ()=>{
        const scheduler = getScheduler();
        flush();
        const args = scheduler.map(({ args })=>args);
        if (args.length === 0) return;
        fn(args).then((data)=>{
            if (sort && Array.isArray(data)) data.sort(sort);
            for(let i = 0; i < scheduler.length; i++){
                const { resolve } = scheduler[i];
                resolve?.([
                    data[i],
                    data
                ]);
            }
        }).catch((err)=>{
            for(let i = 0; i < scheduler.length; i++){
                const { reject } = scheduler[i];
                reject?.(err);
            }
        });
    };
    const flush = ()=>schedulerCache.delete(id);
    const getBatchedArgs = ()=>getScheduler().map(({ args })=>args);
    const getScheduler = ()=>schedulerCache.get(id) || [];
    const setScheduler = (item)=>schedulerCache.set(id, [
            ...getScheduler(),
            item
        ]);
    return {
        flush,
        async schedule (args) {
            const { promise, resolve, reject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withResolvers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withResolvers"])();
            const split = shouldSplitBatch?.([
                ...getBatchedArgs(),
                args
            ]);
            if (split) exec();
            const hasActiveScheduler = getScheduler().length > 0;
            if (hasActiveScheduler) {
                setScheduler({
                    args,
                    resolve,
                    reject
                });
                return promise;
            }
            setScheduler({
                args,
                resolve,
                reject
            });
            setTimeout(exec, wait);
            return promise;
        }
    };
} //# sourceMappingURL=createBatchScheduler.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withTimeout.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withTimeout",
    ()=>withTimeout
]);
function withTimeout(fn, { errorInstance = new Error('timed out'), timeout, signal }) {
    return new Promise((resolve, reject)=>{
        ;
        (async ()=>{
            let timeoutId;
            try {
                const controller = new AbortController();
                if (timeout > 0) {
                    timeoutId = setTimeout(()=>{
                        if (signal) {
                            controller.abort();
                        } else {
                            reject(errorInstance);
                        }
                    }, timeout); // need to cast because bun globals.d.ts overrides @types/node
                }
                resolve(await fn({
                    signal: controller?.signal || null
                }));
            } catch (err) {
                if (err?.name === 'AbortError') reject(errorInstance);
                reject(err);
            } finally{
                clearTimeout(timeoutId);
            }
        })();
    });
} //# sourceMappingURL=withTimeout.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/rpc/id.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "idCache",
    ()=>idCache
]);
function createIdStore() {
    return {
        current: 0,
        take () {
            return this.current++;
        },
        reset () {
            this.current = 0;
        }
    };
}
const idCache = /*#__PURE__*/ createIdStore(); //# sourceMappingURL=id.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/rpc/http.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpRpcClient",
    ()=>getHttpRpcClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/request.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withTimeout.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/rpc/id.js [app-route] (ecmascript)");
;
;
;
;
function getHttpRpcClient(url, options = {}) {
    return {
        async request (params) {
            const { body, fetchFn = options.fetchFn ?? fetch, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 10_000 } = params;
            const fetchOptions = {
                ...options.fetchOptions ?? {},
                ...params.fetchOptions ?? {}
            };
            const { headers, method, signal: signal_ } = fetchOptions;
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withTimeout"])(async ({ signal })=>{
                    const init = {
                        ...fetchOptions,
                        body: Array.isArray(body) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(body.map((body)=>({
                                jsonrpc: '2.0',
                                id: body.id ?? __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["idCache"].take(),
                                ...body
                            }))) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])({
                            jsonrpc: '2.0',
                            id: body.id ?? __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["idCache"].take(),
                            ...body
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            ...headers
                        },
                        method: method || 'POST',
                        signal: signal_ || (timeout > 0 ? signal : null)
                    };
                    const request = new Request(url, init);
                    const args = await onRequest?.(request, init) ?? {
                        ...init,
                        url
                    };
                    const response = await fetchFn(args.url ?? url, args);
                    return response;
                }, {
                    errorInstance: new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TimeoutError"]({
                        body,
                        url
                    }),
                    timeout,
                    signal: true
                });
                if (onResponse) await onResponse(response);
                let data;
                if (response.headers.get('Content-Type')?.startsWith('application/json')) data = await response.json();
                else {
                    data = await response.text();
                    try {
                        data = JSON.parse(data || '{}');
                    } catch (err) {
                        if (response.ok) throw err;
                        data = {
                            error: data
                        };
                    }
                }
                if (!response.ok) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequestError"]({
                        body,
                        details: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(data.error) || response.statusText,
                        headers: response.headers,
                        status: response.status,
                        url
                    });
                }
                return data;
            } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequestError"]) throw err;
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TimeoutError"]) throw err;
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequestError"]({
                    body,
                    cause: err,
                    url
                });
            }
        }
    };
} //# sourceMappingURL=http.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/rpc.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AtomicReadyWalletRejectedUpgradeError",
    ()=>AtomicReadyWalletRejectedUpgradeError,
    "AtomicityNotSupportedError",
    ()=>AtomicityNotSupportedError,
    "BundleTooLargeError",
    ()=>BundleTooLargeError,
    "ChainDisconnectedError",
    ()=>ChainDisconnectedError,
    "DuplicateIdError",
    ()=>DuplicateIdError,
    "InternalRpcError",
    ()=>InternalRpcError,
    "InvalidInputRpcError",
    ()=>InvalidInputRpcError,
    "InvalidParamsRpcError",
    ()=>InvalidParamsRpcError,
    "InvalidRequestRpcError",
    ()=>InvalidRequestRpcError,
    "JsonRpcVersionUnsupportedError",
    ()=>JsonRpcVersionUnsupportedError,
    "LimitExceededRpcError",
    ()=>LimitExceededRpcError,
    "MethodNotFoundRpcError",
    ()=>MethodNotFoundRpcError,
    "MethodNotSupportedRpcError",
    ()=>MethodNotSupportedRpcError,
    "ParseRpcError",
    ()=>ParseRpcError,
    "ProviderDisconnectedError",
    ()=>ProviderDisconnectedError,
    "ProviderRpcError",
    ()=>ProviderRpcError,
    "ResourceNotFoundRpcError",
    ()=>ResourceNotFoundRpcError,
    "ResourceUnavailableRpcError",
    ()=>ResourceUnavailableRpcError,
    "RpcError",
    ()=>RpcError,
    "SwitchChainError",
    ()=>SwitchChainError,
    "TransactionRejectedRpcError",
    ()=>TransactionRejectedRpcError,
    "UnauthorizedProviderError",
    ()=>UnauthorizedProviderError,
    "UnknownBundleIdError",
    ()=>UnknownBundleIdError,
    "UnknownRpcError",
    ()=>UnknownRpcError,
    "UnsupportedChainIdError",
    ()=>UnsupportedChainIdError,
    "UnsupportedNonOptionalCapabilityError",
    ()=>UnsupportedNonOptionalCapabilityError,
    "UnsupportedProviderMethodError",
    ()=>UnsupportedProviderMethodError,
    "UserRejectedRequestError",
    ()=>UserRejectedRequestError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/request.js [app-route] (ecmascript)");
;
;
const unknownErrorCode = -1;
class RpcError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(cause, { code, docsPath, metaMessages, name, shortMessage }){
        super(shortMessage, {
            cause,
            docsPath,
            metaMessages: metaMessages || cause?.metaMessages,
            name: name || 'RpcError'
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name || cause.name;
        this.code = cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RpcRequestError"] ? cause.code : code ?? unknownErrorCode;
    }
}
class ProviderRpcError extends RpcError {
    constructor(cause, options){
        super(cause, options);
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = options.data;
    }
}
class ParseRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ParseRpcError.code,
            name: 'ParseRpcError',
            shortMessage: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'
        });
    }
}
Object.defineProperty(ParseRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32700
});
class InvalidRequestRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidRequestRpcError.code,
            name: 'InvalidRequestRpcError',
            shortMessage: 'JSON is not a valid request object.'
        });
    }
}
Object.defineProperty(InvalidRequestRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32600
});
class MethodNotFoundRpcError extends RpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: MethodNotFoundRpcError.code,
            name: 'MethodNotFoundRpcError',
            shortMessage: `The method${method ? ` "${method}"` : ''} does not exist / is not available.`
        });
    }
}
Object.defineProperty(MethodNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32601
});
class InvalidParamsRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidParamsRpcError.code,
            name: 'InvalidParamsRpcError',
            shortMessage: [
                'Invalid parameters were provided to the RPC method.',
                'Double check you have provided the correct parameters.'
            ].join('\n')
        });
    }
}
Object.defineProperty(InvalidParamsRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
});
class InternalRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InternalRpcError.code,
            name: 'InternalRpcError',
            shortMessage: 'An internal error was received.'
        });
    }
}
Object.defineProperty(InternalRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32603
});
class InvalidInputRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidInputRpcError.code,
            name: 'InvalidInputRpcError',
            shortMessage: [
                'Missing or invalid parameters.',
                'Double check you have provided the correct parameters.'
            ].join('\n')
        });
    }
}
Object.defineProperty(InvalidInputRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32000
});
class ResourceNotFoundRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ResourceNotFoundRpcError.code,
            name: 'ResourceNotFoundRpcError',
            shortMessage: 'Requested resource not found.'
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ResourceNotFoundRpcError'
        });
    }
}
Object.defineProperty(ResourceNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32001
});
class ResourceUnavailableRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ResourceUnavailableRpcError.code,
            name: 'ResourceUnavailableRpcError',
            shortMessage: 'Requested resource not available.'
        });
    }
}
Object.defineProperty(ResourceUnavailableRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32002
});
class TransactionRejectedRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: TransactionRejectedRpcError.code,
            name: 'TransactionRejectedRpcError',
            shortMessage: 'Transaction creation failed.'
        });
    }
}
Object.defineProperty(TransactionRejectedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32003
});
class MethodNotSupportedRpcError extends RpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: MethodNotSupportedRpcError.code,
            name: 'MethodNotSupportedRpcError',
            shortMessage: `Method${method ? ` "${method}"` : ''} is not supported.`
        });
    }
}
Object.defineProperty(MethodNotSupportedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32004
});
class LimitExceededRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: LimitExceededRpcError.code,
            name: 'LimitExceededRpcError',
            shortMessage: 'Request exceeds defined limit.'
        });
    }
}
Object.defineProperty(LimitExceededRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32005
});
class JsonRpcVersionUnsupportedError extends RpcError {
    constructor(cause){
        super(cause, {
            code: JsonRpcVersionUnsupportedError.code,
            name: 'JsonRpcVersionUnsupportedError',
            shortMessage: 'Version of JSON-RPC protocol is not supported.'
        });
    }
}
Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32006
});
class UserRejectedRequestError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UserRejectedRequestError.code,
            name: 'UserRejectedRequestError',
            shortMessage: 'User rejected the request.'
        });
    }
}
Object.defineProperty(UserRejectedRequestError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4001
});
class UnauthorizedProviderError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnauthorizedProviderError.code,
            name: 'UnauthorizedProviderError',
            shortMessage: 'The requested method and/or account has not been authorized by the user.'
        });
    }
}
Object.defineProperty(UnauthorizedProviderError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4100
});
class UnsupportedProviderMethodError extends ProviderRpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: UnsupportedProviderMethodError.code,
            name: 'UnsupportedProviderMethodError',
            shortMessage: `The Provider does not support the requested method${method ? ` " ${method}"` : ''}.`
        });
    }
}
Object.defineProperty(UnsupportedProviderMethodError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4200
});
class ProviderDisconnectedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ProviderDisconnectedError.code,
            name: 'ProviderDisconnectedError',
            shortMessage: 'The Provider is disconnected from all chains.'
        });
    }
}
Object.defineProperty(ProviderDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4900
});
class ChainDisconnectedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ChainDisconnectedError.code,
            name: 'ChainDisconnectedError',
            shortMessage: 'The Provider is not connected to the requested chain.'
        });
    }
}
Object.defineProperty(ChainDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4901
});
class SwitchChainError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: SwitchChainError.code,
            name: 'SwitchChainError',
            shortMessage: 'An error occurred when attempting to switch chain.'
        });
    }
}
Object.defineProperty(SwitchChainError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4902
});
class UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnsupportedNonOptionalCapabilityError.code,
            name: 'UnsupportedNonOptionalCapabilityError',
            shortMessage: 'This Wallet does not support a capability that was not marked as optional.'
        });
    }
}
Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5700
});
class UnsupportedChainIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnsupportedChainIdError.code,
            name: 'UnsupportedChainIdError',
            shortMessage: 'This Wallet does not support the requested chain ID.'
        });
    }
}
Object.defineProperty(UnsupportedChainIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5710
});
class DuplicateIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: DuplicateIdError.code,
            name: 'DuplicateIdError',
            shortMessage: 'There is already a bundle submitted with this ID.'
        });
    }
}
Object.defineProperty(DuplicateIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5720
});
class UnknownBundleIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnknownBundleIdError.code,
            name: 'UnknownBundleIdError',
            shortMessage: 'This bundle id is unknown / has not been submitted'
        });
    }
}
Object.defineProperty(UnknownBundleIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5730
});
class BundleTooLargeError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: BundleTooLargeError.code,
            name: 'BundleTooLargeError',
            shortMessage: 'The call bundle is too large for the Wallet to process.'
        });
    }
}
Object.defineProperty(BundleTooLargeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5740
});
class AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: AtomicReadyWalletRejectedUpgradeError.code,
            name: 'AtomicReadyWalletRejectedUpgradeError',
            shortMessage: 'The Wallet can support atomicity after an upgrade, but the user rejected the upgrade.'
        });
    }
}
Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5750
});
class AtomicityNotSupportedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: AtomicityNotSupportedError.code,
            name: 'AtomicityNotSupportedError',
            shortMessage: 'The wallet does not support atomic execution but the request requires it.'
        });
    }
}
Object.defineProperty(AtomicityNotSupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5760
});
class UnknownRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            name: 'UnknownRpcError',
            shortMessage: 'An unknown RPC error occurred.'
        });
    }
} //# sourceMappingURL=rpc.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withDedupe.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "promiseCache",
    ()=>promiseCache,
    "withDedupe",
    ()=>withDedupe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/lru.js [app-route] (ecmascript)");
;
const promiseCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LruMap"](8192);
function withDedupe(fn, { enabled = true, id }) {
    if (!enabled || !id) return fn();
    if (promiseCache.get(id)) return promiseCache.get(id);
    const promise = fn().finally(()=>promiseCache.delete(id));
    promiseCache.set(id, promise);
    return promise;
} //# sourceMappingURL=withDedupe.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/wait.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wait",
    ()=>wait
]);
async function wait(time) {
    return new Promise((res)=>setTimeout(res, time));
} //# sourceMappingURL=wait.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withRetry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withRetry",
    ()=>withRetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$wait$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/wait.js [app-route] (ecmascript)");
;
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry = ()=>true } = {}) {
    return new Promise((resolve, reject)=>{
        const attemptRetry = async ({ count = 0 } = {})=>{
            const retry = async ({ error })=>{
                const delay = typeof delay_ === 'function' ? delay_({
                    count,
                    error
                }) : delay_;
                if (delay) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$wait$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wait"])(delay);
                attemptRetry({
                    count: count + 1
                });
            };
            try {
                const data = await fn();
                resolve(data);
            } catch (err) {
                if (count < retryCount && await shouldRetry({
                    count,
                    error: err
                })) return retry({
                    error: err
                });
                reject(err);
            }
        };
        attemptRetry();
    });
} //# sourceMappingURL=withRetry.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/buildRequest.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildRequest",
    ()=>buildRequest,
    "shouldRetry",
    ()=>shouldRetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/request.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/rpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withDedupe$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withDedupe.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/withRetry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/stringify.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
function buildRequest(request, options = {}) {
    return async (args, overrideOptions = {})=>{
        const { dedupe = false, methods, retryDelay = 150, retryCount = 3, uid } = {
            ...options,
            ...overrideOptions
        };
        const { method } = args;
        if (methods?.exclude?.includes(method)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"](new Error('method not supported'), {
            method
        });
        if (methods?.include && !methods.include.includes(method)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"](new Error('method not supported'), {
            method
        });
        const requestId = dedupe ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringToHex"])(`${uid}.${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(args)}`) : undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withDedupe$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withDedupe"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withRetry"])(async ()=>{
                try {
                    return await request(args);
                } catch (err_) {
                    const err = err_;
                    switch(err.code){
                        // -32700
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseRpcError"](err);
                        // -32600
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidRequestRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidRequestRpcError"](err);
                        // -32601
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MethodNotFoundRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MethodNotFoundRpcError"](err, {
                                method: args.method
                            });
                        // -32602
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidParamsRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidParamsRpcError"](err);
                        // -32603
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalRpcError"](err);
                        // -32000
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputRpcError"](err);
                        // -32001
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotFoundRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotFoundRpcError"](err);
                        // -32002
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"](err);
                        // -32003
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TransactionRejectedRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TransactionRejectedRpcError"](err);
                        // -32004
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"](err, {
                                method: args.method
                            });
                        // -32005
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LimitExceededRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LimitExceededRpcError"](err);
                        // -32006
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JsonRpcVersionUnsupportedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JsonRpcVersionUnsupportedError"](err);
                        // 4001
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
                        // 4100
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnauthorizedProviderError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnauthorizedProviderError"](err);
                        // 4200
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedProviderMethodError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedProviderMethodError"](err);
                        // 4900
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProviderDisconnectedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProviderDisconnectedError"](err);
                        // 4901
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ChainDisconnectedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ChainDisconnectedError"](err);
                        // 4902
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchChainError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchChainError"](err);
                        // 5700
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedNonOptionalCapabilityError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedNonOptionalCapabilityError"](err);
                        // 5710
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedChainIdError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedChainIdError"](err);
                        // 5720
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DuplicateIdError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DuplicateIdError"](err);
                        // 5730
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnknownBundleIdError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnknownBundleIdError"](err);
                        // 5740
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BundleTooLargeError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BundleTooLargeError"](err);
                        // 5750
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AtomicReadyWalletRejectedUpgradeError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AtomicReadyWalletRejectedUpgradeError"](err);
                        // 5760
                        case __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AtomicityNotSupportedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AtomicityNotSupportedError"](err);
                        // CAIP-25: User Rejected Error
                        // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
                        case 5000:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
                        default:
                            if (err_ instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseError"]) throw err_;
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnknownRpcError"](err);
                    }
                }
            }, {
                delay: ({ count, error })=>{
                    // If we find a Retry-After header, let's retry after the given time.
                    if (error && error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequestError"]) {
                        const retryAfter = error?.headers?.get('Retry-After');
                        if (retryAfter?.match(/\d/)) return Number.parseInt(retryAfter, 10) * 1000;
                    }
                    // Otherwise, let's retry with an exponential backoff.
                    return ~~(1 << count) * retryDelay;
                },
                retryCount,
                shouldRetry: ({ error })=>shouldRetry(error)
            }), {
            enabled: dedupe,
            id: requestId
        });
    };
}
function shouldRetry(error) {
    if ('code' in error && typeof error.code === 'number') {
        if (error.code === -1) return true; // Unknown error
        if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LimitExceededRpcError"].code) return true;
        if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalRpcError"].code) return true;
        return false;
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequestError"] && error.status) {
        // Forbidden
        if (error.status === 403) return true;
        // Request Timeout
        if (error.status === 408) return true;
        // Request Entity Too Large
        if (error.status === 413) return true;
        // Too Many Requests
        if (error.status === 429) return true;
        // Internal Server Error
        if (error.status === 500) return true;
        // Bad Gateway
        if (error.status === 502) return true;
        // Service Unavailable
        if (error.status === 503) return true;
        // Gateway Timeout
        if (error.status === 504) return true;
        return false;
    }
    return true;
} //# sourceMappingURL=buildRequest.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/clients/transports/createTransport.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTransport",
    ()=>createTransport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$buildRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/buildRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/uid.js [app-route] (ecmascript)");
;
;
function createTransport({ key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uid"])();
    return {
        config: {
            key,
            methods,
            name,
            request,
            retryCount,
            retryDelay,
            timeout,
            type
        },
        request: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$buildRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildRequest"])(request, {
            methods,
            retryCount,
            retryDelay,
            uid
        }),
        value
    };
} //# sourceMappingURL=createTransport.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/clients/transports/http.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "http",
    ()=>http
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/request.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$transport$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/transport.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$createBatchScheduler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/promise/createBatchScheduler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/rpc/http.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$createTransport$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/clients/transports/createTransport.js [app-route] (ecmascript)");
;
;
;
;
;
function http(/** URL of the JSON-RPC API. Defaults to the chain's public RPC URL. */ url, config = {}) {
    const { batch, fetchFn, fetchOptions, key = 'http', methods, name = 'HTTP JSON-RPC', onFetchRequest, onFetchResponse, retryDelay, raw } = config;
    return ({ chain, retryCount: retryCount_, timeout: timeout_ })=>{
        const { batchSize = 1000, wait = 0 } = typeof batch === 'object' ? batch : {};
        const retryCount = config.retryCount ?? retryCount_;
        const timeout = timeout_ ?? config.timeout ?? 10_000;
        const url_ = url || chain?.rpcUrls.default.http[0];
        if (!url_) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$transport$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UrlRequiredError"]();
        const rpcClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpRpcClient"])(url_, {
            fetchFn,
            fetchOptions,
            onRequest: onFetchRequest,
            onResponse: onFetchResponse,
            timeout
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$createTransport$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTransport"])({
            key,
            methods,
            name,
            async request ({ method, params }) {
                const body = {
                    method,
                    params
                };
                const { schedule } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$createBatchScheduler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBatchScheduler"])({
                    id: url_,
                    wait,
                    shouldSplitBatch (requests) {
                        return requests.length > batchSize;
                    },
                    fn: (body)=>rpcClient.request({
                            body
                        }),
                    sort: (a, b)=>a.id - b.id
                });
                const fn = async (body)=>batch ? schedule(body) : [
                        await rpcClient.request({
                            body
                        })
                    ];
                const [{ error, result }] = await fn(body);
                if (raw) return {
                    error,
                    result
                };
                if (error) throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RpcRequestError"]({
                    body,
                    error,
                    url: url_
                });
                return result;
            },
            retryCount,
            retryDelay,
            timeout,
            type: 'http'
        }, {
            fetchOptions,
            url: url_
        });
    };
} //# sourceMappingURL=http.js.map
}),
];

//# sourceMappingURL=a6501_viem__esm_065b491d._.js.map