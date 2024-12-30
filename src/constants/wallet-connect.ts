import { CoreTypes, ProposalTypes } from '@walletconnect/types';
import { CHAIN_ID } from './env';

export enum SageMethod {
    ChainId = 'chip0002_chainId',
    Connect = 'chip0002_connect',
    GetPublicKeys = 'chip0002_getPublicKeys',
    FilterUnlockedCoins = 'chip0002_filterUnlockedCoins',
    GetAssetCoins = 'chip0002_getAssetCoins',
    GetAssetBalance = 'chip0002_getAssetBalance',
    SignCoinSpends = 'chip0002_signCoinSpends',
    SignMessage = 'chip0002_signMessage',
    SendTransaction = 'chip0002_sendTransaction',
    Transfer = 'chia_transfer',
    TakeOffer = 'chia_takeOffer',
    CreateOffer = 'chia_createOffer',
    CancelOffer = 'chia_cancelOffer',
    GetNfts = 'chia_getNfts',
    Send = 'chia_send',
    GetAddress = 'chia_getAddress',
}

export const REQUIRED_NAMESPACES: ProposalTypes.RequiredNamespaces = {
    chia: {
        methods: Object.values(SageMethod),
        chains: [CHAIN_ID],
        events: [],
    },
};

export const METADATA: CoreTypes.Metadata = {
    name: 'Test App',
    description: 'A test application for WalletConnect.',
    url: '#',
    icons: ['https://walletconnect.com/walletconnect-logo.png'],
};
