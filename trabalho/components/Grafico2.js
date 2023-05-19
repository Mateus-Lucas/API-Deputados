import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import apiDeputados from '../services/apiDeputados';

const ApexChart = () => {
  const [chartData, setChartData] = useState(null);

  let siglas = []
  let membros = []

  console.log(siglas)

  useEffect(() => {

    apiDeputados.get('/partidos').then(resultado=>{
      const partidos = resultado.data.dados
      

      partidos.map(item=>{
        siglas.push(item.sigla)
      })
      console.log(siglas);

    })

    const fetchData = async () => {
      const data = {
        series: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16 ],
        options: {
          chart: {
            width: '50%', 
            type: 'pie',
          },
          labels: siglas,
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

