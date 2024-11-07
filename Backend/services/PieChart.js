const express = require('express');
const router = express.Router()
const Transaction = require('../models/ClothTransaction');
const monthMiddleware = require('../middleware/GetMonth');


router.get('/piechart', monthMiddleware, async (req, res) => {
  try {
    const monthNumber = req.monthNumber;

    if (!monthNumber) {
      return res.status(400).json({ error: 'Invalid month name' });
    }

    const categoryCounts = {};

    const startOfMonth = new Date(Date.UTC(2000, monthNumber - 1, 1)); 
    const endOfMonth = new Date(Date.UTC(2000, monthNumber, 0, 23, 59, 59, 999));

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
    });

    if (transactions.length === 0) {
      return res.status(200).json({ pieChart: {} }); 
    }

    transactions.forEach(txn => {
      const txnDate = new Date(txn.dateOfSale);
      if (txnDate.getUTCMonth() === monthNumber - 1) {  
        const category = txn.category || 'Uncategorized';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    res.json({ pieChart: categoryCounts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
});



module.exports = router