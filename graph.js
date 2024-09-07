// graph.js
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

const generateGraph = async (attendanceData, outputPath) => {
  const dates = attendanceData.map((record) => record.date);
  const hoursWorked = attendanceData.map((record) => {
    const inTime = new Date(record.inTime);
    const outTime = new Date(record.outTime || new Date());
    return (outTime - inTime) / (1000 * 60 * 60); // hours worked
  });

  const width = 500;
  const height = 300;
  const canvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Hours Worked',
          data: hoursWorked,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
  };

  const image = await canvas.renderToBuffer(configuration);
  fs.writeFileSync(outputPath, image);
};

module.exports = { generateGraph };
