import React, { useContext } from "react";
import { SupaContext } from "@/Context/context";

export default function EncomendasDeletadas() {
    const { contextEncomendas } = useContext(SupaContext);
    const encomendasEntregues = contextEncomendas.filter(encomenda => encomenda.deletedat === 'true');

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Recebido Por
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Recebido Para
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data Recebimento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descrição
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {encomendasEntregues.map((encomenda) => (
                        <tr
                            key={encomenda.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {encomenda.receivedby}
                            </td>
                            <td className="px-6 py-4">
                                {encomenda.receivedto}
                            </td>
                            <td className="px-6 py-4">
                                {encomenda.datareceived ? `${encomenda.datareceived.slice(8, 10)}-${encomenda.datareceived.slice(5, 7)}-${encomenda.datareceived.slice(0, 4)}` : ''}
                            </td>
                            <td className="px-6 py-4">
                                {encomenda.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
