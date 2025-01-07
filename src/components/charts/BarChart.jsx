
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ selectedMonth }) => {
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price Distribution',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/barchart', {
          params: { month: selectedMonth }
        });

        if (response.data) {
          const priceRanges = response.data;
          setBarData({
            labels: Object.keys(priceRanges),
            datasets: [
              {
                label: 'Price Distribution',
                data: Object.values(priceRanges),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
              }
            ]
          });
        }
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarData();
  }, [selectedMonth]);

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }
    }
  };

  return (
    <div className="bar-chart">
      <h2>Bar Chart for Month - {selectedMonth}</h2>
      <Bar data={barData} options={options} />
    </div>
  );
};

export default BarChart;
