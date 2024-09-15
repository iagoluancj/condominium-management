// import { SupaContext } from '@/Context/context';
// import { TypeInquilinos } from '@/Types/types';
// import React, { PureComponent, useContext } from 'react';
// import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

// // Define um tipo para o objeto de contagem de tipos
// interface CountByType {
//     [key: string]: number;
// }

// const style = {
//     top: '50%',
//     right: 0,
//     transform: 'translate(0, -50%)',
//     lineHeight: '24px',
// };

// export default function RadialChart() {
//     // Obtém os dados do contexto
//     const { typeInquilinos } = useContext(SupaContext) as { typeInquilinos: TypeInquilinos[] };

//     // Contagem dos tipos de inquilinos
//     const countByType: CountByType = typeInquilinos.reduce((acc, item) => {
//         acc[item.status] = (acc[item.status] || 0) + 1;
//         return acc;
//     }, {} as CountByType);

//     // Ajusta os dados conforme os tipos
//     const data = [
//         {
//             name: 'Inquilino',
//             uv: countByType['inquilino'] || 0,
//             fill: '#cbc219', // Cor ajustada
//         },
//         {
//             name: 'Morador',
//             uv: countByType['morador'] || 0,
//             fill: '#FFBF08', // Cor ajustada
//         },
//         {
//             name: 'Proprietario',
//             uv: countByType['proprietario'] || 0,
//             fill: '#B99634', // Cor ajustada
//         },
//     ];

//     return (
//         <ResponsiveContainer width={400} height={280}>
//             <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
//                 <RadialBar
//                     minAngle={15}
//                     label={{ position: 'insideStart', fill: '#fff' }}
//                     background
//                     clockWise
//                     dataKey="uv"
//                 />
//                 <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//             </RadialBarChart>
//         </ResponsiveContainer>
//     );
// }
