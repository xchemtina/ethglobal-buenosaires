module.exports = [
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/erc20.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "erc20WithPermit",
    ()=>erc20WithPermit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/constants/abis.js [app-route] (ecmascript)");
;
;
const erc20WithPermit = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["erc20Abi"],
    ...[
        {
            type: 'function',
            stateMutability: 'view',
            name: 'nonces',
            inputs: [
                {
                    name: 'owner',
                    type: 'address'
                }
            ],
            outputs: [
                {
                    name: '',
                    type: 'uint256'
                }
            ]
        },
        {
            type: 'function',
            stateMutability: 'view',
            name: 'version',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'string'
                }
            ]
        }
    ]
]; //# sourceMappingURL=erc20.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "errorsAbi",
    ()=>errorsAbi,
    "errorsAddress",
    ()=>errorsAddress,
    "errorsConfig",
    ()=>errorsConfig,
    "filecoinPayV1Abi",
    ()=>filecoinPayV1Abi,
    "filecoinPayV1Address",
    ()=>filecoinPayV1Address,
    "filecoinPayV1Config",
    ()=>filecoinPayV1Config,
    "filecoinWarmStorageServiceAbi",
    ()=>filecoinWarmStorageServiceAbi,
    "filecoinWarmStorageServiceAddress",
    ()=>filecoinWarmStorageServiceAddress,
    "filecoinWarmStorageServiceConfig",
    ()=>filecoinWarmStorageServiceConfig,
    "filecoinWarmStorageServiceStateViewAbi",
    ()=>filecoinWarmStorageServiceStateViewAbi,
    "filecoinWarmStorageServiceStateViewAddress",
    ()=>filecoinWarmStorageServiceStateViewAddress,
    "filecoinWarmStorageServiceStateViewConfig",
    ()=>filecoinWarmStorageServiceStateViewConfig,
    "pdpVerifierAbi",
    ()=>pdpVerifierAbi,
    "pdpVerifierAddress",
    ()=>pdpVerifierAddress,
    "pdpVerifierConfig",
    ()=>pdpVerifierConfig,
    "serviceProviderRegistryAbi",
    ()=>serviceProviderRegistryAbi,
    "serviceProviderRegistryAddress",
    ()=>serviceProviderRegistryAddress,
    "serviceProviderRegistryConfig",
    ()=>serviceProviderRegistryConfig,
    "sessionKeyRegistryAbi",
    ()=>sessionKeyRegistryAbi,
    "sessionKeyRegistryAddress",
    ()=>sessionKeyRegistryAddress,
    "sessionKeyRegistryConfig",
    ()=>sessionKeyRegistryConfig
]);
const errorsAbi = [
    {
        type: 'error',
        inputs: [
            {
                name: 'field',
                internalType: 'enum Errors.AddressField',
                type: 'uint8'
            }
        ],
        name: 'AddressAlreadySet'
    },
    {
        type: 'error',
        inputs: [],
        name: 'AtLeastOnePriceMustBeNonZero'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CDNPaymentAlreadyTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CacheMissPaymentAlreadyTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'expectedPayer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'caller',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'CallerNotPayer'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'expectedPayer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'expectedPayee',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'caller',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'CallerNotPayerOrPayee'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'CallerNotPayments'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'windowStart',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nowBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ChallengeWindowTooEarly'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'clientDataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ClientDataSetAlreadyRegistered'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'commissionType',
                internalType: 'enum Errors.CommissionType',
                type: 'uint8'
            },
            {
                name: 'max',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CommissionExceedsMaximum'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetNotFoundForRail'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetNotRegistered'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetPaymentAlreadyTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pdpEndEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'currentBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetPaymentBeyondEndEpoch'
    },
    {
        type: 'error',
        inputs: [],
        name: 'DivisionByZero'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'key',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'DuplicateMetadataKey'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ExtraDataRequired'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'actualSize',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowedSize',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ExtraDataTooLarge'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'FilBeamServiceNotConfigured'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'InsufficientCapabilitiesForProduct'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'minimumRequired',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'available',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientFundsForMinimumRate'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'lockupAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupUsage',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minimumLockupRequired',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientLockupAllowance'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'maxLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'requiredLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientMaxLockupPeriod'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'rateAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'rateUsage',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minimumRateRequired',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientRateAllowance'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minExpected',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidChallengeCount'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidChallengeEpoch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'maxProvingPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'challengeWindowSize',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidChallengeWindowSize'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidDataSetId'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'fromEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'toEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidEpochRange'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidServiceDescriptionLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidServiceNameLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'InvalidSignature'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expectedLength',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actualLength',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidSignatureLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidTopUpAmount'
    },
    {
        type: 'error',
        inputs: [],
        name: 'MaxProvingPeriodZero'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'metadataArrayCount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceCount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataArrayCountMismatch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'keysLength',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'valuesLength',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataKeyAndValueLengthMismatch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'index',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataKeyExceedsMaxLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'index',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataValueExceedsMaxLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'periodDeadline',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nowBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'NextProvingPeriodAlreadyCalled'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'NoPDPPaymentRail'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OldServiceProviderMismatch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OnlyFilBeamControllerAllowed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OnlyPDPVerifierAllowed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OnlySelf'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OperatorNotApproved'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pdpEndEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'PaymentRailsNotFinalized'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'priceType',
                internalType: 'enum Errors.PriceType',
                type: 'uint8'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'PriceExceedsMaximum'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProofAlreadySubmitted'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProviderAlreadyApproved'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProviderNotInApprovedList'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'provider',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'ProviderNotRegistered'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProvingNotStarted'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProvingPeriodNotInitialized'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'deadline',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nowBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProvingPeriodPassed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'RailNotAssociated'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ServiceContractMustTerminateRail'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'keysLength',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'TooManyMetadataKeys'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'v',
                internalType: 'uint8',
                type: 'uint8'
            }
        ],
        name: 'UnsupportedSignatureV'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'field',
                internalType: 'enum Errors.AddressField',
                type: 'uint8'
            }
        ],
        name: 'ZeroAddress'
    }
];
const errorsAddress = {
    314: '0x0000000000000000000000000000000000000000',
    314159: '0x0000000000000000000000000000000000000000'
};
const errorsConfig = {
    address: errorsAddress,
    abi: errorsAbi
};
const filecoinPayV1Abi = [
    {
        type: 'constructor',
        inputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'COMMISSION_MAX_BPS',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'NETWORK_FEE_DENOMINATOR',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'NETWORK_FEE_NUMERATOR',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'owner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'accounts',
        outputs: [
            {
                name: 'funds',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupCurrent',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupRate',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupLastSettledAt',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            }
        ],
        name: 'auctionInfo',
        outputs: [
            {
                name: 'startPrice',
                internalType: 'uint88',
                type: 'uint88'
            },
            {
                name: 'startTime',
                internalType: 'uint168',
                type: 'uint168'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'recipient',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'requested',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'burnForFees',
        outputs: [],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'validator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'commissionRateBps',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'serviceFeeRecipient',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'createRail',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC3009',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'validAfter',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'validBefore',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nonce',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'v',
                internalType: 'uint8',
                type: 'uint8'
            },
            {
                name: 'r',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 's',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        name: 'depositWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC3009',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'validAfter',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'validBefore',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nonce',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'v',
                internalType: 'uint8',
                type: 'uint8'
            },
            {
                name: 'r',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 's',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'rateAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'depositWithAuthorizationAndApproveOperator',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC3009',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'validAfter',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'validBefore',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nonce',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'v',
                internalType: 'uint8',
                type: 'uint8'
            },
            {
                name: 'r',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 's',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'rateAllowanceIncrease',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupAllowanceIncrease',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'depositWithAuthorizationAndIncreaseOperatorApproval',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'deadline',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'v',
                internalType: 'uint8',
                type: 'uint8'
            },
            {
                name: 'r',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 's',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        name: 'depositWithPermit',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'deadline',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'v',
                internalType: 'uint8',
                type: 'uint8'
            },
            {
                name: 'r',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 's',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'rateAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'depositWithPermitAndApproveOperator',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'deadline',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'v',
                internalType: 'uint8',
                type: 'uint8'
            },
            {
                name: 'r',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 's',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'rateAllowanceIncrease',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupAllowanceIncrease',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'depositWithPermitAndIncreaseOperatorApproval',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'owner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'getAccountInfoIfSettled',
        outputs: [
            {
                name: 'fundedUntilEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'currentFunds',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'availableFunds',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'currentLockupRate',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getRail',
        outputs: [
            {
                name: '',
                internalType: 'struct FilecoinPayV1.RailView',
                type: 'tuple',
                components: [
                    {
                        name: 'token',
                        internalType: 'contract IERC20',
                        type: 'address'
                    },
                    {
                        name: 'from',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'to',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'operator',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'validator',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'paymentRate',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'lockupPeriod',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'lockupFixed',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'settledUpTo',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'endEpoch',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'commissionRateBps',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'serviceFeeRecipient',
                        internalType: 'address',
                        type: 'address'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'payee',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'offset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'limit',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getRailsForPayeeAndToken',
        outputs: [
            {
                name: 'results',
                internalType: 'struct FilecoinPayV1.RailInfo[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'railId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'isTerminated',
                        internalType: 'bool',
                        type: 'bool'
                    },
                    {
                        name: 'endEpoch',
                        internalType: 'uint256',
                        type: 'uint256'
                    }
                ]
            },
            {
                name: 'nextOffset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'total',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'offset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'limit',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getRailsForPayerAndToken',
        outputs: [
            {
                name: 'results',
                internalType: 'struct FilecoinPayV1.RailInfo[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'railId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'isTerminated',
                        internalType: 'bool',
                        type: 'bool'
                    },
                    {
                        name: 'endEpoch',
                        internalType: 'uint256',
                        type: 'uint256'
                    }
                ]
            },
            {
                name: 'nextOffset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'total',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getRateChangeQueueSize',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'rateAllowanceIncrease',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupAllowanceIncrease',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'increaseOperatorApproval',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'period',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupFixed',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'modifyRailLockup',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'newRate',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'oneTimePayment',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'modifyRailPayment',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'client',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'operatorApprovals',
        outputs: [
            {
                name: 'isApproved',
                internalType: 'bool',
                type: 'bool'
            },
            {
                name: 'rateAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'rateUsage',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupUsage',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'approved',
                internalType: 'bool',
                type: 'bool'
            },
            {
                name: 'rateAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'setOperatorApproval',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'untilEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'settleRail',
        outputs: [
            {
                name: 'totalSettledAmount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'totalNetPayeeAmount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'totalOperatorCommission',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'totalNetworkFee',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'finalSettledEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'note',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'settleTerminatedRailWithoutValidation',
        outputs: [
            {
                name: 'totalSettledAmount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'totalNetPayeeAmount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'totalOperatorCommission',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'totalNetworkFee',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'finalSettledEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'note',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'terminateRail',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'withdrawTo',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address',
                indexed: true
            },
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'lockupCurrent',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'lockupRate',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'lockupLastSettledAt',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'AccountLockupSettled'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address',
                indexed: true
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'DepositRecorded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address',
                indexed: true
            },
            {
                name: 'client',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'approved',
                internalType: 'bool',
                type: 'bool',
                indexed: false
            },
            {
                name: 'rateAllowance',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'lockupAllowance',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'maxLockupPeriod',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'OperatorApprovalUpdated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'payer',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'payee',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address',
                indexed: false
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'validator',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'serviceFeeRecipient',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'commissionRateBps',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'RailCreated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            }
        ],
        name: 'RailFinalized'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'oldLockupPeriod',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'newLockupPeriod',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'oldLockupFixed',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'newLockupFixed',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'RailLockupModified'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'netPayeeAmount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'operatorCommission',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'networkFee',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'RailOneTimePaymentProcessed'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'oldRate',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'newRate',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'RailRateModified'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'totalSettledAmount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'totalNetPayeeAmount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'operatorCommission',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'networkFee',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'settledUpTo',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'RailSettled'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'by',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'endEpoch',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'RailTerminated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address',
                indexed: true
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'WithdrawRecorded'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxSettlementEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'blockNumber',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CannotModifyTerminatedRailBeyondEndEpoch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowedEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CannotSettleFutureEpochs'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'requiredBlock',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'currentBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CannotSettleTerminatedRailBeforeMaxEpoch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CommissionRateTooHigh'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'oldLockup',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'currentLockup',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CurrentLockupLessThanOldLockup'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'currentLockup',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupReduction',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientCurrentLockup'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'required',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientFundsForOneTimePayment'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'available',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'required',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientFundsForSettlement'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'available',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'required',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientLockupForSettlement'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'required',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'sent',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientNativeTokenForBurn'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'available',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'requested',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientUnlockedFunds'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'nextRateChangeUntilEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'processedEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidRateChangeQueueState'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'actualPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actualLockupFixed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedLockupFixed',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidTerminatedRailModification'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'account',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'lockupCurrent',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'fundsCurrent',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupExceedsFundsInvariant'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actualLockupFixed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedLockupFixed',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupFixedIncreaseNotAllowedDueToInsufficientFunds'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'expectedLockup',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actualLockup',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupInconsistencyDuringRailFinalization'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'isSettled',
                internalType: 'bool',
                type: 'bool'
            },
            {
                name: 'currentRate',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedRate',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupNotSettledRateChangeNotAllowed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actualLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupPeriodChangeNotAllowedDueToInsufficientFunds'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'maxAllowedPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'requestedPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupPeriodExceedsOperatorMaximum'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'paymentRate',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupRate',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupRateInconsistent'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'lockupRate',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'oldRate',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'LockupRateLessThanOldRate'
    },
    {
        type: 'error',
        inputs: [],
        name: 'MissingServiceFeeRecipient'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'required',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'sent',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MustSendExactNativeAmount'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'sent',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'NativeTokenNotAccepted'
    },
    {
        type: 'error',
        inputs: [],
        name: 'NativeTokenNotSupported'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'to',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'amount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'NativeTransferFailed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'expectedSettledUpTo',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actualSettledUpTo',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'NoProgressInSettlement'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'allowedClient',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'allowedOperator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'caller',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'NotAuthorizedToTerminateRail'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'available',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'required',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'OneTimePaymentExceedsLockup'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'caller',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OnlyRailClientAllowed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'caller',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OnlyRailOperatorAllowed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'allowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedUsage',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'OperatorLockupAllowanceExceeded'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OperatorNotApproved'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'allowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedUsage',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'OperatorRateAllowanceExceeded'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'x',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'y',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'denominator',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'PRBMath_MulDiv_Overflow'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'x',
                internalType: 'UD60x18',
                type: 'uint256'
            }
        ],
        name: 'PRBMath_UD60x18_Exp2_InputTooBig'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'RailAlreadyTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'RailInactiveOrSettled'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'RailNotTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'RateChangeNotAllowedOnTerminatedRail'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'nextUntilEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'RateChangeQueueNotEmpty'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ReentrancyGuardReentrantCall'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'SafeERC20FailedOperation'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'SignerMustBeMsgSender'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attempted',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ValidatorModifiedAmountExceedsMaximum'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'allowedStart',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedStart',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ValidatorSettledBeforeSegmentStart'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'allowedEnd',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'attemptedEnd',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ValidatorSettledBeyondSegmentEnd'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'token',
                internalType: 'contract IERC20',
                type: 'address'
            },
            {
                name: 'available',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'requested',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'WithdrawAmountExceedsAccumulatedFees'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'varName',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'ZeroAddressNotAllowed'
    }
];
const filecoinPayV1Address = {
    314: '0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa',
    314159: '0x09a0fDc2723fAd1A7b8e3e00eE5DF73841df55a0'
};
const filecoinPayV1Config = {
    address: filecoinPayV1Address,
    abi: filecoinPayV1Abi
};
const filecoinWarmStorageServiceAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_pdpVerifierAddress',
                internalType: 'address',
                type: 'address'
            },
            {
                name: '_paymentsContractAddress',
                internalType: 'address',
                type: 'address'
            },
            {
                name: '_usdfc',
                internalType: 'contract IERC20Metadata',
                type: 'address'
            },
            {
                name: '_filBeamBeneficiaryAddress',
                internalType: 'address',
                type: 'address'
            },
            {
                name: '_serviceProviderRegistry',
                internalType: 'contract ServiceProviderRegistry',
                type: 'address'
            },
            {
                name: '_sessionKeyRegistry',
                internalType: 'contract SessionKeyRegistry',
                type: 'address'
            }
        ],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'UPGRADE_INTERFACE_VERSION',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'VERSION',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'addApprovedProvider',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'plannedUpgrade',
                internalType: 'struct FilecoinWarmStorageService.PlannedUpgrade',
                type: 'tuple',
                components: [
                    {
                        name: 'nextImplementation',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'afterEpoch',
                        internalType: 'uint96',
                        type: 'uint96'
                    }
                ]
            }
        ],
        name: 'announcePlannedUpgrade',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'totalBytes',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'calculateRatePerEpoch',
        outputs: [
            {
                name: 'storageRate',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_maxProvingPeriod',
                internalType: 'uint64',
                type: 'uint64'
            },
            {
                name: '_challengeWindowSize',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'configureProvingPeriod',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'serviceProvider',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'dataSetCreated',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'dataSetDeleted',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'eip712Domain',
        outputs: [
            {
                name: 'fields',
                internalType: 'bytes1',
                type: 'bytes1'
            },
            {
                name: 'name',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'version',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'chainId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'verifyingContract',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'salt',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'extensions',
                internalType: 'uint256[]',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'slot',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        name: 'extsload',
        outputs: [
            {
                name: '',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'slot',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'size',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'extsloadStruct',
        outputs: [
            {
                name: '',
                internalType: 'bytes32[]',
                type: 'bytes32[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'filBeamBeneficiaryAddress',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getEffectiveRates',
        outputs: [
            {
                name: 'serviceFee',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'spPayment',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'epoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getProvingPeriodForEpoch',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getServicePrice',
        outputs: [
            {
                name: 'pricing',
                internalType: 'struct FilecoinWarmStorageService.ServicePricing',
                type: 'tuple',
                components: [
                    {
                        name: 'pricePerTiBPerMonthNoCDN',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'pricePerTiBCdnEgress',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'pricePerTiBCacheMissEgress',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'tokenAddress',
                        internalType: 'contract IERC20',
                        type: 'address'
                    },
                    {
                        name: 'epochsPerMonth',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'minimumPricePerMonth',
                        internalType: 'uint256',
                        type: 'uint256'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_maxProvingPeriod',
                internalType: 'uint64',
                type: 'uint64'
            },
            {
                name: '_challengeWindowSize',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '_filBeamControllerAddress',
                internalType: 'address',
                type: 'address'
            },
            {
                name: '_name',
                internalType: 'string',
                type: 'string'
            },
            {
                name: '_description',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_viewContract',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'migrate',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'challengeEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'leafCount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'nextProvingPeriod',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'paymentsContractAddress',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'pdpVerifierAddress',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'firstAdded',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceData',
                internalType: 'struct Cids.Cid[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'data',
                        internalType: 'bytes',
                        type: 'bytes'
                    }
                ]
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'piecesAdded',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceIds',
                internalType: 'uint256[]',
                type: 'uint256[]'
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'piecesScheduledRemove',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'challengeCount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'possessionProven',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'proxiableUUID',
        outputs: [
            {
                name: '',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'terminator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'endEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'railTerminated',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'index',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'removeApprovedProvider',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'serviceProviderRegistry',
        outputs: [
            {
                name: '',
                internalType: 'contract ServiceProviderRegistry',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'sessionKeyRegistry',
        outputs: [
            {
                name: '',
                internalType: 'contract SessionKeyRegistry',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_viewContract',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'setViewContract',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'cdnAmount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'cacheMissAmount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'settleFilBeamPaymentRails',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '',
                internalType: 'address',
                type: 'address'
            },
            {
                name: '',
                internalType: 'address',
                type: 'address'
            },
            {
                name: '',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'storageProviderChanged',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'terminateCDNService',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'terminateService',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'cdnAmountToAdd',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'cacheMissAmountToAdd',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'topUpCDNPaymentRails',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newController',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'transferFilBeamController',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newStoragePrice',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'newMinimumRate',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'updatePricing',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newCommissionBps',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'updateServiceCommission',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newImplementation',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'data',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'upgradeToAndCall',
        outputs: [],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'usdfcTokenAddress',
        outputs: [
            {
                name: '',
                internalType: 'contract IERC20Metadata',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'proposedAmount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'fromEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'toEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'validatePayment',
        outputs: [
            {
                name: 'result',
                internalType: 'struct IValidator.ValidationResult',
                type: 'tuple',
                components: [
                    {
                        name: 'modifiedAmount',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'settleUpto',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'note',
                        internalType: 'string',
                        type: 'string'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'viewContractAddress',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'cdnAmountAdded',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'totalCdnLockup',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cacheMissAmountAdded',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'totalCacheMissLockup',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'CDNPaymentRailsToppedUp'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'endEpoch',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cacheMissRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cdnRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'CDNPaymentTerminated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'caller',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'cacheMissRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cdnRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'CDNServiceTerminated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'version',
                internalType: 'string',
                type: 'string',
                indexed: false
            },
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
                indexed: false
            }
        ],
        name: 'ContractUpgraded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'pdpRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cacheMissRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cdnRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'payer',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'serviceProvider',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'payee',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'metadataKeys',
                internalType: 'string[]',
                type: 'string[]',
                indexed: false
            },
            {
                name: 'metadataValues',
                internalType: 'string[]',
                type: 'string[]',
                indexed: false
            }
        ],
        name: 'DataSetCreated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'oldServiceProvider',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'newServiceProvider',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'DataSetServiceProviderChanged'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [],
        name: 'EIP712DomainChanged'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'periodsFaulted',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'deadline',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'FaultRecord'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'oldController',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'newController',
                internalType: 'address',
                type: 'address',
                indexed: false
            }
        ],
        name: 'FilBeamControllerChanged'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'name',
                internalType: 'string',
                type: 'string',
                indexed: false
            },
            {
                name: 'description',
                internalType: 'string',
                type: 'string',
                indexed: false
            }
        ],
        name: 'FilecoinServiceDeployed'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'version',
                internalType: 'uint64',
                type: 'uint64',
                indexed: false
            }
        ],
        name: 'Initialized'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'previousOwner',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'OwnershipTransferred'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'endEpoch',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'pdpRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'PDPPaymentTerminated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'pieceId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'pieceCid',
                internalType: 'struct Cids.Cid',
                type: 'tuple',
                components: [
                    {
                        name: 'data',
                        internalType: 'bytes',
                        type: 'bytes'
                    }
                ],
                indexed: false
            },
            {
                name: 'keys',
                internalType: 'string[]',
                type: 'string[]',
                indexed: false
            },
            {
                name: 'values',
                internalType: 'string[]',
                type: 'string[]',
                indexed: false
            }
        ],
        name: 'PieceAdded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'storagePrice',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'minimumRate',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'PricingUpdated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            }
        ],
        name: 'ProviderApproved'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            }
        ],
        name: 'ProviderUnapproved'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'newRate',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'RailRateUpdated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'caller',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'pdpRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cacheMissRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'cdnRailId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'ServiceTerminated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'plannedUpgrade',
                internalType: 'struct FilecoinWarmStorageService.PlannedUpgrade',
                type: 'tuple',
                components: [
                    {
                        name: 'nextImplementation',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'afterEpoch',
                        internalType: 'uint96',
                        type: 'uint96'
                    }
                ],
                indexed: false
            }
        ],
        name: 'UpgradeAnnounced'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'Upgraded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'viewContract',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'ViewContractSet'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'target',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'AddressEmptyCode'
    },
    {
        type: 'error',
        inputs: [],
        name: 'AtLeastOnePriceMustBeNonZero'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CDNPaymentAlreadyTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CacheMissPaymentAlreadyTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'expectedPayer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'caller',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'CallerNotPayer'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'expectedPayer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'expectedPayee',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'caller',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'CallerNotPayerOrPayee'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'CallerNotPayments'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'windowStart',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nowBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ChallengeWindowTooEarly'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'clientDataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ClientDataSetAlreadyRegistered'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'commissionType',
                internalType: 'enum Errors.CommissionType',
                type: 'uint8'
            },
            {
                name: 'max',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'CommissionExceedsMaximum'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetNotFoundForRail'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetNotRegistered'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetPaymentAlreadyTerminated'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pdpEndEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'currentBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'DataSetPaymentBeyondEndEpoch'
    },
    {
        type: 'error',
        inputs: [],
        name: 'DivisionByZero'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'key',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'DuplicateMetadataKey'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'ERC1967InvalidImplementation'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ERC1967NonPayable'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ExtraDataRequired'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'actualSize',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowedSize',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ExtraDataTooLarge'
    },
    {
        type: 'error',
        inputs: [],
        name: 'FailedCall'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'FilBeamServiceNotConfigured'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'minimumRequired',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'available',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientFundsForMinimumRate'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'lockupAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'lockupUsage',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minimumLockupRequired',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientLockupAllowance'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'maxLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'requiredLockupPeriod',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientMaxLockupPeriod'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'rateAllowance',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'rateUsage',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minimumRateRequired',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InsufficientRateAllowance'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minExpected',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidChallengeCount'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidChallengeEpoch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'maxProvingPeriod',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'challengeWindowSize',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidChallengeWindowSize'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidDataSetId'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'fromEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'toEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidEpochRange'
    },
    {
        type: 'error',
        inputs: [],
        name: 'InvalidInitialization'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidServiceDescriptionLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidServiceNameLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'InvalidTopUpAmount'
    },
    {
        type: 'error',
        inputs: [],
        name: 'MaxProvingPeriodZero'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'metadataArrayCount',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceCount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataArrayCountMismatch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'keysLength',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'valuesLength',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataKeyAndValueLengthMismatch'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'index',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataKeyExceedsMaxLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'index',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'length',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'MetadataValueExceedsMaxLength'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'periodDeadline',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nowBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'NextProvingPeriodAlreadyCalled'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'NoPDPPaymentRail'
    },
    {
        type: 'error',
        inputs: [],
        name: 'NotInitializing'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OnlyFilBeamControllerAllowed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'expected',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'actual',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OnlyPDPVerifierAllowed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OperatorNotApproved'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OwnableInvalidOwner'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'account',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OwnableUnauthorizedAccount'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pdpEndEpoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'PaymentRailsNotFinalized'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'priceType',
                internalType: 'enum Errors.PriceType',
                type: 'uint8'
            },
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'actual',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'PriceExceedsMaximum'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProofAlreadySubmitted'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProviderAlreadyApproved'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProviderNotInApprovedList'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'provider',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'ProviderNotRegistered'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProvingNotStarted'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'deadline',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'nowBlock',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProvingPeriodPassed'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'RailNotAssociated'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ServiceContractMustTerminateRail'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'maxAllowed',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'keysLength',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'TooManyMetadataKeys'
    },
    {
        type: 'error',
        inputs: [],
        name: 'UUPSUnauthorizedCallContext'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'slot',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        name: 'UUPSUnsupportedProxiableUUID'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'field',
                internalType: 'enum Errors.AddressField',
                type: 'uint8'
            }
        ],
        name: 'ZeroAddress'
    }
];
const filecoinWarmStorageServiceAddress = {
    314: '0x8408502033C418E1bbC97cE9ac48E5528F371A9f',
    314159: '0x02925630df557F957f70E112bA06e50965417CA0'
};
const filecoinWarmStorageServiceConfig = {
    address: filecoinWarmStorageServiceAddress,
    abi: filecoinWarmStorageServiceAbi
};
const filecoinWarmStorageServiceStateViewAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_service',
                internalType: 'contract FilecoinWarmStorageService',
                type: 'address'
            }
        ],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'challengeWindow',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'clientDataSets',
        outputs: [
            {
                name: 'dataSetIds',
                internalType: 'uint256[]',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'payer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'nonce',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'clientNonces',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'filBeamControllerAddress',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getAllDataSetMetadata',
        outputs: [
            {
                name: 'keys',
                internalType: 'string[]',
                type: 'string[]'
            },
            {
                name: 'values',
                internalType: 'string[]',
                type: 'string[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getAllPieceMetadata',
        outputs: [
            {
                name: 'keys',
                internalType: 'string[]',
                type: 'string[]'
            },
            {
                name: 'values',
                internalType: 'string[]',
                type: 'string[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'offset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'limit',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getApprovedProviders',
        outputs: [
            {
                name: 'providerIds',
                internalType: 'uint256[]',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getApprovedProvidersLength',
        outputs: [
            {
                name: 'count',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getChallengesPerProof',
        outputs: [
            {
                name: '',
                internalType: 'uint64',
                type: 'uint64'
            }
        ],
        stateMutability: 'pure'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'client',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'getClientDataSets',
        outputs: [
            {
                name: 'infos',
                internalType: 'struct FilecoinWarmStorageService.DataSetInfoView[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'pdpRailId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'cacheMissRailId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'cdnRailId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'payer',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'payee',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'serviceProvider',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'commissionBps',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'clientDataSetId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'pdpEndEpoch',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'providerId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'dataSetId',
                        internalType: 'uint256',
                        type: 'uint256'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getCurrentPricingRates',
        outputs: [
            {
                name: 'storagePrice',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'minimumRate',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getDataSet',
        outputs: [
            {
                name: 'info',
                internalType: 'struct FilecoinWarmStorageService.DataSetInfoView',
                type: 'tuple',
                components: [
                    {
                        name: 'pdpRailId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'cacheMissRailId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'cdnRailId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'payer',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'payee',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'serviceProvider',
                        internalType: 'address',
                        type: 'address'
                    },
                    {
                        name: 'commissionBps',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'clientDataSetId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'pdpEndEpoch',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'providerId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'dataSetId',
                        internalType: 'uint256',
                        type: 'uint256'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'key',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'getDataSetMetadata',
        outputs: [
            {
                name: 'exists',
                internalType: 'bool',
                type: 'bool'
            },
            {
                name: 'value',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'leafCount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getDataSetSizeInBytes',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'pure'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getDataSetStatus',
        outputs: [
            {
                name: 'status',
                internalType: 'enum FilecoinWarmStorageService.DataSetStatus',
                type: 'uint8'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getMaxProvingPeriod',
        outputs: [
            {
                name: '',
                internalType: 'uint64',
                type: 'uint64'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getPDPConfig',
        outputs: [
            {
                name: 'maxProvingPeriod',
                internalType: 'uint64',
                type: 'uint64'
            },
            {
                name: 'challengeWindowSize',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'challengesPerProof',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'initChallengeWindowStart',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'key',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'getPieceMetadata',
        outputs: [
            {
                name: 'exists',
                internalType: 'bool',
                type: 'bool'
            },
            {
                name: 'value',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'isProviderApproved',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'nextPDPChallengeWindowStart',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'nextUpgrade',
        outputs: [
            {
                name: 'nextImplementation',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'afterEpoch',
                internalType: 'uint96',
                type: 'uint96'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'periodId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'provenPeriods',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'provenThisPeriod',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'provingActivationEpoch',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'provingDeadline',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'railId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'railToDataSet',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'service',
        outputs: [
            {
                name: '',
                internalType: 'contract FilecoinWarmStorageService',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'serviceCommissionBps',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'dataSetId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'ProvingPeriodNotInitialized'
    }
];
const filecoinWarmStorageServiceStateViewAddress = {
    314: '0x9e4e6699d8F67dFc883d6b0A7344Bd56F7E80B46',
    314159: '0xA5D87b04086B1d591026cCE10255351B5AA4689B'
};
const filecoinWarmStorageServiceStateViewConfig = {
    address: filecoinWarmStorageServiceStateViewAddress,
    abi: filecoinWarmStorageServiceStateViewAbi
};
const pdpVerifierAbi = [
    {
        type: 'constructor',
        inputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'MAX_ENQUEUED_REMOVALS',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'MAX_PIECE_SIZE_LOG2',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'NO_CHALLENGE_SCHEDULED',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'NO_PROVEN_EPOCH',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'UPGRADE_INTERFACE_VERSION',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'VERSION',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'listenerAddr',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'pieceData',
                internalType: 'struct Cids.Cid[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'data',
                        internalType: 'bytes',
                        type: 'bytes'
                    }
                ]
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'addPieces',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'calculateProofFee',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'proofSize',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'calculateProofFeeForSize',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'claimDataSetStorageProvider',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'listenerAddr',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'createDataSet',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'dataSetLive',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'deleteDataSet',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'feeEffectiveTime',
        outputs: [
            {
                name: '',
                internalType: 'uint64',
                type: 'uint64'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'feePerTiB',
        outputs: [
            {
                name: '',
                internalType: 'uint96',
                type: 'uint96'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'leafIndexs',
                internalType: 'uint256[]',
                type: 'uint256[]'
            }
        ],
        name: 'findPieceIds',
        outputs: [
            {
                name: '',
                internalType: 'struct IPDPTypes.PieceIdAndOffset[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'pieceId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'offset',
                        internalType: 'uint256',
                        type: 'uint256'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getActivePieceCount',
        outputs: [
            {
                name: 'activeCount',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'offset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'limit',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getActivePieces',
        outputs: [
            {
                name: 'pieces',
                internalType: 'struct Cids.Cid[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'data',
                        internalType: 'bytes',
                        type: 'bytes'
                    }
                ]
            },
            {
                name: 'pieceIds',
                internalType: 'uint256[]',
                type: 'uint256[]'
            },
            {
                name: 'hasMore',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getChallengeFinality',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getChallengeRange',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getDataSetLastProvenEpoch',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getDataSetLeafCount',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getDataSetListener',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getDataSetStorageProvider',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            },
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getNextChallengeEpoch',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getNextDataSetId',
        outputs: [
            {
                name: '',
                internalType: 'uint64',
                type: 'uint64'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getNextPieceId',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getPieceCid',
        outputs: [
            {
                name: '',
                internalType: 'struct Cids.Cid',
                type: 'tuple',
                components: [
                    {
                        name: 'data',
                        internalType: 'bytes',
                        type: 'bytes'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getPieceLeafCount',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'epoch',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getRandomness',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getScheduledRemovals',
        outputs: [
            {
                name: '',
                internalType: 'uint256[]',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_challengeFinality',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'migrate',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'challengeEpoch',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'nextProvingPeriod',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'pieceChallengable',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'pieceLive',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'newStorageProvider',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'proposeDataSetStorageProvider',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'proposedFeePerTiB',
        outputs: [
            {
                name: '',
                internalType: 'uint96',
                type: 'uint96'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'proofs',
                internalType: 'struct IPDPTypes.Proof[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'leaf',
                        internalType: 'bytes32',
                        type: 'bytes32'
                    },
                    {
                        name: 'proof',
                        internalType: 'bytes32[]',
                        type: 'bytes32[]'
                    }
                ]
            }
        ],
        name: 'provePossession',
        outputs: [],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'proxiableUUID',
        outputs: [
            {
                name: '',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'pieceIds',
                internalType: 'uint256[]',
                type: 'uint256[]'
            },
            {
                name: 'extraData',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'schedulePieceDeletions',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newFeePerTiB',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'updateProofFee',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newImplementation',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'data',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'upgradeToAndCall',
        outputs: [],
        stateMutability: 'payable'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'version',
                internalType: 'string',
                type: 'string',
                indexed: false
            },
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
                indexed: false
            }
        ],
        name: 'ContractUpgraded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'storageProvider',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'DataSetCreated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'deletedLeafCount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'DataSetDeleted'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            }
        ],
        name: 'DataSetEmpty'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'currentFee',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'newFee',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'effectiveTime',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'FeeUpdateProposed'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'version',
                internalType: 'uint64',
                type: 'uint64',
                indexed: false
            }
        ],
        name: 'Initialized'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'challengeEpoch',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'leafCount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'NextProvingPeriod'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'previousOwner',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'OwnershipTransferred'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'pieceIds',
                internalType: 'uint256[]',
                type: 'uint256[]',
                indexed: false
            },
            {
                name: 'pieceCids',
                internalType: 'struct Cids.Cid[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'data',
                        internalType: 'bytes',
                        type: 'bytes'
                    }
                ],
                indexed: false
            }
        ],
        name: 'PiecesAdded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'pieceIds',
                internalType: 'uint256[]',
                type: 'uint256[]',
                indexed: false
            }
        ],
        name: 'PiecesRemoved'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'challenges',
                internalType: 'struct IPDPTypes.PieceIdAndOffset[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'pieceId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'offset',
                        internalType: 'uint256',
                        type: 'uint256'
                    }
                ],
                indexed: false
            }
        ],
        name: 'PossessionProven'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'fee',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            }
        ],
        name: 'ProofFeePaid'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'setId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'oldStorageProvider',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'newStorageProvider',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'StorageProviderChanged'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'Upgraded'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'target',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'AddressEmptyCode'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'ERC1967InvalidImplementation'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ERC1967NonPayable'
    },
    {
        type: 'error',
        inputs: [],
        name: 'FailedCall'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'idx',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'msg',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'IndexedError'
    },
    {
        type: 'error',
        inputs: [],
        name: 'InvalidInitialization'
    },
    {
        type: 'error',
        inputs: [],
        name: 'NotInitializing'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OwnableInvalidOwner'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'account',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OwnableUnauthorizedAccount'
    },
    {
        type: 'error',
        inputs: [],
        name: 'UUPSUnauthorizedCallContext'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'slot',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        name: 'UUPSUnsupportedProxiableUUID'
    }
];
const pdpVerifierAddress = {
    314: '0xBADd0B92C1c71d02E7d520f64c0876538fa2557F',
    314159: '0x85e366Cf9DD2c0aE37E963d9556F5f4718d6417C'
};
const pdpVerifierConfig = {
    address: pdpVerifierAddress,
    abi: pdpVerifierAbi
};
const serviceProviderRegistryAbi = [
    {
        type: 'constructor',
        inputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'MAX_CAPABILITIES',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'MAX_CAPABILITY_KEY_LENGTH',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'MAX_CAPABILITY_VALUE_LENGTH',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'REGISTRATION_FEE',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'UPGRADE_INTERFACE_VERSION',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'VERSION',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'activeProductTypeProviderCount',
        outputs: [
            {
                name: 'count',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'activeProviderCount',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            },
            {
                name: 'capabilityKeys',
                internalType: 'string[]',
                type: 'string[]'
            },
            {
                name: 'capabilityValues',
                internalType: 'bytes[]',
                type: 'bytes[]'
            }
        ],
        name: 'addProduct',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerAddress',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'addressToProviderId',
        outputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'eip712Domain',
        outputs: [
            {
                name: 'fields',
                internalType: 'bytes1',
                type: 'bytes1'
            },
            {
                name: 'name',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'version',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'chainId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'verifyingContract',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'salt',
                internalType: 'bytes32',
                type: 'bytes32'
            },
            {
                name: 'extensions',
                internalType: 'uint256[]',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'offset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'limit',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getAllActiveProviders',
        outputs: [
            {
                name: 'providerIds',
                internalType: 'uint256[]',
                type: 'uint256[]'
            },
            {
                name: 'hasMore',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'getAllProductCapabilities',
        outputs: [
            {
                name: 'isActive',
                internalType: 'bool',
                type: 'bool'
            },
            {
                name: 'keys',
                internalType: 'string[]',
                type: 'string[]'
            },
            {
                name: 'values',
                internalType: 'bytes[]',
                type: 'bytes[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getNextProviderId',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            },
            {
                name: 'keys',
                internalType: 'string[]',
                type: 'string[]'
            }
        ],
        name: 'getProductCapabilities',
        outputs: [
            {
                name: 'values',
                internalType: 'bytes[]',
                type: 'bytes[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getProvider',
        outputs: [
            {
                name: 'info',
                internalType: 'struct ServiceProviderRegistry.ServiceProviderInfoView',
                type: 'tuple',
                components: [
                    {
                        name: 'providerId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'info',
                        internalType: 'struct ServiceProviderRegistryStorage.ServiceProviderInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'serviceProvider',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'payee',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'name',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'description',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'isActive',
                                internalType: 'bool',
                                type: 'bool'
                            }
                        ]
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerAddress',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'getProviderByAddress',
        outputs: [
            {
                name: 'info',
                internalType: 'struct ServiceProviderRegistry.ServiceProviderInfoView',
                type: 'tuple',
                components: [
                    {
                        name: 'providerId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'info',
                        internalType: 'struct ServiceProviderRegistryStorage.ServiceProviderInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'serviceProvider',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'payee',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'name',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'description',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'isActive',
                                internalType: 'bool',
                                type: 'bool'
                            }
                        ]
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'getProviderCount',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerAddress',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'getProviderIdByAddress',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getProviderPayee',
        outputs: [
            {
                name: 'payee',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'getProviderWithProduct',
        outputs: [
            {
                name: '',
                internalType: 'struct ServiceProviderRegistryStorage.ProviderWithProduct',
                type: 'tuple',
                components: [
                    {
                        name: 'providerId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'providerInfo',
                        internalType: 'struct ServiceProviderRegistryStorage.ServiceProviderInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'serviceProvider',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'payee',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'name',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'description',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'isActive',
                                internalType: 'bool',
                                type: 'bool'
                            }
                        ]
                    },
                    {
                        name: 'product',
                        internalType: 'struct ServiceProviderRegistryStorage.ServiceProduct',
                        type: 'tuple',
                        components: [
                            {
                                name: 'productType',
                                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                                type: 'uint8'
                            },
                            {
                                name: 'capabilityKeys',
                                internalType: 'string[]',
                                type: 'string[]'
                            },
                            {
                                name: 'isActive',
                                internalType: 'bool',
                                type: 'bool'
                            }
                        ]
                    },
                    {
                        name: 'productCapabilityValues',
                        internalType: 'bytes[]',
                        type: 'bytes[]'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerIds',
                internalType: 'uint256[]',
                type: 'uint256[]'
            }
        ],
        name: 'getProvidersByIds',
        outputs: [
            {
                name: 'providerInfos',
                internalType: 'struct ServiceProviderRegistry.ServiceProviderInfoView[]',
                type: 'tuple[]',
                components: [
                    {
                        name: 'providerId',
                        internalType: 'uint256',
                        type: 'uint256'
                    },
                    {
                        name: 'info',
                        internalType: 'struct ServiceProviderRegistryStorage.ServiceProviderInfo',
                        type: 'tuple',
                        components: [
                            {
                                name: 'serviceProvider',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'payee',
                                internalType: 'address',
                                type: 'address'
                            },
                            {
                                name: 'name',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'description',
                                internalType: 'string',
                                type: 'string'
                            },
                            {
                                name: 'isActive',
                                internalType: 'bool',
                                type: 'bool'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'validIds',
                internalType: 'bool[]',
                type: 'bool[]'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            },
            {
                name: 'onlyActive',
                internalType: 'bool',
                type: 'bool'
            },
            {
                name: 'offset',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'limit',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'getProvidersByProductType',
        outputs: [
            {
                name: 'result',
                internalType: 'struct ServiceProviderRegistryStorage.PaginatedProviders',
                type: 'tuple',
                components: [
                    {
                        name: 'providers',
                        internalType: 'struct ServiceProviderRegistryStorage.ProviderWithProduct[]',
                        type: 'tuple[]',
                        components: [
                            {
                                name: 'providerId',
                                internalType: 'uint256',
                                type: 'uint256'
                            },
                            {
                                name: 'providerInfo',
                                internalType: 'struct ServiceProviderRegistryStorage.ServiceProviderInfo',
                                type: 'tuple',
                                components: [
                                    {
                                        name: 'serviceProvider',
                                        internalType: 'address',
                                        type: 'address'
                                    },
                                    {
                                        name: 'payee',
                                        internalType: 'address',
                                        type: 'address'
                                    },
                                    {
                                        name: 'name',
                                        internalType: 'string',
                                        type: 'string'
                                    },
                                    {
                                        name: 'description',
                                        internalType: 'string',
                                        type: 'string'
                                    },
                                    {
                                        name: 'isActive',
                                        internalType: 'bool',
                                        type: 'bool'
                                    }
                                ]
                            },
                            {
                                name: 'product',
                                internalType: 'struct ServiceProviderRegistryStorage.ServiceProduct',
                                type: 'tuple',
                                components: [
                                    {
                                        name: 'productType',
                                        internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                                        type: 'uint8'
                                    },
                                    {
                                        name: 'capabilityKeys',
                                        internalType: 'string[]',
                                        type: 'string[]'
                                    },
                                    {
                                        name: 'isActive',
                                        internalType: 'bool',
                                        type: 'bool'
                                    }
                                ]
                            },
                            {
                                name: 'productCapabilityValues',
                                internalType: 'bytes[]',
                                type: 'bytes[]'
                            }
                        ]
                    },
                    {
                        name: 'hasMore',
                        internalType: 'bool',
                        type: 'bool'
                    }
                ]
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'isProviderActive',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'provider',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'isRegisteredProvider',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newVersion',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'migrate',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            },
            {
                name: 'key',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'productCapabilities',
        outputs: [
            {
                name: 'value',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'productTypeProviderCount',
        outputs: [
            {
                name: 'count',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'providerHasProduct',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'providerProducts',
        outputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            },
            {
                name: 'isActive',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        name: 'providers',
        outputs: [
            {
                name: 'serviceProvider',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'payee',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'name',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'description',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'isActive',
                internalType: 'bool',
                type: 'bool'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [],
        name: 'proxiableUUID',
        outputs: [
            {
                name: '',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'payee',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'name',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'description',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            },
            {
                name: 'capabilityKeys',
                internalType: 'string[]',
                type: 'string[]'
            },
            {
                name: 'capabilityValues',
                internalType: 'bytes[]',
                type: 'bytes[]'
            }
        ],
        name: 'registerProvider',
        outputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'removeProduct',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'removeProvider',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            },
            {
                name: 'capabilityKeys',
                internalType: 'string[]',
                type: 'string[]'
            },
            {
                name: 'capabilityValues',
                internalType: 'bytes[]',
                type: 'bytes[]'
            }
        ],
        name: 'updateProduct',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'name',
                internalType: 'string',
                type: 'string'
            },
            {
                name: 'description',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'updateProviderInfo',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'newImplementation',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'data',
                internalType: 'bytes',
                type: 'bytes'
            }
        ],
        name: 'upgradeToAndCall',
        outputs: [],
        stateMutability: 'payable'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'version',
                internalType: 'string',
                type: 'string',
                indexed: false
            },
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
                indexed: false
            }
        ],
        name: 'ContractUpgraded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [],
        name: 'EIP712DomainChanged'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'version',
                internalType: 'uint64',
                type: 'uint64',
                indexed: false
            }
        ],
        name: 'Initialized'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'previousOwner',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'OwnershipTransferred'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8',
                indexed: true
            },
            {
                name: 'serviceProvider',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'capabilityKeys',
                internalType: 'string[]',
                type: 'string[]',
                indexed: false
            },
            {
                name: 'capabilityValues',
                internalType: 'bytes[]',
                type: 'bytes[]',
                indexed: false
            }
        ],
        name: 'ProductAdded'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8',
                indexed: true
            }
        ],
        name: 'ProductRemoved'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8',
                indexed: true
            },
            {
                name: 'serviceProvider',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'capabilityKeys',
                internalType: 'string[]',
                type: 'string[]',
                indexed: false
            },
            {
                name: 'capabilityValues',
                internalType: 'bytes[]',
                type: 'bytes[]',
                indexed: false
            }
        ],
        name: 'ProductUpdated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            }
        ],
        name: 'ProviderInfoUpdated'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            },
            {
                name: 'serviceProvider',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'payee',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'ProviderRegistered'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'providerId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true
            }
        ],
        name: 'ProviderRemoved'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address',
                indexed: true
            }
        ],
        name: 'Upgraded'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'target',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'AddressEmptyCode'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'implementation',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'ERC1967InvalidImplementation'
    },
    {
        type: 'error',
        inputs: [],
        name: 'ERC1967NonPayable'
    },
    {
        type: 'error',
        inputs: [],
        name: 'FailedCall'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'productType',
                internalType: 'enum ServiceProviderRegistryStorage.ProductType',
                type: 'uint8'
            }
        ],
        name: 'InsufficientCapabilitiesForProduct'
    },
    {
        type: 'error',
        inputs: [],
        name: 'InvalidInitialization'
    },
    {
        type: 'error',
        inputs: [],
        name: 'NotInitializing'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OwnableInvalidOwner'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'account',
                internalType: 'address',
                type: 'address'
            }
        ],
        name: 'OwnableUnauthorizedAccount'
    },
    {
        type: 'error',
        inputs: [],
        name: 'UUPSUnauthorizedCallContext'
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'slot',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        name: 'UUPSUnsupportedProxiableUUID'
    }
];
const serviceProviderRegistryAddress = {
    314: '0xf55dDbf63F1b55c3F1D4FA7e339a68AB7b64A5eB',
    314159: '0x839e5c9988e4e9977d40708d0094103c0839Ac9D'
};
const serviceProviderRegistryConfig = {
    address: serviceProviderRegistryAddress,
    abi: serviceProviderRegistryAbi
};
const sessionKeyRegistryAbi = [
    {
        type: 'function',
        inputs: [
            {
                name: 'user',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'signer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'permission',
                internalType: 'bytes32',
                type: 'bytes32'
            }
        ],
        name: 'authorizationExpiry',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256'
            }
        ],
        stateMutability: 'view'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'signer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'expiry',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'permissions',
                internalType: 'bytes32[]',
                type: 'bytes32[]'
            },
            {
                name: 'origin',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'login',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'signer',
                internalType: 'address payable',
                type: 'address'
            },
            {
                name: 'expiry',
                internalType: 'uint256',
                type: 'uint256'
            },
            {
                name: 'permissions',
                internalType: 'bytes32[]',
                type: 'bytes32[]'
            },
            {
                name: 'origin',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'loginAndFund',
        outputs: [],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        inputs: [
            {
                name: 'signer',
                internalType: 'address',
                type: 'address'
            },
            {
                name: 'permissions',
                internalType: 'bytes32[]',
                type: 'bytes32[]'
            },
            {
                name: 'origin',
                internalType: 'string',
                type: 'string'
            }
        ],
        name: 'revoke',
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'identity',
                internalType: 'address',
                type: 'address',
                indexed: true
            },
            {
                name: 'signer',
                internalType: 'address',
                type: 'address',
                indexed: false
            },
            {
                name: 'expiry',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false
            },
            {
                name: 'permissions',
                internalType: 'bytes32[]',
                type: 'bytes32[]',
                indexed: false
            },
            {
                name: 'origin',
                internalType: 'string',
                type: 'string',
                indexed: false
            }
        ],
        name: 'AuthorizationsUpdated'
    }
];
const sessionKeyRegistryAddress = {
    314: '0x74FD50525A958aF5d484601E252271f9625231aB',
    314159: '0x518411c2062E119Aaf7A8B12A2eDf9a939347655'
};
const sessionKeyRegistryConfig = {
    address: sessionKeyRegistryAddress,
    abi: sessionKeyRegistryAbi
}; //# sourceMappingURL=generated.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$erc20$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/erc20.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript)");
;
;
;
const storage = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filecoinWarmStorageServiceAbi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errorsAbi"]
];
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/erc20.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "erc20",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["erc20Abi"],
    "erc20WithPermit",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$erc20$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["erc20WithPermit"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$erc20$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/erc20.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/constants/abis.js [app-route] (ecmascript)");
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript) <export filecoinPayV1Abi as payments>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "payments",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filecoinPayV1Abi"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript)");
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript) <export pdpVerifierAbi as pdp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pdp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pdpVerifierAbi"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript)");
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript) <export filecoinWarmStorageServiceStateViewAbi as storageView>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storageView",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filecoinWarmStorageServiceStateViewAbi"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript)");
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript) <export serviceProviderRegistryAbi as serviceProviderRegistry>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serviceProviderRegistry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serviceProviderRegistryAbi"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript)");
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript) <export sessionKeyRegistryAbi as sessionKeyRegistry>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sessionKeyRegistry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionKeyRegistryAbi"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript)");
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/piece.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_UPLOAD_SIZE",
    ()=>MAX_UPLOAD_SIZE,
    "asLegacyPieceCID",
    ()=>asLegacyPieceCID,
    "asPieceCID",
    ()=>asPieceCID,
    "calculate",
    ()=>calculate,
    "calculateFromIterable",
    ()=>calculateFromIterable,
    "createPieceCIDStream",
    ()=>createPieceCIDStream,
    "downloadAndValidate",
    ()=>downloadAndValidate,
    "getSize",
    ()=>getSize,
    "getSizeFromPieceCID",
    ()=>getSizeFromPieceCID,
    "hexToPieceCID",
    ()=>hexToPieceCID,
    "isPieceCID",
    ()=>isPieceCID,
    "parse",
    ()=>parse,
    "uint8ArrayToAsyncIterable",
    ()=>uint8ArrayToAsyncIterable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$multihash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@web3-storage/data-segment/src/multihash.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$digest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Digest$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@web3-storage/data-segment/src/digest.js [app-route] (ecmascript) <export * as Digest>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$piece$2f$size$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@web3-storage/data-segment/src/piece/size.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$piece$2f$size$2f$unpadded$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Unpadded$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@web3-storage/data-segment/src/piece/size/unpadded.js [app-route] (ecmascript) <export * as Unpadded>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/multiformats/dist/src/cid.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/multiformats/dist/src/codecs/raw.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/multiformats/dist/src/hashes/digest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$link$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/multiformats/dist/src/link.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const FIL_COMMITMENT_UNSEALED = 0xf101;
const SHA2_256_TRUNC254_PADDED = 0x1012;
const MAX_UPLOAD_SIZE = 1_065_353_216;
function parsePieceCID(pieceCidString) {
    try {
        const cid = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CID"].parse(pieceCidString);
        if (isValidPieceCID(cid)) {
            return cid;
        }
    } catch  {}
    return null;
}
function parseLegacyPieceCID(pieceCidString) {
    try {
        const cid = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CID"].parse(pieceCidString);
        if (isValidLegacyPieceCID(cid)) {
            return cid;
        }
    } catch  {}
    return null;
}
function isCID(value) {
    return typeof value === 'object' && value !== null && __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CID"].asCID(value) !== null;
}
function isValidPieceCID(cid) {
    return cid.code === __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["code"] && cid.multihash.code === __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$multihash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["code"];
}
function isValidLegacyPieceCID(cid) {
    return cid.code === FIL_COMMITMENT_UNSEALED && cid.multihash.code === SHA2_256_TRUNC254_PADDED;
}
function asPieceCID(pieceCidInput) {
    if (pieceCidInput === null || pieceCidInput === undefined) {
        return null;
    }
    if (typeof pieceCidInput === 'string') {
        return parsePieceCID(pieceCidInput);
    }
    if (isCID(pieceCidInput)) {
        if (isValidPieceCID(pieceCidInput)) {
            return pieceCidInput;
        }
    }
    return null;
}
function asLegacyPieceCID(pieceCidInput) {
    if (pieceCidInput === null || pieceCidInput === undefined) {
        return null;
    }
    const pieceCid = asPieceCID(pieceCidInput);
    if (pieceCid != null) {
        const digest = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["create"](SHA2_256_TRUNC254_PADDED, pieceCid.multihash.digest.subarray(-32));
        return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$link$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"](FIL_COMMITMENT_UNSEALED, digest);
    }
    if (typeof pieceCidInput === 'string') {
        return parseLegacyPieceCID(pieceCidInput);
    }
    if (isCID(pieceCidInput)) {
        if (isValidLegacyPieceCID(pieceCidInput)) {
            return pieceCidInput;
        }
    }
    return null;
}
function getSize(pieceCid) {
    const digest = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$digest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Digest$3e$__["Digest"].fromBytes(pieceCid.multihash.bytes);
    const height = digest.height;
    const padding = digest.padding;
    const rawSize = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$piece$2f$size$2f$unpadded$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Unpadded$3e$__["Unpadded"].fromPiece({
        height,
        padding
    });
    if (rawSize > Number.MAX_SAFE_INTEGER) {
        throw new Error(`Raw size ${rawSize} exceeds maximum safe integer`);
    }
    return Number(rawSize);
}
function getSizeFromPieceCID(pieceCidInput) {
    const pieceCid = asPieceCID(pieceCidInput);
    if (pieceCid == null) {
        throw new Error('Invalid PieceCID: input must be a valid PieceCIDv2');
    }
    return getSize(pieceCid);
}
function parse(pieceCid) {
    try {
        const cid = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CID"].parse(pieceCid).toV1();
        if (!isPieceCID(cid)) {
            throw new Error('Invalid PieceCID: input must be a valid PieceCIDv2');
        }
        return cid;
    } catch  {
        throw new Error(`Invalid CID string: ${pieceCid}`);
    }
}
function isPieceCID(cid) {
    return typeof cid === 'object' && __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CID"].asCID(cid) != null && cid.code === __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["code"] && cid.multihash.code === __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$multihash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["code"];
}
function calculate(data) {
    const hasher = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$multihash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"]();
    const chunkSize = 2048;
    for(let i = 0; i < data.length; i += chunkSize){
        hasher.write(data.subarray(i, i + chunkSize));
    }
    const digest = hasher.digest();
    return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$link$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"](__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["code"], digest);
}
async function calculateFromIterable(data) {
    const hasher = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$multihash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"]();
    for await (const chunk of data){
        hasher.write(chunk);
    }
    const digest = hasher.digest();
    return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$link$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"](__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["code"], digest);
}
function createPieceCIDStream() {
    const hasher = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$web3$2d$storage$2f$data$2d$segment$2f$src$2f$multihash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"]();
    let finished = false;
    let pieceCid = null;
    const stream = new TransformStream({
        transform (chunk, controller) {
            hasher.write(chunk);
            controller.enqueue(chunk);
        },
        flush () {
            const digest = hasher.digest();
            pieceCid = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$link$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"](__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["code"], digest);
            finished = true;
        }
    });
    return {
        stream,
        getPieceCID: ()=>{
            if (!finished) {
                return null;
            }
            return pieceCid;
        }
    };
}
async function* uint8ArrayToAsyncIterable(data, chunkSize = 2048) {
    for(let i = 0; i < data.length; i += chunkSize){
        yield data.subarray(i, i + chunkSize);
    }
}
function hexToPieceCID(pieceCidHex) {
    const pieceDataBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToBytes"])(pieceCidHex);
    const possiblePieceCID = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CID"].decode(pieceDataBytes);
    const isValid = isValidPieceCID(possiblePieceCID);
    if (!isValid) {
        throw new Error(`Hex string '${pieceCidHex}' is a valid CID but not a valid PieceCID`);
    }
    return possiblePieceCID;
}
async function downloadAndValidate(response, expectedPieceCid) {
    const parsedPieceCid = asPieceCID(expectedPieceCid);
    if (parsedPieceCid == null) {
        throw new Error(`Invalid PieceCID: ${String(expectedPieceCid)}`);
    }
    if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }
    if (response.body == null) {
        throw new Error('Response body is null');
    }
    const { stream: pieceCidStream, getPieceCID } = createPieceCIDStream();
    const chunks = [];
    const collectStream = new TransformStream({
        transform (chunk, controller) {
            chunks.push(chunk);
            controller.enqueue(chunk);
        }
    });
    const pipelineStream = response.body.pipeThrough(pieceCidStream).pipeThrough(collectStream);
    const reader = pipelineStream.getReader();
    try {
        while(true){
            const { done } = await reader.read();
            if (done) break;
        }
    } finally{
        reader.releaseLock();
    }
    if (chunks.length === 0) {
        throw new Error('Response body is empty');
    }
    const calculatedPieceCid = getPieceCID();
    if (calculatedPieceCid == null) {
        throw new Error('Failed to calculate PieceCID from stream');
    }
    if (calculatedPieceCid.toString() !== parsedPieceCid.toString()) {
        throw new Error(`PieceCID verification failed. Expected: ${String(parsedPieceCid)}, Got: ${String(calculatedPieceCid)}`);
    }
    const totalLength = chunks.reduce((acc, chunk)=>acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks){
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
} //# sourceMappingURL=piece.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOCKUP_PERIOD",
    ()=>LOCKUP_PERIOD,
    "SIZE_CONSTANTS",
    ()=>SIZE_CONSTANTS,
    "TIME_CONSTANTS",
    ()=>TIME_CONSTANTS
]);
const TIME_CONSTANTS = {
    EPOCH_DURATION: 30,
    EPOCHS_PER_DAY: 2880n,
    EPOCHS_PER_MONTH: 86400n,
    DAYS_PER_MONTH: 30n,
    DEFAULT_LOCKUP_DAYS: 10n
};
const SIZE_CONSTANTS = {
    KiB: 1024n,
    MiB: 1n << 20n,
    GiB: 1n << 30n,
    TiB: 1n << 40n,
    PiB: 1n << 50n,
    MAX_UPLOAD_SIZE: 200 * 1024 * 1024,
    MIN_UPLOAD_SIZE: 127,
    DEFAULT_UPLOAD_BATCH_SIZE: 32
};
const LOCKUP_PERIOD = 30n * TIME_CONSTANTS.EPOCHS_PER_DAY; //# sourceMappingURL=constants.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/decode-pdp-errors.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodePDPError",
    ()=>decodePDPError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/errors/abi.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/decodeErrorResult.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/formatAbiItem.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItemWithArgs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__filecoinPayV1Abi__as__payments$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript) <export filecoinPayV1Abi as payments>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__pdpVerifierAbi__as__pdp$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/abis/generated.js [app-route] (ecmascript) <export pdpVerifierAbi as pdp>");
;
;
;
function decodePDPError(error) {
    const regex = /(?:vm error|revert reason)=\[(.*?)\]/g;
    const matches = error.matchAll(regex);
    for (const match of matches){
        const extractedContent = match[1];
        if (extractedContent?.startsWith('0x')) {
            let error;
            try {
                const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeErrorResult"])({
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["storage"],
                    data: extractedContent
                });
                return `Warm Storage\n${formatPDPError(value)}`;
            } catch (err) {
                error = err;
            }
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiErrorSignatureNotFoundError"]) {
                try {
                    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeErrorResult"])({
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__filecoinPayV1Abi__as__payments$3e$__["payments"],
                        data: extractedContent
                    });
                    return `Payments\n${formatPDPError(value)}`;
                } catch (err) {
                    error = err;
                }
            }
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbiErrorSignatureNotFoundError"]) {
                try {
                    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeErrorResult"])({
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$abis$2f$generated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__pdpVerifierAbi__as__pdp$3e$__["pdp"],
                        data: extractedContent
                    });
                    return `PDP Verifier\n${formatPDPError(value)}`;
                } catch (err) {
                    error = err;
                }
            }
            return `Unable to decode error\n${error}`;
        } else if (extractedContent?.startsWith('Error(')) {
            return `\n${extractedContent.replace('Error(', '').replace(')', '')}`;
        }
    }
    return `Service Provider PDP\n${error}`;
}
function formatPDPError(error) {
    const errorWithParams = error.abiItem ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiItem"])(error.abiItem, {
        includeName: true
    }) : undefined;
    const formattedArgs = error.args ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItemWithArgs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAbiItemWithArgs"])({
        abiItem: error.abiItem,
        args: error.args,
        includeName: false,
        includeFunctionName: false
    }) : undefined;
    return [
        errorWithParams ? `${errorWithParams}` : '',
        formattedArgs && formattedArgs !== '()' ? `${[
            ...Array(error.errorName?.length ?? 0).keys()
        ].map(()=>' ').join('')}${formattedArgs}` : ''
    ].join('\n');
} //# sourceMappingURL=decode-pdp-errors.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/errors/base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SynapseError",
    ()=>SynapseError,
    "isSynapseError",
    ()=>isSynapseError
]);
const symbol = Symbol.for('synapse-error');
function isSynapseError(value) {
    return value instanceof Error && symbol in value;
}
class SynapseError extends Error {
    [symbol] = true;
    name = 'SynapseError';
    cause;
    details;
    shortMessage;
    constructor(message, options){
        const details = options?.cause instanceof Error ? options.cause.message : options?.details ? options.details : undefined;
        const msg = [
            message || 'An error occurred.',
            ...details ? [
                ''
            ] : [],
            ...details ? [
                `Details: ${details}`
            ] : []
        ].join('\n');
        super(msg, options);
        this.cause = options?.cause ?? undefined;
        this.details = details ?? undefined;
        this.shortMessage = message;
    }
    static is(value) {
        return isSynapseError(value) && value.name === 'SynapseError';
    }
} //# sourceMappingURL=base.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/errors/pdp.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddPiecesError",
    ()=>AddPiecesError,
    "CreateDataSetError",
    ()=>CreateDataSetError,
    "DeletePieceError",
    ()=>DeletePieceError,
    "FindPieceError",
    ()=>FindPieceError,
    "GetDataSetError",
    ()=>GetDataSetError,
    "InvalidUploadSizeError",
    ()=>InvalidUploadSizeError,
    "LocationHeaderError",
    ()=>LocationHeaderError,
    "PollDataSetCreationStatusError",
    ()=>PollDataSetCreationStatusError,
    "PollForAddPiecesStatusError",
    ()=>PollForAddPiecesStatusError,
    "PostPieceError",
    ()=>PostPieceError,
    "UploadPieceError",
    ()=>UploadPieceError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/decode-pdp-errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/errors/base.js [app-route] (ecmascript)");
