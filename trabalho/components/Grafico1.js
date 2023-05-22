import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import apiDeputados from '../services/apiDeputados';

const ApexChart = () => {
  const color_blue = ['#008FFB'];
  const color_black = ['#000000'];
  const [chartData, setChartData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const resultado = await apiDeputados.get('/partidos');
        const partidos = resultado.data.dados;
        const siglas = partidos.map(item => item.sigla);

        // const num_id = await apiDeputados.get('/partidos/' + id);
        // const num_part = num_id.data.dados;
        // const quant = num_part.map(item => item.status.totalMembros);

        // const membros = quant.map(() => '6');

        console.log(partidos)
        // console.log(num_part)
        
        const data = {
          series: [{
            data: [21, 22, 10, 28, 16, 21, 13, 30, 12, 15, 15, 15, 15, 15, 15]
          }],
          options: {
            chart: {
              height: 350,
              type: 'bar',
              events: {
                click: function (chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            colors: color_blue,
            plotOptions: {
              bar: {
                columnWidth: '65%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: siglas,
              labels: {
                style: {
                  colors: color_black,
                  fontSize: '12px'
                }
              }
            }
          }
        };

        setChartData(data);
      } catch (error) {
        console.error('Erro ao obter dados dos partidos:', error);
      }
    };

    fetchData();
  }, [id]);

  const DynamicApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });

  return (
    <div id="chart">
      {chartData && (
        <div>
          <h2 className='text-center'>Quantidades de membros por partidos</h2>
          <DynamicApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
      )}
    </div>
  );
};

export default ApexChart;
