import { SupaContext } from '@/Context/context';
import { TypeInquilinos } from '@/Types/types';
import { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const MoradiaChart = () => {
    const { typeInquilinos } = useContext(SupaContext);
    const [chartSize, setChartSize] = useState({ width: 600, height: 300 });

    const updateChartSize = () => {
        const newWidth = Math.min(window.innerWidth * 0.8, 600);
        const newHeight = Math.min(window.innerHeight * 0.4, 300); 
        setChartSize({ width: newWidth, height: newHeight });
    };

    useEffect(() => {
        updateChartSize();

        window.addEventListener('resize', updateChartSize);

        return () => {
            window.removeEventListener('resize', updateChartSize);
        };
    }, []);

    const categorizeInquilinosByTime = (inquilinos: TypeInquilinos[]) => {
        const now = new Date();
        const categories = {
            '1 mês': 0,
            '3 meses': 0,
            '6 meses': 0,
            '1 ano': 0,
            '2 anos': 0,
            '3 anos': 0,
            '5 anos+': 0,
        };

        typeInquilinos.forEach((inquilino) => {
            if (!inquilino.is_deleted) {
                const dataInicio = new Date(inquilino.created_at);
                const diffInMonths =
                    (now.getFullYear() - dataInicio.getFullYear()) * 12 +
                    (now.getMonth() - dataInicio.getMonth());

                if (diffInMonths <= 1) {
                    categories['1 mês'] += 1;
                } else if (diffInMonths <= 3) {
                    categories['3 meses'] += 1;
                } else if (diffInMonths <= 6) {
                    categories['6 meses'] += 1;
                } else if (diffInMonths <= 12) {
                    categories['1 ano'] += 1;
                } else if (diffInMonths <= 24) {
                    categories['2 anos'] += 1;
                } else if (diffInMonths <= 36) {
                    categories['3 anos'] += 1;
                } else {
                    categories['5 anos+'] += 1;
                }
            }
        });

        return Object.entries(categories).map(([name, Moradores]) => ({
            name,
            Moradores,
        }));
    };

    const data = categorizeInquilinosByTime(typeInquilinos);

    return (
        <LineChart width={chartSize.width} height={chartSize.height} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#f2b017" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Moradores" stroke="#FF8C00" />
        </LineChart>
    );
};
