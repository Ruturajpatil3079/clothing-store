
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./connection');

const app = express();
app.use(cors());
app.use(express.json());



// Endpoint to List Transactions with Search and Pagination
app.use('/products', require('./services/FetchAllData'))

// // Endpoint for Statistics
app.use('/products', require('./services/FetchStatistics'))

// // Endpoint for Bar Chart
app.use('/products/charts', require('./services/charts/BarChart'))

// // Endpoint for Pie Chart
app.use('/products/charts', require('./services/charts/PieChart'))

// Endpoint for Combine API
app.use('/products/transactions', require('./services/CombineAPI'))


// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
