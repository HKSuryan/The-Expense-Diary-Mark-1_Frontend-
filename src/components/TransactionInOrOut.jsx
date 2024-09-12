import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import '../css/TransactionInOrOut.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from 'chart.js';
import {
  parse,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} from 'date-fns';


const customPlugin = {
  id: 'customPlugin',
  afterDraw: (chart) => {
    if (!chart.data || !chart.data.datasets || chart.data.datasets.length < 2) {
      return; 
    }

    const moneyInDataset = chart.data.datasets.find(ds => ds.label === 'Money In (Rs)');
    const moneyOutDataset = chart.data.datasets.find(ds => ds.label === 'Money Out (Rs)');

    if (!moneyInDataset || !moneyOutDataset) {
      return; 
    }

    const totalMoneyIn = moneyInDataset.data.reduce((sum, data) => sum + (data.y || 0), 0);
    const totalMoneyOut = moneyOutDataset.data.reduce((sum, data) => sum + (data.y || 0), 0);
    const profitLoss = totalMoneyIn - totalMoneyOut;

    const { ctx, chartArea: { top, right, width } } = chart;
    ctx.save();
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#4CAF50'; // Color for Money In
    ctx.fillText(`Money In: Rs ${totalMoneyIn.toFixed(2)}`, right - 150, top + 20); // Adjust the position
    ctx.fillStyle = '#FF5733'; // Color for Money Out
    ctx.fillText(`Money Out: Rs ${totalMoneyOut.toFixed(2)}`, right - 150, top + 40); // Adjust the position
    ctx.fillStyle = profitLoss >= 0 ? '#4CAF50' : '#FF5733'; // Color based on profit/loss
    ctx.fillText(`Profit/Loss: Rs ${profitLoss.toFixed(2)}`, right - 150, top + 60); // Adjust the position

    ctx.restore();
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  zoomPlugin,
  customPlugin 
);

const TransactionByTime = ({ transactions }) => {
  const chartRef = useRef(null);
  const [timeGranularity, setTimeGranularity] = useState('year');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const parsedTransactions = transactions.map(t => ({
    date: parse(t.date, 'dd-MM-yyyy HH:mm:ss', new Date()),
    amount: parseFloat(t.amount.replace('Rs ', '')),
    type: t.direction,
  }));

  const groupByTime = (granularity) => {
    const now = new Date();
    switch (granularity) {
      case 'year':
        return parsedTransactions.filter(t => t.date >= startOfYear(now) && t.date <= endOfYear(now));
      case 'month':
        return parsedTransactions.filter(t => t.date >= startOfMonth(now) && t.date <= endOfMonth(now));
      case 'week':
        return parsedTransactions.filter(t => t.date >= startOfWeek(now) && t.date <= endOfWeek(now));
      case 'day':
        return parsedTransactions.filter(t => t.date >= startOfDay(now) && t.date <= endOfDay(now));
      default:
        return parsedTransactions;
    }
  };

  useEffect(() => {
    setFilteredTransactions(groupByTime(timeGranularity));
  }, [timeGranularity]);

  const moneyInData = filteredTransactions.filter(t => t.type === 'in');
  const moneyOutData = filteredTransactions.filter(t => t.type === 'out');

  const data = {
    labels: filteredTransactions.map(t => t.date),
    datasets: [
      {
        label: 'Money In (Rs)',
        data: moneyInData.map(t => ({ x: t.date, y: t.amount })),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Money Out (Rs)',
        data: moneyOutData.map(t => ({ x: t.date, y: t.amount })),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeGranularity,
          tooltipFormat: 'dd MMM yyyy',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (Rs)',
        },
      },
    },
    plugins: {
      customPlugin: {
        id: 'customPlugin',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          enabled: true,
          mode: 'x',
          drag: true,
          threshold: 10,
        },
      },
    },
  };

  const handleResetZoom = () => {
    chartRef.current.resetZoom();
  };

  return (
    <div className='tinorout'>
      <div className="header-section">
        <h2>Money In/Out Over Time</h2>
        <div className="controls">
          <label>Time Granularity: </label>
          <select value={timeGranularity} onChange={(e) => setTimeGranularity(e.target.value)}>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>
      </div>
      <div className="chart-container">
        <Line ref={chartRef} data={data} options={options} />
        <button className="reset-button" onClick={handleResetZoom}>Reset Zoom</button>
      </div>
    </div>
  );
};

export default TransactionByTime;
