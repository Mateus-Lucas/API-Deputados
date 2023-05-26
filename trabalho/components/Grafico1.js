import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import apiDeputados from '../services/apiDeputados';

const ApexChart = () => {
  const color_blue = ['#008FFB'];
  const color_black = ['#000000'];
  const [chartData, setChartData] = useState(null);
  const [quantidades, setQuantidades] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultado = await apiDeputados.get('/partidos');
        const partidos = resultado.data.dados;
        const siglas = partidos.map(item => item.sigla);

        const promises = partidos.map(async (item) => {
          const partido = await apiDeputados.get('/partidos/' + item.id);
          const membros = partido.data.dados.status.totalMembros;
          return membros;
        });

        const quantidade = await Promise.all(promises);
        setQuantidades(quantidade);

        const data = {
          categories: siglas,
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
          <h1 className='text-center bg-secondary text-white'>Quantidades de membros por partido</h1>
          <DynamicApexChart options={chartData.options} series={[{ data: quantidades }]} type="bar" height={350} />
        </div>
      )}
    </div>
  );
};

export default ApexChart;