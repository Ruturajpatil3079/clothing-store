const express = require('express');
const router = express.Router()
const Transaction = require('../models/ClothTransaction');
const monthMiddleware = require('../middleware/GetMonth');

router.get('/barchart',monthMiddleware, async (req, res) => {
    try {
        const monthNumber = req.monthNumber; 

        if (!monthNumber) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        const startOfMonth = new Date(Date.UTC(2000, monthNumber - 1, 1)); 
        const endOfMonth = new Date(Date.UTC(2000, monthNumber, 0, 23, 59, 59, 999)); 


        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0,
        };

        const transactions = await Transaction.find();

        const filteredTransactions = transactions.filter(txn => {
            const txnDate = new Date(txn.dateOfSale);

            const txnMonthDay = new Date(Date.UTC(2000, txnDate.getUTCMonth(), txnDate.getUTCDate()));

            return txnMonthDay >= startOfMonth && txnMonthDay <= endOfMonth;
        });


        if (filteredTransactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this month' });
        }

        const thresholds = [
            { max: 100, range: '0-100' },
            { max: 200, range: '101-200' },
            { max: 300, range: '201-300' },
            { max: 400, range: '301-400' },
            { max: 500, range: '401-500' },
            { max: 600, range: '501-600' },
            { max: 700, range: '601-700' },
            { max: 800, range: '701-800' },
            { max: 900, range: '801-900' },
            { max: Infinity, range: '901-above' }, 
          ];
          
          filteredTransactions.forEach(txn => {
            const price = txn.price;
            const range = thresholds.find(t => price <= t.max).range;
            priceRanges[range]++;
          });

        res.json(priceRanges);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch bar chart data' });
    }
});

module.exports = router