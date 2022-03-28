import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class RadialBarGraph extends Component {
  constructor(props) {
    super(props);

    const { percent } = props;

    this.state = {
      options: {
        colors: ["#0ac47e"],
        plotOptions: {
          radialBar: {
            offsetY: -15,
            track: {
              background: "#e6e6e6",
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                fontSize: '20px',
                fontFamily: 'industry',
                fontWeight: 900,
                offsetY: 7,
              },
            },
          },
        },
      },
      series: [percent],
      labels: ['A'],
    };
  }

  render() {
    return (
      <div className="radialBar">
        <Chart
          options={this.state.options}
          series={this.state.series}
          labels={this.state.labels}
          type="radialBar"
          height="140"
        />
      </div>
    );
  }
}

export default RadialBarGraph;