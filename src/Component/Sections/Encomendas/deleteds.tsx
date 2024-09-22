import React, { useContext } from "react";
import { SupaContext } from "@/Context/context";
import FilteredTable from "@/Component/Primitivy/Filter";

export default function EncomendasDeletadas() {
    const { contextEncomendas } = useContext(SupaContext);
    const encomendasDeletadas = contextEncomendas.filter(encomenda => encomenda.date_deleted_at !== '');

    const formatDateWithOffset = (dateString: string, offsetHours: number = 3): string => {
        const date = new Date(dateString);

        date.setHours(date.getHours() - offsetHours);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <FilteredTable
            data={encomendasDeletadas}
            columns={[
                { key: 'receivedby', label: 'Recebido Por' },
                { key: 'receivedto', label: 'Recebido Para' },
                { key: 'date_deleted_at', label: 'Data de Deleção' },
                { key: 'description', label: 'Descrição' },
            ]}
            filterFields={['receivedby', 'receivedto']}
            renderRow={(encomenda, index) => (
                <tr
                    key={encomenda.id}
                    className="odd:bg-white even:bg-blue-100 border-b"
                >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {encomenda.receivedby}
                    </td>
                    <td className="px-6 py-4 w-[150px]">
                        {encomenda.receivedto}
                    </td>
                    <td className="px-6 py-4">
                        {encomenda.date_deleted_at ? formatDateWithOffset(encomenda.date_deleted_at) : ''}
                    </td>
                    <td className="px-6 py-4">
                        {encomenda.description}
                    </td>
                </tr>
            )}
        />
    );
}
