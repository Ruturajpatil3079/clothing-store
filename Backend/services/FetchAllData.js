const express = require('express');
const router = express.Router();
const Transaction = require('../models/ClothTransaction');
const { initializeDatabase } = require('../middleware/FetchData');

router.get('/transactions', initializeDatabase, async (req, res) => {
  try {
    const { search = '', month, page = 1, perPage = 10 } = req.query;
    const query = {};

   
    if (month) {
      const monthIndex = new Date(`${month} 1`).getMonth() + 1; 
      query.$expr = { $eq: [{ $month: "$dateOfSale" }, monthIndex] };
    }


    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { price: !isNaN(search) ? Number(search) : undefined }
      ].filter(Boolean); 
    }

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.json({ total, transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

module.exports = router;
