import React, { useContext, useState } from 'react';
import { Button, ButtonDeleted, ButtonSave, Input } from '../Inquilinos/styles';
import ConfirmModal from '@/Component/Modal/modal';
import { SupaContext } from '@/Context/context';
import { TypeVisit } from '@/Types/types';

export default function VisitsTable() {
    const [editId, setEditId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const hoje = new Date();
    const fusoHorarioBrasilia = -3;
    const [editMode, setEditMode] = useState<number | null>(null);
    const [idToDeleted, setIdToDeleted] = useState<number | null>(null);
    const { contextVisits, typeInquilinos, deletedVisits, updateVisitante } = useContext(SupaContext)
    const [formData, setFormData] = useState<TypeVisit>({
        id: 0,
        nomevisitante: '',
        datavisita: '',
        fimvisita: '',
        localvisita: '',
        cpfinquilinopermissao: '',
        horarioinicio: '',
        horariofim: '',
        cpfvisitante: '',
        observacoes: '',
        created_at: '',
        deleted_at: ''
    });

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmDelete = async () => {
        if (idToDeleted !== null) {
            try {
                await deletedVisits(idToDeleted);
            } finally {
                setShowDeleteModal(false);
                setIdToDeleted(null);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditTable = (visit: TypeVisit) => {
        setEditId(visit.id);
        setFormData({
            ...visit
        });
    };

    const confirmSave = async () => {
        try {
            await updateVisitante(formData);
            setEditMode(null);
            setEditId(0);
        } catch (error) {
            console.error("Erro ao editar o inquilino:", error);
        } finally {
            setShowModal(false);
        }
    };

    const handleDeleted = (visitId: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIdToDeleted(visitId);
        setShowDeleteModal(true);
    };

    const visitasEmAndamento = contextVisits.filter((visit) => {
        const fimvisitaDate = new Date(visit.fimvisita);
        const horariofimDate = new Date(`${visit.fimvisita}T${visit.horariofim}`);
        return fimvisitaDate > hoje || (fimvisitaDate.toDateString() === hoje.toDateString() && horariofimDate > hoje);
    });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nome Visitante</th>
                        <th scope="col" className="px-6 py-3">CPF Visitante</th>
                        <th scope="col" className="px-6 py-3">Inquilino Aprovador</th>
                        <th scope="col" className="px-6 py-3">Local Visita</th>
                        <th scope="col" className="px-6 py-3">Data e Hora Fim</th>
                        <th scope="col" className="px-6 py-3">Observações</th>
                        <th scope="col" className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {visitasEmAndamento.map((visit) => {
                        const inquilinoAprovador = typeInquilinos.find(inquilino => String(inquilino.cpf) === String(visit.cpfinquilinopermissao));
                        return (
                            <tr
                                key={visit.id}
                                className="odd:bg-blue-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 drop-shadow-xl"
                            >
                                <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {editId === visit.id ? (
                                        <Input
                                            type="text"
                                            name="nomevisitante"
                                            value={formData.nomevisitante}
                                            onChange={handleChange}
                                        />
                                    ) : visit.nomevisitante}
                                </td>
                                <td className="px-4 py-4">
                                    {editId === visit.id ? (
                                        <Input
                                            type="text"
                                            name="cpfvisitante"
                                            value={formData.cpfvisitante}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    ) : visit.cpfvisitante}
                                </td>
                                <td className="px-4 py-4">
                                    {editId === visit.id ? (
                                        <Input
                                            type="text"
                                            name="inquilinoAprovador"
                                            value={inquilinoAprovador ? inquilinoAprovador.nome : ''}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    ) : inquilinoAprovador ? inquilinoAprovador.nome : 'Não encontrado'}
                                </td>
                                <td className="px-4 py-4">
                                    {editId === visit.id ? (
                                        <Input
                                            type="text"
                                            name="localvisita"
                                            value={formData.localvisita}
                                            onChange={handleChange}
                                            disabled

                                        />
                                    ) : visit.localvisita}
                                </td>
                                <td className="px-4 py-4">
                                    {editId === visit.id ? (
                                        <div>
                                            <span>
                                                Fim da Visita:
                                                <Input
                                                    type="datetime-local"
                                                    name="fimvisita"
                                                    value={formData.fimvisita}
                                                    onChange={handleChange}
                                                    disabled
                                                />
                                            </span>
                                            <span>
                                                Horário Fim:
                                                <Input
                                                    type="text"
                                                    name="horariofim"
                                                    value={formData.horariofim}
                                                    onChange={handleChange}
                                                    disabled

                                                />
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>{visit.fimvisita ? `${visit.fimvisita.slice(8, 10)}-${visit.fimvisita.slice(5, 7)}-${visit.fimvisita.slice(0, 4)}` : ''}</p>
                                            <p><strong>{visit.horariofim}</strong></p>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    {editId === visit.id ? (
                                        <div>
                                            <span>
                                                Observação
                                                <Input
                                                    type="textarea"
                                                    name="observacoes"
                                                    value={formData.observacoes}
                                                    onChange={handleChange}
                                                />
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>{visit.observacoes}</p>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-4 flex flex-col w-[120px]">
                                    {editId === visit.id ? (
                                        <>
                                            <ButtonSave className="mb-2" onClick={confirmSave}>Salvar</ButtonSave>
                                            <ButtonDeleted onClick={() => setEditId(null)}>Cancelar</ButtonDeleted>
                                        </>
                                    ) : (
                                        <>
                                            <Button className="mb-2" onClick={() => handleEditTable(visit)}>Editar</Button>
                                            <ButtonDeleted onClick={handleDeleted(visit.id)}>Deletar</ButtonDeleted>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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
                message="Realmente deseja deletar essa visita?"
            />
        </div>
    );
}
