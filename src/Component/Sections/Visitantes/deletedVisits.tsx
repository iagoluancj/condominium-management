import React, { useContext } from 'react';
import { SupaContext } from "@/Context/context";
import PaginatedFilteredTable from '@/Component/Primitivy/PaginatedTable';

export default function DeletedVisits() {
    const { contextVisits, typeInquilinos, contextApartamentos, contextBlocos } = useContext(SupaContext);
    const hoje = new Date();

    const visitasPassadas = contextVisits.filter(visit => {
        const fimVisitaDate = new Date(visit.fimvisita);
        return fimVisitaDate <= hoje;
    });

    return (
        <PaginatedFilteredTable
            data={visitasPassadas}
            columns={[
                { key: 'nomevisitante', label: 'Nome do Visitante' },
                { key: 'cpfvisitante', label: 'CPF do Visitante' },
                { key: 'cpfinquilinopermissao', label: 'Inquilino Aprovador' },
                { key: 'localvisita', label: 'Destino' },
                { key: 'fimvisita', label: 'Dia e Hora de Fim' },
            ]}
            filterFields={['nomevisitante', 'cpfvisitante', 'localvisita']}
            renderRow={(visit) => {
                const inquilinoAprovador = typeInquilinos.find(inquilino => String(inquilino.cpf) === String(visit.cpfinquilinopermissao));

                return (
                    <tr
                        key={visit.id}
                        className="odd:bg-white  even:bg-blue-100  border-b "
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {visit.nomevisitante}
                        </td>
                        <td className="px-6 py-4">
                            {visit.cpfvisitante}
                        </td>
                        <td className="px-6 py-4">
                            {inquilinoAprovador ? inquilinoAprovador.nome : "Não encontrado"}
                        </td>
                        <td className="px-6 py-4">
                            {
                                (() => {
                                    const currentApartamento = contextApartamentos.find(
                                        apartamento => apartamento.id.toString() === visit.localvisita.toString()
                                    );
                                    const apartamentoName = currentApartamento ? currentApartamento.apartamento : 'Apartamento e ';

                                    const blocoId = currentApartamento ? currentApartamento.bloco_id : null;

                                    const currentBloco = contextBlocos.find(
                                        bloco => bloco.id.toString() === blocoId?.toString()
                                    );
                                    const blocoName = currentBloco ? currentBloco.bloco : 'bloco não encontrado';

                                    return `${apartamentoName} - ${blocoName}`;
                                })()
                            }
                        </td>
                        <td className="px-6 py-4">
                            {visit.fimvisita ? `${visit.fimvisita.slice(8, 10)}-${visit.fimvisita.slice(5, 7)}-${visit.fimvisita.slice(0, 4)}` : ''} / <strong>{visit.horariofim}</strong>
                        </td>
                    </tr>
                );
            }}
        />
    );
}
