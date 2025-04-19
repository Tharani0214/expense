import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions = [] }) => {
  // Defensive: Ensure it's always an array
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Transaction Summary',
        data: [income, expenses],
        backgroundColor: ['#4CAF50', '#FF5722'],
        borderColor: ['#388E3C', '#E64A19'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pie-chart">
      <h3>Income vs Expenses</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