;
;
;
class LocationHeaderError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'LocationHeaderError';
    constructor(location){
        super(`Location header format is invalid: ${location ?? '<none>'}`);
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'LocationHeaderError';
    }
}
class CreateDataSetError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'CreateDataSetError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to create data set.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'CreateDataSetError';
    }
}
class PollDataSetCreationStatusError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'PollDataSetCreationStatusError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to check data set creation status.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'PollDataSetCreationStatusError';
    }
}
class GetDataSetError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'GetDataSetError';
    constructor(error){
        super(error ? 'Failed to get data set.' : 'Data set not found.', {
            details: error ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error) : undefined
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'GetDataSetError';
    }
}
class PostPieceError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'PostPieceError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to create upload session.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'PostPieceError';
    }
}
class UploadPieceError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'UploadPieceError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to upload piece.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'UploadPieceError';
    }
}
class FindPieceError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'FindPieceError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to find piece.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'FindPieceError';
    }
}
class AddPiecesError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'AddPiecesError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to add pieces.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'AddPiecesError';
    }
}
class PollForAddPiecesStatusError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'PollForAddPiecesStatusError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to poll for add pieces status.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'PollForAddPiecesStatusError';
    }
}
class DeletePieceError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'DeletePieceError';
    constructor(error){
        const decodedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodePDPError"])(error);
        super(`Failed to delete piece.`, {
            details: decodedError
        });
    }
    static is(value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSynapseError"])(value) && value.name === 'DeletePieceError';
    }
}
class InvalidUploadSizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SynapseError"] {
    name = 'InvalidUploadSizeError';
    constructor(size){
        super(`Invalid upload size.`, {
            details: `Size ${size} bytes is below minimum allowed size of ${__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIZE_CONSTANTS"].MIN_UPLOAD_SIZE} bytes or exceeds maximum allowed size of ${__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIZE_CONSTANTS"].MAX_UPLOAD_SIZE} bytes`
        });
    }
} //# sourceMappingURL=pdp.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/piece-url.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPieceUrl",
    ()=>createPieceUrl
]);
function createPieceUrl(cid, cdn, address, chainId, pdpUrl) {
    if (cdn) {
        const endpoint = chainId === 314 ? `https://${address}.filbeam.io` : `https://${address}.calibration.filbeam.io`;
        const url = new URL(`/${cid}`, endpoint);
        return url.toString();
    } else {
        return createPieceUrlPDP(cid, pdpUrl);
    }
}
function createPieceUrlPDP(cid, pdpUrl) {
    const endpoint = pdpUrl;
    const url = `piece/${cid}`;
    return new URL(url, endpoint).toString();
} //# sourceMappingURL=piece-url.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/sp.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FACTOR",
    ()=>FACTOR,
    "MIN_TIMEOUT",
    ()=>MIN_TIMEOUT,
    "RETRIES",
    ()=>RETRIES,
    "addPieces",
    ()=>addPieces,
    "createDataSet",
    ()=>createDataSet,
    "createDataSetAndAddPieces",
    ()=>createDataSetAndAddPieces,
    "deletePiece",
    ()=>deletePiece,
    "findPiece",
    ()=>findPiece,
    "getDataSet",
    ()=>getDataSet,
    "getPiecesForDataSet",
    ()=>getPiecesForDataSet,
    "ping",
    ()=>ping,
    "pollForAddPiecesStatus",
    ()=>pollForAddPiecesStatus,
    "pollForDataSetCreationStatus",
    ()=>pollForDataSetCreationStatus,
    "setTimeout",
    ()=>setTimeout,
    "uploadPiece",
    ()=>uploadPiece,
    "uploadPieceStreaming",
    ()=>uploadPieceStreaming
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/iso-web/src/http.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/isHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/errors/pdp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$piece$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/piece.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$piece$2d$url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/piece-url.js [app-route] (ecmascript)");
;
;
;
;
;
;
let TIMEOUT = 1000 * 60 * 5;
const RETRIES = Infinity;
const FACTOR = 1;
const MIN_TIMEOUT = 4000;
function setTimeout(timeout) {
    TIMEOUT = timeout;
}
function asyncIterableToReadableStream(iterable) {
    if (!isAsyncIterable(iterable)) {
        throw new Error('Input must be an AsyncIterable');
    }
    if (typeof ReadableStream.from === 'function') {
        return ReadableStream.from(iterable);
    }
    const iterator = iterable[Symbol.asyncIterator]();
    return new ReadableStream({
        async pull (controller) {
            try {
                const { value, done } = await iterator.next();
                if (done) {
                    controller.close();
                } else {
                    controller.enqueue(value);
                }
            } catch (error) {
                if (iterator.return) {
                    try {
                        await iterator.return();
                    } catch  {}
                }
                controller.error(error);
            }
        },
        async cancel () {
            if (iterator.return) {
                await iterator.return();
            }
        }
    });
}
async function createDataSet(options) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].post(new URL(`pdp/data-sets`, options.endpoint), {
        body: JSON.stringify({
            recordKeeper: options.recordKeeper,
            extraData: options.extraData
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: TIMEOUT
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateDataSetError"](await response.error.response.text());
        }
        throw response.error;
    }
    const location = response.result.headers.get('Location');
    const hash = location?.split('/').pop();
    if (!location || !hash || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(hash)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LocationHeaderError"](location);
    }
    return {
        txHash: hash,
        statusUrl: new URL(location, options.endpoint).toString()
    };
}
async function pollForDataSetCreationStatus(options) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].json.get(options.statusUrl, {
        async onResponse (response) {
            if (response.ok) {
                const data = await response.clone().json();
                if (data.dataSetCreated) {
                    return response;
                }
                throw new Error('Not created yet');
            }
        },
        retry: {
            shouldRetry: (ctx)=>ctx.error.message === 'Not created yet',
            retries: RETRIES,
            factor: FACTOR,
            minTimeout: MIN_TIMEOUT
        },
        timeout: TIMEOUT
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PollDataSetCreationStatusError"](await response.error.response.text());
        }
        throw response.error;
    }
    return response.result;
}
async function createDataSetAndAddPieces(options) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].post(new URL(`pdp/data-sets/create-and-add`, options.endpoint), {
        body: JSON.stringify({
            recordKeeper: options.recordKeeper,
            extraData: options.extraData,
            pieces: options.pieces.map((piece)=>({
                    pieceCid: piece.toString(),
                    subPieces: [
                        {
                            subPieceCid: piece.toString()
                        }
                    ]
                }))
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: TIMEOUT
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateDataSetError"](await response.error.response.text());
        }
        throw response.error;
    }
    const location = response.result.headers.get('Location');
    const hash = location?.split('/').pop();
    if (!location || !hash || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(hash)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LocationHeaderError"](location);
    }
    return {
        txHash: hash,
        statusUrl: new URL(location, options.endpoint).toString()
    };
}
async function getDataSet(options) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].json.get(new URL(`pdp/data-sets/${options.dataSetId}`, options.endpoint));
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetDataSetError"](await response.error.response.text());
        }
        throw response.error;
    }
    return response.result;
}
async function getPiecesForDataSet(options) {
    const dataSet = await getDataSet(options);
    const pieces = dataSet.pieces.map((piece)=>({
            pieceCid: piece.pieceCid,
            pieceId: piece.pieceId,
            pieceUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$piece$2d$url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPieceUrl"])(piece.pieceCid, options.cdn, options.address, options.chainId, options.endpoint),
            subPieceCid: piece.subPieceCid,
            subPieceOffset: piece.subPieceOffset
        }));
    return pieces;
}
async function uploadPiece(options) {
    const size = options.data.length;
    if (size < __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIZE_CONSTANTS"].MIN_UPLOAD_SIZE || size > __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIZE_CONSTANTS"].MAX_UPLOAD_SIZE) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidUploadSizeError"](size);
    }
    const pieceCid = options.pieceCid;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$piece$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isPieceCID"](pieceCid)) {
        throw new Error(`Invalid PieceCID: ${String(options.pieceCid)}`);
    }
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].post(new URL(`pdp/piece`, options.endpoint), {
        body: JSON.stringify({
            pieceCid: pieceCid.toString()
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: TIMEOUT
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostPieceError"](await response.error.response.text());
        }
        throw response.error;
    }
    if (response.result.status === 200) {
        return;
    }
    const location = response.result.headers.get('Location');
    const uploadUuid = location?.split('/').pop();
    if (!location || !uploadUuid) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LocationHeaderError"](location);
    }
    const uploadResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].put(new URL(`pdp/piece/upload/${uploadUuid}`, options.endpoint), {
        body: options.data,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': options.data.length.toString()
        },
        timeout: false
    });
    if (uploadResponse.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(uploadResponse.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UploadPieceError"](await uploadResponse.error.response.text());
        }
        throw uploadResponse.error;
    }
}
async function uploadPieceStreaming(options) {
    const createResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].post(new URL('pdp/piece/uploads', options.endpoint), {
        timeout: TIMEOUT,
        signal: options.signal
    });
    if (createResponse.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(createResponse.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostPieceError"](`Failed to create upload session: ${await createResponse.error.response.text()}`);
        }
        throw createResponse.error;
    }
    if (createResponse.result.status !== 201) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostPieceError"](`Expected 201 Created, got ${createResponse.result.status}`);
    }
    const location = createResponse.result.headers.get('Location');
    if (!location) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LocationHeaderError"]('Upload session created but Location header missing');
    }
    const locationMatch = location.match(/\/pdp\/piece\/uploads\/([a-fA-F0-9-]+)/);
    if (!locationMatch) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LocationHeaderError"](`Invalid Location header format: ${location}`);
    }
    const uploadUuid = locationMatch[1];
    let getPieceCID = ()=>options.pieceCid ?? null;
    let pieceCidStream = null;
    if (options.pieceCid == null) {
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$piece$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPieceCIDStream"]();
        pieceCidStream = result.stream;
        getPieceCID = result.getPieceCID;
    }
    const dataStream = asReadableStream(options.data);
    let bytesUploaded = 0;
    const trackingStream = new TransformStream({
        transform (chunk, controller) {
            bytesUploaded += chunk.length;
            if (bytesUploaded > __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$piece$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_UPLOAD_SIZE"]) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidUploadSizeError"](bytesUploaded);
            }
            if (options.onProgress) {
                options.onProgress(bytesUploaded);
            }
            controller.enqueue(chunk);
        }
    });
    const bodyStream = pieceCidStream ? dataStream.pipeThrough(trackingStream).pipeThrough(pieceCidStream) : dataStream.pipeThrough(trackingStream);
    const headers = {
        'Content-Type': 'application/octet-stream'
    };
    if (options.size !== undefined) {
        headers['Content-Length'] = options.size.toString();
    }
    const uploadResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].put(new URL(`pdp/piece/uploads/${uploadUuid}`, options.endpoint), {
        body: bodyStream,
        headers,
        timeout: false,
        signal: options.signal,
        duplex: 'half'
    });
    if (uploadResponse.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(uploadResponse.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UploadPieceError"](`Failed to upload piece: ${await uploadResponse.error.response.text()}`);
        }
        throw uploadResponse.error;
    }
    if (uploadResponse.result.status !== 204) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UploadPieceError"](`Expected 204 No Content, got ${uploadResponse.result.status}`);
    }
    const pieceCid = getPieceCID();
    if (pieceCid === null) {
        throw new Error('Failed to calculate PieceCID during upload');
    }
    const finalizeBody = JSON.stringify({
        pieceCid: pieceCid.toString()
    });
    const finalizeResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].post(new URL(`pdp/piece/uploads/${uploadUuid}`, options.endpoint), {
        body: finalizeBody,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: TIMEOUT,
        signal: options.signal
    });
    if (finalizeResponse.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(finalizeResponse.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostPieceError"](`Failed to finalize upload: ${await finalizeResponse.error.response.text()}`);
        }
        throw finalizeResponse.error;
    }
    if (finalizeResponse.result.status !== 200) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostPieceError"](`Expected 200 OK for finalization, got ${finalizeResponse.result.status}`);
    }
    return {
        pieceCid,
        size: bytesUploaded
    };
}
async function findPiece(options) {
    const { pieceCid, endpoint } = options;
    const params = new URLSearchParams({
        pieceCid: pieceCid.toString()
    });
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].json.get(new URL(`pdp/piece?${params.toString()}`, endpoint), {
        retry: {
            statusCodes: [
                404
            ],
            retries: RETRIES,
            factor: FACTOR
        },
        timeout: TIMEOUT
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FindPieceError"](await response.error.response.text());
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TimeoutError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FindPieceError"]('Timeout waiting for piece to be found');
        }
        throw response.error;
    }
    const data = response.result;
    return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$piece$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"](data.pieceCid);
}
async function addPieces(options) {
    const { endpoint, dataSetId, pieces, extraData } = options;
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].post(new URL(`pdp/data-sets/${dataSetId}/pieces`, endpoint), {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pieces: pieces.map((piece)=>({
                    pieceCid: piece.toString(),
                    subPieces: [
                        {
                            subPieceCid: piece.toString()
                        }
                    ]
                })),
            extraData: extraData
        }),
        timeout: TIMEOUT
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddPiecesError"](await response.error.response.text());
        }
        throw response.error;
    }
    const location = response.result.headers.get('Location');
    const txHash = location?.split('/').pop();
    if (!location || !txHash || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(txHash)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LocationHeaderError"](location);
    }
    return {
        txHash: txHash,
        statusUrl: new URL(location, endpoint).toString()
    };
}
async function pollForAddPiecesStatus(options) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].json.get(options.statusUrl, {
        async onResponse (response) {
            if (response.ok) {
                const data = await response.clone().json();
                if (data.piecesAdded) {
                    return response;
                }
                throw new Error('Not added yet');
            }
        },
        retry: {
            shouldRetry: (ctx)=>ctx.error.message === 'Not added yet',
            retries: RETRIES,
            factor: FACTOR,
            minTimeout: MIN_TIMEOUT
        },
        timeout: 1000 * 60 * 5
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PollForAddPiecesStatusError"](await response.error.response.text());
        }
        throw response.error;
    }
    return response.result;
}
async function deletePiece(options) {
    const { endpoint, dataSetId, pieceId, extraData } = options;
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].json.delete(new URL(`pdp/data-sets/${dataSetId}/pieces/${pieceId}`, endpoint), {
        body: {
            extraData
        }
    });
    if (response.error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"].is(response.error)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$errors$2f$pdp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeletePieceError"](await response.error.response.text());
        }
        throw response.error;
    }
    return response.result;
}
async function ping(endpoint) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].get(new URL(`pdp/ping`, endpoint));
    if (response.error) {
        throw new Error('Ping failed');
    }
    return response.result;
}
function isReadableStream(value) {
    return typeof value === 'object' && value !== null && 'getReader' in value && typeof value.getReader === 'function';
}
function asReadableStream(data) {
    return isReadableStream(data) ? data : asyncIterableToReadableStream(data);
}
function isAsyncIterable(value) {
    return typeof value === 'object' && value !== null && Symbol.asyncIterator in value && typeof value[Symbol.asyncIterator] === 'function';
} //# sourceMappingURL=sp.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/calibration.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "claimTokens",
    ()=>claimTokens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/iso-web/src/http.js [app-route] (ecmascript)");
