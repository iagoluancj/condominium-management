import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Dados ajustados para refletir a meta do ano, a realidade e o total
const data = [
    { name: 'Meta do Ano', value: 10, fill: '#3d9112c2' },
    { name: 'Realidade', value: 82, fill: '#FFD9D9' },
    { name: 'Total', value: 10, fill: '#E9F3FF' }, // Adiciona a parte cinza para o total restante
];

export default class PieChartComponent extends PureComponent {
    render() {
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
                        paddingAngle={1}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
