import axios from 'axios';
import { utilService } from './utilService';

const BITCOIN_API = 'https://blockchain.info/tobtc?currency=USD&value=1';
const BITCOIN_KEY = 'Bitcoin_Rate'
export const bitcoinService = {
    getRate,
    getMarketPrice,
    // getConfirmedTransactions
}

async function getRate() {
    const rate = utilService.load(BITCOIN_KEY)
    if (rate) return rate
    try {
        const res = await axios.get(BITCOIN_API)
        utilService.store(BITCOIN_KEY, res.data)
        return res.data;
    }
    catch (err) {
        console.log('Cant get Rate', err)
        throw err
    }
}

async function getMarketPrice(period = 'year') {
    try {
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=1${period}&format=json&cors=true`)
        return res.data.values;
    }
    catch (err) {
        console.log('Cant get Rate', err)
        throw err
    }
}

