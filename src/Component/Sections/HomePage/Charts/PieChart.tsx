import { SupaContext } from '@/Context/context';
import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PieData {
    name: string;
    value: number;
    fill: string;
}

const PieChartComponent = () => {
    const { contextApartamentos, typeInquilinos } = useContext(SupaContext);
    const [data, setData] = useState<PieData[]>([]); // Especifica o tipo do estado

    useEffect(() => {
        const calculateData = () => {
            const totalApartamentos = contextApartamentos.length;
            const ocupados = typeInquilinos.filter(inquilino => !inquilino.is_deleted).length;
            const metaAno = Math.ceil(totalApartamentos * 0.92); 
            const disponivel = totalApartamentos - ocupados - (metaAno - ocupados);

            return [
                { name: 'Meta do Ano', value: Math.max(0, metaAno - ocupados), fill: '#3d9112c2' },
                { name: 'Realidade', value: ocupados, fill: '#FFD9D9' },
                { name: 'Dispónível', value: Math.max(0, disponivel), fill: '#7594ba' },
            ];
        };

        const updatedData = calculateData();
        setData(updatedData);

    }, [contextApartamentos, typeInquilinos])



    return (
        <ResponsiveContainer width={200} height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={4}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;
