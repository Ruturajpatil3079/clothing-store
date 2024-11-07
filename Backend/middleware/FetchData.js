const axios = require('axios');
const Transaction = require('../models/ClothTransaction');

exports.initializeDatabase = async (req, res, next) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Transaction.deleteMany();

    await Transaction.insertMany(transactions);

    console.log('Database initialized with new data');
    next();
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
};
