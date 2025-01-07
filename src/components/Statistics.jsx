import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Statistics = ({ selectedMonth }) => {
  const [stats, setStats] = useState({
    totalSale: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/statistics`, {
          params: { month: selectedMonth }
        });
        
        setStats({
          totalSale: response.data.totalSale,
          totalSolds: response.data.totalSold,
          totalNotSoldItems: response.data.totalNotSold,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="statistics-card">
      <Card style={{ width: '100%' }} className="p-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <span>Total Sale</span>
            <span>{stats.totalSale}</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span>Total Sold Items</span>
            <span>{stats.totalSolds}</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span>Total Not Sold Items</span>
            <span>{stats.totalNotSoldItems}</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Statistics;
