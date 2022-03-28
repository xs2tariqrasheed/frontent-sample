/* eslint-disable react/prop-types */
import React from 'react';
import { Chart, ScatterController } from 'chart.js/auto';
// eslint-disable-next-line import/no-unresolved
import { Scatter } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ScatterController, ChartDataLabels);

function ScatterChart({ currPrice, minPrice, avgPrice, maxPrice }) {
  const HandleResize = () => {
    if (window.innerWidth < 720) {
      return (
        <div className="">
          <Scatter data={data} options={options} height={150} />
        </div>
      );
    }
    return (
      <div className="">
        <Scatter data={data} options={options} height={35} />
      </div>
    );
  };

  const data = {
    datasets: [
      {
        data: [
          { x: minPrice, y: 1, label: `MIN\n$${minPrice}` },
          { x: currPrice, y: 1, label: `$${Math.round(currPrice)}` },
          { x: avgPrice, y: 1, label: `AVG\n$${Math.round(avgPrice)}` },
          { x: maxPrice, y: 1, label: `MAX\n$${maxPrice}` },
        ],
        pointBackgroundColor: ['#0ac47e', '#FFF', '#0ac47e', '#0ac47e'],
        pointBorderColor: [
          '#0ac47e',
          'rgba(10, 196, 126, 0.48)',
          '#0ac47e',
          '#0ac47e',
        ],
        pointBorderWidth: [1, 10, 1, 1],
        pointRadius: [10, 18, 10, 10],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 2,
        display: true,
        ticks: {
          display: false,
          stepSize: 1,
        },
        grid: {
          display: true,
          lineWidth: 6,
          color: [
            'rgba(255, 255, 255, 0.0)',
            '#0ac47e',
            'rgba(255, 255, 255, 0.0)',
          ],
        },
      },
      x: {
        display: false,
        ticks: {
          dispaly: false,
        },
      },
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      legend: {
        display: false,
      },
      datalabels: {
        color: ['#000', '#322c8f', '#000', '#000'],
        align: ['start', 'end', 'start', 'start'],
        offset: 20,
        font: [
          {
            family: "'industry', 'Helvetica', 'Arial', sans-serif",
            size: '24',
            weight: '600',
          },
          {
            family: "'industry', 'Helvetica', 'Arial', sans-serif",
            size: '42',
            style: 'italic',
            weight: '900',
          },
          {
            family: "'industry', 'Helvetica', 'Arial', sans-serif",
            size: '24',
            weight: '600',
          },
          {
            family: "'industry', 'Helvetica', 'Arial', sans-serif",
            size: '24',
            weight: '600',
          },
        ],
      },
    },
  };
  return <HandleResize />;
}

export default ScatterChart;
