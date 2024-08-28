import React, { useContext } from "react";
import { SupaContext } from "@/Context/context";

export default function DeletedInquilinosTable() {
    const { typeInquilinos } = useContext(SupaContext);
    const filteredDeletedInquilinos = typeInquilinos.filter(inquilino => inquilino.is_deleted);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CPF
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Apartamento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Bloco
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeletedInquilinos.map((inquilino) => (
                        <tr
                            key={inquilino.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {inquilino.nome}
                            </td>
                            <td className="px-6 py-4">
                                {inquilino.cpf}
                            </td>
                            <td className="px-6 py-4">
                                {inquilino.apartamento}
                            </td>
                            <td className="px-6 py-4">
                                {inquilino.bloco}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
