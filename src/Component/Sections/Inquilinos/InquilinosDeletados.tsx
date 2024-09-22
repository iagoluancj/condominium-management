import React, { useContext } from "react";
import { SupaContext } from "@/Context/context";
import FilteredTable from "@/Component/Primitivy/Filter";

export default function DeletedInquilinosTable() {
    const { typeInquilinos, contextApartamentos, contextBlocos } = useContext(SupaContext);
    const filteredDeletedInquilinos = typeInquilinos.filter(inquilino => inquilino.is_deleted);

    return (
        <FilteredTable
            data={filteredDeletedInquilinos}
            columns={[
                { key: 'nome', label: 'Nome' },
                { key: 'cpf', label: 'CPF' },
                { key: 'apartamento_id', label: 'Apartamento' },
                { key: 'bloco', label: 'Bloco' },
            ]}
            filterFields={['nome', 'cpf']}  // Campos pelos quais será feita a filtragem
            renderRow={(inquilino, index) => (
            
                <tr
                    key={inquilino.id}
                    className="odd:bg-white even:bg-blue-100 border-b"
                >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {inquilino.nome}
                    </td>
                    <td className="px-6 py-4">
                        {inquilino.cpf}
                    </td>
                    <td className="px-6 py-4">
                        {(() => {
                            const currentApartamento = contextApartamentos.find(
                                apartamento => apartamento.id.toString() === inquilino.apartamento_id.toString()
                            );
                            return currentApartamento ? currentApartamento.apartamento : 'Apartamento não encontrado';
                        })()}
                    </td>
                    <td className="px-6 py-4">
                        {(() => {
                            const currentApartamento = contextApartamentos.find(
                                apartamento => apartamento.id.toString() === inquilino.apartamento_id.toString()
                            );
                            const blocoId = currentApartamento ? currentApartamento.bloco_id : null;

                            const currentBloco = contextBlocos.find(
                                bloco => bloco.id.toString() === blocoId?.toString()
                            );
                            return currentBloco ? currentBloco.bloco : 'Bloco não encontrado';
                        })()}
                    </td>
                </tr>
            )}
        />
    );
}
