import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import apiDeputados from '../services/apiDeputados';

const ApexChart = ({ partidos }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        series: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16 ],
        options: {
          chart: {
            width: '50%', 
            type: 'pie',
          },
          labels: ['PL', 'Team B', 'Team C', 'Team D', 'Team E', 'Teamcuma'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: '50%', 
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
      };
      setChartData(data);
    };

    fetchData();
  }, []);

  const DynamicReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

  return (
    <div id="chart">
      {chartData && (
        <DynamicReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={chartData.options.chart.width}
        />
      )}
    </div>
  );
};

export default ApexChart;

export async function getServerSideProps(context) {
  const part = await apiDeputados.get('/partidos');
  const partidos = part.data.dados;

  return {
    props: { partidos },
  };
}
