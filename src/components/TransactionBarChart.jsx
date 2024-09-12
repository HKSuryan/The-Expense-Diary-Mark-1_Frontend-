import React from 'react';
import "../css/TransactionBarChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionBarChart = ({ transactions }) => {


  const aggregatedTransactions = transactions.reduce((acc, t) => {
    const receiver = t["name"];
    const amount = parseFloat(t.amount.replace('Rs ', ''));
    
    if (!acc[receiver]) {
      acc[receiver] = 0;
    }


    acc[receiver] += (t.direction === 'in') ? amount : -amount;

    return acc;
  }, {});

  const data = {
    labels: Object.keys(aggregatedTransactions), 
    datasets: [
      {
        label: 'Net Amount in Rs',
        data: Object.values(aggregatedTransactions), 
        backgroundColor: Object.values(aggregatedTransactions).map(amount =>
          amount >= 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(250, 192, 192, 0.6)'
        ),
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Net Amount by Receiver',
        font: {
          size: 20,
        },
        color: '#333',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `Rs ${context.parsed.y.toFixed(2)}`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: '#333',
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
          color: '#333',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  return (
    <div className="barchart-container">
      <h2>Net Amount BarChart</h2>
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div></div>
  );
};

export default TransactionBarChart;
