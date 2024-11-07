import React from 'react';
import Statistics from './Statistics';
import myclass from './charts/charts.module.css';

const Charts = ({ selectedMonth }) => {
  return (
    <div className={`${myclass.chartscontainer} container mt-3`}>
      <div className={`${myclass.chartsitem}`}>
        <h3>Statistics - {selectedMonth}</h3>
        <Statistics selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default Charts;
