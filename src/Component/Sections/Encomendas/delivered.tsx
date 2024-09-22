import React, { useContext, useState } from "react";
import { SupaContext } from "@/Context/context";
import { Input } from "../Inquilinos/styles";
import FilteredTable from "@/Component/Primitivy/Filter";


export default function EncomendasEntregues() {
    const { contextEncomendas } = useContext(SupaContext);
    const encomendasEntregues = contextEncomendas.filter(encomenda => encomenda.acknowledgmentstatus === true);

    return (
        <FilteredTable
            data={encomendasEntregues}
            columns={[
                { key: 'receivedby', label: 'Recebido Por' },
                { key: 'receivedto', label: 'Recebido Para' },
                { key: 'datareceived', label: 'Data Recebimento' },
                { key: 'description', label: 'Descrição' },
            ]}
            filterFields={['receivedby', 'receivedto']}
            renderRow={(encomenda, index) => (
                <tr
                    key={index}
                    className="odd:bg-white even:bg-blue-100 border-b"
                >
                    <td className="px-6 py-4">{encomenda.receivedby}</td>
                    <td className="px-6 py-4">{encomenda.receivedto}</td>
                    <td className="px-6 py-4">{new Date(encomenda.datareceived).toLocaleString()}</td>
                    <td className="px-6 py-4">{encomenda.description}</td>
                </tr>
            )}
        />
    );
}
