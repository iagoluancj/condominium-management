import React, { useContext } from "react";
import { SupaContext } from "@/Context/context";
import { format } from "date-fns";

export default function DeletedVisits() {
    const { contextVisits, typeInquilinos } = useContext(SupaContext);
    const hoje = new Date();

    const visitasPassadas = contextVisits.filter(visit => {
        const fimVisitaDate = new Date(visit.fimvisita);
        return fimVisitaDate <= hoje;
    });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome do Visitante
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CPF do Visitante
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Inquilino Aprovador
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Destino
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dia e Hora de Fim
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {visitasPassadas.map((visit) => {
                        // Encontra o inquilino aprovador pelo CPF
                        const inquilinoAprovador = typeInquilinos.find(inquilino => String(inquilino.cpf) === String(visit.cpfinquilinopermissao));

                        return (
                            <tr
                                key={visit.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {visit.nomevisitante}
                                </td>
                                <td className="px-6 py-4">
                                    {visit.cpfvisitante}
                                </td>
                                <td className="px-6 py-4">
                                    {inquilinoAprovador ? inquilinoAprovador.nome : "Não encontrado"}
                                </td>
                                <td className="px-6 py-4">
                                    {visit.localvisita}
                                </td>
                                <td className="px-6 py-4">
                                    {visit.fimvisita ? `${visit.fimvisita.slice(8, 10)}-${visit.fimvisita.slice(5, 7)}-${visit.fimvisita.slice(0, 4)}` : ''} / <strong>{visit.horariofim}</strong>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
