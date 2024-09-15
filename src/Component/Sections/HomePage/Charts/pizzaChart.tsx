import { SupaContext } from '@/Context/context';
import { TypeInquilinos } from '@/Types/types';
import React, { useState, useContext } from 'react';
import { PieChart, Pie, ResponsiveContainer, Sector, Cell } from 'recharts';

const COLORS = ['#ffbb0094', '#B99634', '#FFBF08'];

const getInquilinoStats = (inquilinos: TypeInquilinos[]) => {
    const stats = {
        Moradores: 0,
        Proprietários: 0,
        Inquilinos: 0,
    };

    inquilinos.forEach((inquilino) => {
        if (inquilino.status === 'morador') {
            stats.Moradores += 1;
        } else if (inquilino.status === 'proprietario') {
            stats.Proprietários += 1;
        } else if (inquilino.status === 'inquilino') {
            stats.Inquilinos += 1;
        }
    });

    return [
        { name: 'Moradores', value: stats.Moradores },
        { name: 'Proprietários', value: stats.Proprietários },
        { name: 'Inquilinos', value: stats.Inquilinos },
    ];
};

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Quantidade ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Porcentagem ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const PizzaChart = () => {
    const { typeInquilinos } = useContext(SupaContext) as { typeInquilinos: TypeInquilinos[] };
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const data = getInquilinoStats(typeInquilinos);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PizzaChart;
