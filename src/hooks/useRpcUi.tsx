import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { useJsonRpc } from '../contexts/JsonRpcContext';

export function useRpcUi() {
    const rpc = useJsonRpc();

    const [responseData, setResponseData] = useState<any>(null);
    const [eager, setEager] = useState(false);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [coinIds, setCoinIds] = useState('');
    const [includeLocked, setIncludeLocked] = useState(false);
    const [assetId, setAssetId] = useState('');
    const [type, setType] = useState('');
    const [coinSpends, setCoinSpends] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [message, setMessage] = useState('');
    const [spendBundle, setSpendBundle] = useState('');

    function handlePromise(promise: Promise<any>) {
        promise
            .then((data) => {
                console.log(data);
                setResponseData(data);
            })
            .catch((error) => {
                console.error(error);
                setResponseData({ error: error.message });
            });
    }

    function submitButton(name: string, request: () => Promise<any>) {
        return (
            <Button
                fullWidth
                variant='contained'
                onClick={() => handlePromise(request())}
            >
                {name}
            </Button>
        );
    }

    const commands = {
        chip0002_chainId: [submitButton('Chain Id', () => rpc.chainId({}))],
        chip0002_connect: [
            booleanOption('Eager', eager, setEager),
            submitButton('Connect', () => rpc.connect({ eager })),
        ],
        chip0002_getPublicKeys: [
            numberOption('Offset', offset, setOffset),
            numberOption('Limit', limit, setLimit),
            submitButton('Get Public Keys', () =>
                rpc.getPublicKeys({ limit, offset }),
            ),
        ],
        chip0002_filterUnlockedCoins: [
            stringOption('Coin Ids', coinIds, setCoinIds),
            submitButton('Filter Unlocked Coins', () =>
                rpc.filterUnlockedCoins({
                    coinNames:
                        coinIds.trim().length > 0
                            ? coinIds
                                  .trim()
                                  .split(',')
                                  .map((coinId) => coinId.trim())
                            : [],
                }),
            ),
        ],
        chip0002_getAssetCoins: [
            stringOption('Type', type, setType),
            stringOption('Asset Id', assetId, setAssetId),
            booleanOption('Include Locked', includeLocked, setIncludeLocked),
            numberOption('Offset', offset, setOffset),
            numberOption('Limit', limit, setLimit),
            submitButton('Get Asset Coins', () =>
                rpc.getAssetCoins({
                    type: (type as any) || null,
                    assetId: assetId || null,
                    includeLocked,
                    offset,
                    limit,
                }),
            ),
        ],
        chip0002_getAssetBalance: [
            stringOption('Type', type, setType),
            stringOption('Asset Id', assetId, setAssetId),
            submitButton('Get Asset Coins', () =>
                rpc.getAssetBalance({
                    type: (type as any) || null,
                    assetId: assetId || null,
                }),
            ),
        ],
        chip0002_signCoinSpends: [
            stringOption('Coin Spends', coinSpends, setCoinSpends),
            submitButton('Sign Coin Spends', () =>
                rpc.signCoinSpends({ coinSpends: JSON.parse(coinSpends) }),
            ),
        ],
        chip0002_signMessage: [
            stringOption('Public Key', publicKey, setPublicKey),
            stringOption('Message', message, setMessage),
            submitButton('Sign Message', () =>
                rpc.signMessage({ publicKey, message }),
            ),
        ],
        chip0002_sendTransaction: [
            stringOption('Spend Bundle', spendBundle, setSpendBundle),
            submitButton('Send Transaction', () =>
                rpc.sendTransaction({ spendBundle: JSON.parse(spendBundle) }),
            ),
        ],
    };

    return { commands, responseData };
}

function stringOption(
    name: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
) {
    return (
        <TextField
            fullWidth
            label={name}
            variant='outlined'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

function numberOption(
    name: string,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
) {
    return (
        <TextField
            fullWidth
            type='number'
            label={name}
            variant='outlined'
            value={isNaN(value) ? '' : value}
            onChange={(e) => {
                setValue(e.target.value ? +e.target.value : NaN);
            }}
        />
    );
}

function booleanOption(
    name: string,
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>,
) {
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={(e) => setValue(e.target.checked)}
                    />
                }
                label={name}
            />
        </FormGroup>
    );
}
