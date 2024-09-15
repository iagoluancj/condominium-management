import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Moradores', value: 80 },
  { name: 'Proprietários', value: 10 },
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

export const DonutChart = () => (
  <PieChart width={300} height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={70}
      outerRadius={100}
      fill="#8884d8"
      paddingAngle={5}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);