;
async function claimTokens(options) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$iso$2d$web$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["request"].json.get(`https://forest-explorer.chainsafe.dev/api/claim_token_all?address=${options.address}`, {
        timeout: 20000
    });
    if (response.error) {
        throw new Error(response.error.cause[0].error.ServerError);
    }
    return response.result;
} //# sourceMappingURL=calibration.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/capabilities.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capabilitiesListToObject",
    ()=>capabilitiesListToObject,
    "decodeAddressCapability",
    ()=>decodeAddressCapability
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/pad.js [app-route] (ecmascript)");
;
function capabilitiesListToObject(keys, values) {
    const capabilities = {};
    for(let i = 0; i < keys.length; i++){
        capabilities[keys[i]] = values[i];
    }
    return capabilities;
}
function decodeAddressCapability(capabilityValue) {
    if (capabilityValue.length > 66) {
        return '0x0000000000000000000000000000000000000000';
    }
    if (capabilityValue.length > 42) {
        return `0x${capabilityValue.slice(-40)}`;
    }
    if (capabilityValue.length < 42) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pad"])(capabilityValue, {
            size: 20
        });
    }
    return capabilityValue;
} //# sourceMappingURL=capabilities.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/format.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatBalance",
    ()=>formatBalance,
    "formatFraction",
    ()=>formatFraction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$dnum$2f$dist$2f$dnum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/dnum/dist/dnum.js [app-route] (ecmascript)");
