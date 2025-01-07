import React from 'react';
import Statistics from './Statistics';
import myclass from './charts/charts.module.css';

const Charts = ({ selectedMonth }) => {
  return (
    <div className={`${myclass.chartscontainer} container `}>
      <div className={`${myclass.chartsitem}`}>
        <h2>Statistics - {selectedMonth}</h2>
        <Statistics selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default Charts;
