import React, { PureComponent } from 'react';
import { BiBorderRadius } from 'react-icons/bi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados ajustados para refletir o total geral, a realidade e a meta
const data = [
    { name: 'Atual', value: 6, fill: '#FFD9D9' },
    { name: 'Meta', value: 4, fill: '#3d9112c2' },
    { name: 'Máximo', value: 7, fill: '#E9F3FF' },
];

export default class BarChartComponent extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width={250} height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value"/>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
