import { SupaContext } from '@/Context/context';
import React, { useContext, PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DataPoint = {
    name: string;
    Moradores: number; 
    fill: string;
};

const BarChartComponent = () => {
    const { contextApartamentos, typeInquilinos } = useContext(SupaContext);
    const [data, setData] = useState<DataPoint[]>([]);

    useEffect(() => {
        const inquilinosPorApartamento = contextApartamentos.map(apartamento => {
            const inquilinos = typeInquilinos.filter(inquilino => inquilino.apartamento_id === String(apartamento.id));
            return {
                apartamentoId: apartamento.id,
                quantidadeInquilinos: inquilinos.length,
                inquilinos: inquilinos 
            };
        });

        const totalInquilinos = inquilinosPorApartamento.reduce((acc, apartamento) => {
            return acc + apartamento.quantidadeInquilinos;
        }, 0);

        const quantidadeApartamentos = inquilinosPorApartamento.length;

        const media = quantidadeApartamentos > 0 ? totalInquilinos / quantidadeApartamentos : 0;

        const newData: DataPoint[] = [
            { name: 'Atual', Moradores:  parseFloat(media.toFixed(1)), fill: '#FFD9D9' },
            { name: 'Meta', Moradores: 5.0, fill: '#3d9112c2' },
            { name: 'Máximo', Moradores: 7.0, fill: '#7594ba' },
        ];
        setData(newData);
    }, [contextApartamentos, typeInquilinos]);

    return (
        <ResponsiveContainer width={250} height={250}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Moradores" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
