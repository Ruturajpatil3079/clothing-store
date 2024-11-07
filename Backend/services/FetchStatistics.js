const express = require('express');
const router = express.Router()
const Transaction = require('../models/ClothTransaction');
const monthMiddleware = require('../middleware/GetMonth');


router.get('/statistics',monthMiddleware, async (req, res) => {
    try {
        const monthNumber = req.monthNumber;  

        if (!monthNumber) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        const startOfMonth = new Date(Date.UTC(2000, monthNumber - 1, 1)); 
        const endOfMonth = new Date(Date.UTC(2000, monthNumber, 0, 23, 59, 59, 999)); 

        const transactions = await Transaction.find();

        const filteredTransactions = transactions.filter(transaction => {
            const saleDate = new Date(transaction.dateOfSale);
            const saleMonth = saleDate.getUTCMonth(); 
            const saleDay = saleDate.getUTCDate(); 

            const transactionDate = new Date(Date.UTC(2000, saleMonth, saleDay));  

            return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
        });

        const totalSale = filteredTransactions.reduce((sum, txn) => sum + txn.price, 0);
        const totalSold = filteredTransactions.filter(txn => txn.sold).length;
        const totalNotSold = filteredTransactions.length - totalSold;

        res.json({
            totalSale,
            totalSold,
            totalNotSold,
            transactions: filteredTransactions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router