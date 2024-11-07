// Import dependencies
const express = require('express');
const router = express.Router();
const axios = require('axios');
const monthMiddleware = require('../middleware/GetMonth');

async function fetchApiData(url, params = {}) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    return null; 
  }
}

router.get('/combineddata', monthMiddleware, async (req, res) => {
  try {
    const month = req.monthNumber;
    const { search = '', page = 1, perPage = 10 } = req.query;

    const [statisticsData, barChartData, pieChartData, transactionsData] = await Promise.all([
      fetchApiData('http://localhost:3000/statistics', { month }),
      fetchApiData('http://localhost:3000/barchart', { month }),
      fetchApiData('http://localhost:3000/piechart', { month }),
      fetchApiData('http://localhost:3000/transactions', { search, page, perPage }) 
    ]);

    const combinedResponse = {
      statistics: statisticsData,
      barChart: barChartData,
      pieChart: pieChartData,
      transactions: transactionsData 
    };

    res.json(combinedResponse);
  } catch (error) {
    console.error('Error in /combineddata:', error.message);
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

module.exports = router;
