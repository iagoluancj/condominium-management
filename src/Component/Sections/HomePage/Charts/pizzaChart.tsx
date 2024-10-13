import { SupaContext } from '@/Context/context';
import { TypeInquilinos } from '@/Types/types';
import React, { useState, useContext, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Sector, Cell } from 'recharts';

const COLORS = ['#755706', '#B99634', '#ffbb00'];

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
    const [windowWidth, setWindowWidth] = useState<number | null>(null); 
    const [chartSize, setChartSize] = useState({ width: 400, height: 400 });

    const updateChartSize = () => {
        const newWidth = Math.min(window.innerWidth * 0.8, 400);
        const newHeight = Math.min(window.innerHeight * 0.4, 400);
        setChartSize({ width: newWidth, height: newHeight });
        setWindowWidth(window.innerWidth);
    };

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const data = getInquilinoStats(typeInquilinos);

    useEffect(() => {
        updateChartSize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateChartSize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', updateChartSize);
            }
        };
    }, []);

    return (
        <>
            {windowWidth !== null && windowWidth < 800 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                    <p>Este gráfico não está disponível neste dispositivo, visualize atráves de um dispositivo de maioir resolução.</p>
                    <p><i>Desktop, Notebook ou Tablet</i></p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={chartSize.height}>
                    <PieChart width={chartSize.width} height={chartSize.height}>
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
            )}
        </>
    );
};

export default PizzaChart;
