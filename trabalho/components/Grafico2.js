import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import apiDeputados from '../services/apiDeputados';
import { useRouter } from 'next/router';

const ApexChart = () => {
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
          series: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16], 
          options: {
            chart: {
              width: '50%',
              type: 'pie',
            },
            title: {
              text: 'Quantidades de membros',
              style: {
                fontSize: '28px',
                fontWeight: 'bold',
              },
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
      } catch (error) {
        console.error('Erro ao obter dados dos partidos:', error);
      }
    };

    fetchData();
  }, [id]); 

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
