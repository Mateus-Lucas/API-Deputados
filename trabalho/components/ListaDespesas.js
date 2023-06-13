import React, { useEffect, useState } from 'react';
import apiDeputados from '@/services/apiDeputados';
import { useRouter } from 'next/router';

function ListaDespesas() {
    const [data, setData] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseDeputados = await apiDeputados.get('/deputados');
                const deputados = responseDeputados.data.dados;

                const despesasPromises = deputados.map(async (item) => {
                    const responseDespesas = await apiDeputados.get(`/deputados/${item.id}/despesas`);
                    const despesas = responseDespesas.data.dados.map((despesa) => despesa.DeputadoDespesas.ValorDocumento);
                    return {
                        deputadoId: item.id,
                        despesas: despesas
                    };
                });

                const despesasResult = await Promise.all(despesasPromises);
                setData(despesasResult);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data.length > 0 ? (
                <div>
                    {data.map((item) => (
                        <div key={item.deputadoId}>
                            <p>Deputado ID: {item.deputadoId}</p>
                            <ul>
                                {item.despesas.map((despesa, index) => (
                                    <li key={index}>{despesa}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default ListaDespesas;