;
function formatBalance(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$dnum$2f$dist$2f$dnum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["format"]([
        data?.value ?? 0n,
        data?.decimals ?? 18
    ], {
        compact: data?.compact ?? true,
        digits: data?.digits ?? 4
    });
}
function formatFraction(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$dnum$2f$dist$2f$dnum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["format"]([
        data?.value ?? 0n,
        data?.decimals ?? 18
    ], {
        compact: data?.compact ?? false,
        digits: data?.digits ?? 8
    });
} //# sourceMappingURL=format.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/metadata.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "METADATA_LIMITS",
    ()=>METADATA_LIMITS,
    "datasetMetadataObjectToEntry",
    ()=>datasetMetadataObjectToEntry,
    "metadataArrayToObject",
    ()=>metadataArrayToObject,
    "pieceMetadataObjectToEntry",
    ()=>pieceMetadataObjectToEntry
]);
const METADATA_LIMITS = {
    MAX_KEY_LENGTH: 32,
    MAX_VALUE_LENGTH: 128,
    MAX_KEYS_PER_DATASET: 10,
    MAX_KEYS_PER_PIECE: 5
};
function metadataArrayToObject(metadataArray) {
    const [keys, values] = metadataArray;
    const metadata = {};
    for(let i = 0; i < keys.length; i++){
        if (keys[i] === 'withCDN') {
            continue;
        }
        if (keys[i] === 'withIPFSIndexing') {
            continue;
        }
        if (keys[i] === 'ipfsRootCID') {
            continue;
        }
        metadata[keys[i]] = values[i];
    }
    return metadata;
}
function datasetMetadataObjectToEntry(metadataObject, metadataInternal) {
    const obj = {
        ...metadataObject ?? {},
        ...metadataInternal?.cdn ? {
            withCDN: ''
        } : {}
    };
    const entries = Object.entries(obj).sort((a, b)=>a[0].localeCompare(b[0])).map(([key, value])=>({
            key,
            value
        }));
    if (entries.length > METADATA_LIMITS.MAX_KEYS_PER_DATASET) {
        throw new Error('Metadata exceeds the maximum number of keys per data set');
    }
    for (const entry of entries){
        if (entry.key.length > METADATA_LIMITS.MAX_KEY_LENGTH) {
            throw new Error('Metadata key exceeds the maximum length');
        }
        if (entry.value.length > METADATA_LIMITS.MAX_VALUE_LENGTH) {
            throw new Error('Metadata value exceeds the maximum length');
        }
    }
    return entries;
}
function pieceMetadataObjectToEntry(metadataObject, metadataInternal) {
    const obj = {
        ...metadataObject ?? {},
        ...metadataInternal?.ipni ? {
            withIPNI: ''
        } : {},
        ...metadataInternal?.ipfsRootCID ? {
            ipfsRootCID: metadataInternal.ipfsRootCID
        } : {}
    };
    const entries = Object.entries(obj).sort((a, b)=>a[0].localeCompare(b[0])).map(([key, value])=>({
            key,
            value
        }));
    if (entries.length > METADATA_LIMITS.MAX_KEYS_PER_PIECE) {
        throw new Error('Metadata exceeds the maximum number of keys per piece');
    }
    for (const entry of entries){
        if (entry.key.length > METADATA_LIMITS.MAX_KEY_LENGTH) {
            throw new Error('Metadata key exceeds the maximum length');
        }
        if (entry.value.length > METADATA_LIMITS.MAX_VALUE_LENGTH) {
            throw new Error('Metadata value exceeds the maximum length');
        }
    }
    return entries;
} //# sourceMappingURL=metadata.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/pdp-capabilities.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CAP_IPNI_IPFS",
    ()=>CAP_IPNI_IPFS,
    "CAP_IPNI_PIECE",
    ()=>CAP_IPNI_PIECE,
    "CAP_LOCATION",
    ()=>CAP_LOCATION,
    "CAP_MAX_PIECE_SIZE",
    ()=>CAP_MAX_PIECE_SIZE,
    "CAP_MIN_PIECE_SIZE",
    ()=>CAP_MIN_PIECE_SIZE,
    "CAP_MIN_PROVING_PERIOD",
    ()=>CAP_MIN_PROVING_PERIOD,
    "CAP_PAYMENT_TOKEN",
    ()=>CAP_PAYMENT_TOKEN,
    "CAP_SERVICE_URL",
    ()=>CAP_SERVICE_URL,
    "CAP_STORAGE_PRICE",
    ()=>CAP_STORAGE_PRICE,
    "decodePDPCapabilities",
    ()=>decodePDPCapabilities,
    "encodePDPCapabilities",
    ()=>encodePDPCapabilities
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/fromHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/data/isHex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/utils/encoding/toBytes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$capabilities$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/capabilities.js [app-route] (ecmascript)");
;
;
const CAP_SERVICE_URL = 'serviceURL';
const CAP_MIN_PIECE_SIZE = 'minPieceSizeInBytes';
const CAP_MAX_PIECE_SIZE = 'maxPieceSizeInBytes';
const CAP_IPNI_PIECE = 'ipniPiece';
const CAP_IPNI_IPFS = 'ipniIpfs';
const CAP_STORAGE_PRICE = 'storagePricePerTibPerDay';
const CAP_MIN_PROVING_PERIOD = 'minProvingPeriodInEpochs';
const CAP_LOCATION = 'location';
const CAP_PAYMENT_TOKEN = 'paymentTokenAddress';
function decodePDPCapabilities(capabilities) {
    return {
        serviceURL: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToString"])(capabilities.serviceURL),
        minPieceSizeInBytes: BigInt(capabilities.minPieceSizeInBytes),
        maxPieceSizeInBytes: BigInt(capabilities.maxPieceSizeInBytes),
        ipniPiece: 'ipniPiece' in capabilities,
        ipniIpfs: 'ipniIpfs' in capabilities,
        storagePricePerTibPerDay: BigInt(capabilities.storagePricePerTibPerDay),
        minProvingPeriodInEpochs: BigInt(capabilities.minProvingPeriodInEpochs),
        location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToString"])(capabilities.location),
        paymentTokenAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$capabilities$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeAddressCapability"])(capabilities.paymentTokenAddress)
    };
}
function encodePDPCapabilities(pdpOffering, capabilities) {
    const capabilityKeys = [];
    const capabilityValues = [];
    capabilityKeys.push(CAP_SERVICE_URL);
    capabilityValues.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringToHex"])(pdpOffering.serviceURL));
    capabilityKeys.push(CAP_MIN_PIECE_SIZE);
    capabilityValues.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToBytes"])(pdpOffering.minPieceSizeInBytes)));
    capabilityKeys.push(CAP_MAX_PIECE_SIZE);
    capabilityValues.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToBytes"])(pdpOffering.maxPieceSizeInBytes)));
    if (pdpOffering.ipniPiece) {
        capabilityKeys.push(CAP_IPNI_PIECE);
        capabilityValues.push('0x01');
    }
    if (pdpOffering.ipniIpfs) {
        capabilityKeys.push(CAP_IPNI_IPFS);
        capabilityValues.push('0x01');
    }
    capabilityKeys.push(CAP_STORAGE_PRICE);
    capabilityValues.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToBytes"])(pdpOffering.storagePricePerTibPerDay)));
    capabilityKeys.push(CAP_MIN_PROVING_PERIOD);
    capabilityValues.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numberToBytes"])(pdpOffering.minProvingPeriodInEpochs)));
    capabilityKeys.push(CAP_LOCATION);
    capabilityValues.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringToHex"])(pdpOffering.location));
    capabilityKeys.push(CAP_PAYMENT_TOKEN);
    capabilityValues.push(pdpOffering.paymentTokenAddress);
    if (capabilities != null) {
        for (const [key, value] of Object.entries(capabilities)){
            capabilityKeys.push(key);
            if (!value) {
                capabilityValues.push('0x01');
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"])(value)) {
                capabilityValues.push(value);
            } else {
                capabilityValues.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBytes"])(value)));
            }
        }
    }
    return [
        capabilityKeys,
        capabilityValues
    ];
} //# sourceMappingURL=pdp-capabilities.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/rand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fallbackRandIndex",
    ()=>fallbackRandIndex,
    "fallbackRandU256",
    ()=>fallbackRandU256,
    "randIndex",
    ()=>randIndex,
    "randU256",
    ()=>randU256
]);
const crypto = globalThis.crypto;
function fallbackRandU256() {
    let result = 0n;
    for(let i = 0; i < 32; i++){
        result <<= 8n;
        result |= BigInt(fallbackRandIndex(256));
    }
    return result;
}
function randU256() {
    if (crypto?.getRandomValues != null) {
        const randU64s = new BigUint64Array(4);
        crypto.getRandomValues(randU64s);
        let result = 0n;
        randU64s.forEach((randU64)=>{
            result <<= 64n;
            result |= randU64;
        });
        return result;
    } else {
        return fallbackRandU256();
    }
}
function fallbackRandIndex(length) {
    return Math.floor(Math.random() * length);
}
function randIndex(length) {
    if (crypto?.getRandomValues != null) {
        const randomBytes = new Uint32Array(1);
        crypto.getRandomValues(randomBytes);
        return randomBytes[0] % length;
    } else {
        return fallbackRandIndex(length);
    }
} //# sourceMappingURL=rand.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/viem.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientFromTransport",
    ()=>clientFromTransport,
    "transportFromTransportConfig",
    ()=>transportFromTransportConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/clients/createClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/viem/_esm/clients/transports/http.js [app-route] (ecmascript)");
;
function clientFromTransport({ chain, transportConfig }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])({
        chain,
        transport: transportFromTransportConfig({
            transportConfig
        })
    });
}
function transportFromTransportConfig({ transportConfig }) {
    let transport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["http"])();
    if (transportConfig) {
        switch(transportConfig.type){
            case 'http':
                transport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["http"])(transportConfig.url, transportConfig);
                break;
            case 'webSocket':
                transport = webSocket(transportConfig.getSocket(), transportConfig);
                break;
            case 'fallback':
                transport = fallback(transportConfig.transports, transportConfig);
                break;
        }
    }
    return transport;
} //# sourceMappingURL=viem.js.map
}),
"[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$calibration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/calibration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$capabilities$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/capabilities.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$decode$2d$pdp$2d$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/decode-pdp-errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/format.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$metadata$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/metadata.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$pdp$2d$capabilities$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/pdp-capabilities.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$piece$2d$url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/piece-url.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$rand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/rand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$core$2f$dist$2f$src$2f$utils$2f$viem$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-core/dist/src/utils/viem.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
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
}),
];

//# sourceMappingURL=a6501_%40filoz_synapse-core_dist_src_9e891eee._.js.map