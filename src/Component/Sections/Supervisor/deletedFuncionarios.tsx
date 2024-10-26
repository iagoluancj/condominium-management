import React, { useContext } from 'react';
import { SupaContext } from "@/Context/context";
import PaginatedFilteredTable from '@/Component/Primitivy/PaginatedTable';

export default function DeletedFuncionarios() {
    const { contextFuncionarios } = useContext(SupaContext);

    const deletedFuncionarios = contextFuncionarios.filter(funcionario => funcionario.deleted_at !== null);

    return (
        <PaginatedFilteredTable
            data={deletedFuncionarios}
            columns={[
                { key: 'nome', label: 'Nome' },
                { key: 'cpf', label: 'CPF' },
                { key: 'email', label: 'E-mail' },
                { key: 'deleted_at', label: 'Data de Exclusão' },
            ]}
            filterFields={['nome', 'cpf', 'email']}
            renderRow={(funcionario) => (
                <tr
                    key={funcionario.id}
                    className="odd:bg-white even:bg-blue-100 border-b"
                >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {funcionario.nome}
                    </td>
                    <td className="px-6 py-4">
                        {funcionario.cpf}
                    </td>
                    <td className="px-6 py-4">
                        {funcionario.email}
                    </td>
                    <td className="px-6 py-4">
                        {funcionario.deleted_at ? new Date(funcionario.deleted_at).toLocaleDateString('pt-BR') : ''}
                    </td>
                </tr>
            )}
        />
    );
}
