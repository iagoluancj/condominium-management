import React, { useContext, useState } from 'react';
import { SupaContext } from '@/Context/context';
import ConfirmModal from '@/Component/Modal/modal';
import PaginatedFilteredTable from '@/Component/Primitivy/PaginatedTable';
import { Button, ButtonDeleted } from '../Inquilinos/styles';

type TypeFuncionario = {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    description: string;
};

export default function FuncionariosTable() {
    const [editId, setEditId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDeleted, setIdToDeleted] = useState<number | null>(null);
    const { contextFuncionarios, deletedFuncionario, updateFuncionario } = useContext(SupaContext);

    const [formData, setFormData] = useState<TypeFuncionario>({
        id: 0,
        nome: '',
        cpf: '',
        email: '',
        description: '',
    });

    const closeModal = () => {
        setShowModal(false);
    };

    const handleEditTable = (funcionario: TypeFuncionario) => {
        setEditId(funcionario.id);
        setFormData({
            ...funcionario
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const confirmSave = async () => {
        try {
            const { description, ...formDataWithoutDescription } = formData;
            await updateFuncionario(formDataWithoutDescription);
            setEditId(null);
        } catch (error) {
            console.error("Erro ao editar o funcionário:", error);
        } finally {
            setShowModal(false);
        }
    };

    const handleDeleted = (funcionarioId: number) => {
        setIdToDeleted(funcionarioId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        const currentDate = new Date()

        if (idToDeleted !== null) {
            try {
                await deletedFuncionario(idToDeleted, currentDate);
            } finally {
                setShowDeleteModal(false);
                setIdToDeleted(null);
            }
        }
    };

    return (
        <>
            <PaginatedFilteredTable
                data={contextFuncionarios.filter(funcionario => !funcionario.deleted_at)}
                columns={[
                    { key: 'nome', label: 'Nome' },
                    { key: 'cpf', label: 'CPF' },
                    { key: 'email', label: 'Email' },
                    { key: 'description', label: 'Ação' }
                ]}
                filterFields={['nome', 'cpf', 'email']}
                renderRow={(funcionario) => (
                    <tr key={funcionario.id} className="border-b drop-shadow-xl">
                        <td className="px-6 py-4 font-medium whitespace-nowrap" style={{ backgroundColor: editId === funcionario.id ? '#0072ff' : 'unset' }}>
                            {editId === funcionario.id ? (
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="p-1 w-[200px] rounded-lg shadow-xl"
                                />
                            ) : (
                                funcionario.nome
                            )}
                        </td>
                        <td className="px-6 py-4" style={{ backgroundColor: editId === funcionario.id ? '#0072ff' : 'unset' }}>
                            {editId === funcionario.id ? (
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    className="p-1 w-[100px] rounded-lg shadow-sm"
                                />
                            ) : (
                                funcionario.cpf
                            )}
                        </td>
                        <td className="px-6 py-4" style={{ backgroundColor: editId === funcionario.id ? '#0072ff' : 'unset' }}>
                            {editId === funcionario.id ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="p-1 w-[200px] rounded-lg shadow-sm"
                                />
                            ) : (
                                funcionario.email
                            )}
                        </td>
                        <td className="px-6 py-4 flex flex-col justify-center">
                            {editId === funcionario.id ? (
                                <>
                                    <Button onClick={confirmSave}>Salvar</Button>
                                    <ButtonDeleted onClick={() => setEditId(null)}>Cancelar</ButtonDeleted>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => handleEditTable({ ...funcionario, description: funcionario.description ?? '' })}>
                                        Editar
                                    </Button>
                                    <ButtonDeleted onClick={() => handleDeleted(funcionario.id)}>Excluir</ButtonDeleted>
                                </>
                            )}
                        </td>
                    </tr>
                )}
            />

            <ConfirmModal
                show={showModal}
                onClose={closeModal}
                onConfirm={confirmSave}
                message="Deseja prosseguir com a alteração?"
            />

            <ConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                message="Realmente deseja deletar este funcionário?"
            />
        </>
    );
}
