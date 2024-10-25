import React, { useContext, useState } from 'react';
import { SupaContext } from '@/Context/context';
import ConfirmModal from '@/Component/Modal/modal';
import PaginatedFilteredTable from '@/Component/Primitivy/PaginatedTable';
import { TypeVisit } from '@/Types/types';
import { Button, ButtonDeleted } from '../Inquilinos/styles';

export default function VisitsTable() {
    const hoje = new Date();
    const [editId, setEditId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDeleted, setIdToDeleted] = useState<number | null>(null);
    const { contextVisits, typeInquilinos, deletedVisits, updateVisitante, contextApartamentos, contextBlocos } = useContext(SupaContext);
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
        deleted_at: '',
        tipo_visita: ''
    });

    const visitasEmAndamento = contextVisits.filter((visit) => {
        try {
            const fimvisitaDate = new Date(visit.fimvisita);
            const horariofimDate = new Date(`${visit.fimvisita}T${visit.horariofim}`);

            // Verifica se ambas as datas são válidas
            if (isNaN(fimvisitaDate.getTime()) || isNaN(horariofimDate.getTime())) {
                console.warn('Data inválida detectada:', visit);
                return false;
            }

            // Comparação para visitas em andamento
            const hojeData = hoje.toISOString().split('T')[0];  // Data de hoje em formato yyyy-mm-dd
            const hojeHora = hoje.getTime();  // Timestamp para comparar horários

            const fimvisitaData = fimvisitaDate.toISOString().split('T')[0];  // Data da visita
            const horariofimTimestamp = horariofimDate.getTime();  // Timestamp do horário final da visita

            // Se a data de fim da visita é no futuro, inclui
            if (fimvisitaData > hojeData) {
                return true;
            }

            // Se a visita é hoje, verifica o horário final
            if (fimvisitaData === hojeData && horariofimTimestamp > hojeHora) {
                return true;
            }

            return false;
        } catch (error) {
            console.error('Erro ao filtrar visita:', visit, error);
            return false;
        }
    });

    const closeModal = () => {
        setShowModal(false);
    };

    const handleEditTable = (visit: TypeVisit) => {
        setEditId(visit.id);
        setFormData({
            ...visit
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
            await updateVisitante(formData);
            setEditId(null);
        } catch (error) {
            console.error("Erro ao editar o visitante:", error);
        } finally {
            setShowModal(false);
        }
    };

    const handleDeleted = (visitId: number) => {
        setIdToDeleted(visitId);
        setShowDeleteModal(true);
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

    return (
        <>
            <PaginatedFilteredTable
                data={visitasEmAndamento}
                columns={[
                    { key: 'nomevisitante', label: 'Nome Visitante' },
                    { key: 'cpfvisitante', label: 'CPF Visitante' },
                    { key: 'cpfinquilinopermissao', label: 'Inquilino Aprovador' },
                    { key: 'localvisita', label: 'Local Visita' },
                    { key: 'fimvisita', label: 'Data e Hora Fim' },
                    { key: 'observacoes', label: 'Observações' },
                    { key: 'observacoes', label: 'Ação' },
                ]}
                filterFields={['nomevisitante', 'cpfvisitante', 'localvisita']}
                renderRow={(visit) => {
                    const inquilinoAprovador = typeInquilinos.find(inquilino => String(inquilino.cpf) === String(visit.cpfinquilinopermissao));

                    return (
                        <tr
                            key={visit.id}
                            className=" border-b  drop-shadow-xl"
                        >
                            <td className="px-6 py-4 font-medium whitespace-nowrap"  style={{ backgroundColor: editId === visit.id ? '#0072ff' : 'unset' }}>
                                {editId === visit.id ? (
                                    <input
                                        type="text"
                                        name="nomevisitante"
                                        value={formData.nomevisitante}
                                        onChange={handleChange}
                                        className="p-1 w-[200px] rounded-lg	shadow-xl"
                                    />
                                ) : (
                                    visit.nomevisitante
                                )}
                            </td>
                            <td className="px-6 py-4"  style={{ backgroundColor: editId === visit.id ? '#0072ff' : 'unset' }}>
                                {editId === visit.id ? (
                                    <input
                                        type="text"
                                        name="cpfvisitante"
                                        value={formData.cpfvisitante}
                                        onChange={handleChange}
                                        disabled
                                        className="p-1 w-[100px] rounded-lg	shadow-sm"
                                    />
                                ) : (
                                    visit.cpfvisitante
                                )}
                            </td>
                            <td className="px-6 py-4"  style={{ backgroundColor: editId === visit.id ? '#0072ff' : 'unset' }}>
                                {editId === visit.id ? (
                                    <input
                                        type="text"
                                        name="cpfinquilinopermissao"
                                        value={inquilinoAprovador ? inquilinoAprovador.nome : ''}
                                        onChange={handleChange}
                                        disabled
                                        className="p-1 w-[70px] rounded-lg	shadow-sm"
                                    />
                                ) : (
                                    inquilinoAprovador ? inquilinoAprovador.nome : 'Não encontrado'
                                )}
                            </td>
                            <td className="px-6 py-4"  style={{ backgroundColor: editId === visit.id ? '#0072ff' : 'unset' }}>
                                {editId === visit.id ? (
                                    <input
                                        name="localvisita"
                                        value={(() => {
                                            const currentApartamento = contextApartamentos.find(
                                                apartamento => apartamento.id.toString() === formData.localvisita.toString()
                                            );
                                            const apartamentoName = currentApartamento ? currentApartamento.apartamento : 'Apartamento e';

                                            const blocoId = currentApartamento ? currentApartamento.bloco_id : null;

                                            const currentBloco = contextBlocos.find(
                                                bloco => bloco.id.toString() === blocoId?.toString()
                                            );
                                            const blocoName = currentBloco ? currentBloco.bloco : 'Bloco não encontrado';

                                            return `${apartamentoName} - ${blocoName}`;
                                        })()}
                                        onChange={handleChange}
                                        disabled
                                        className="p-1 w-[50px] rounded-lg	shadow-sm"
                                    />
                                ) : (
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
                                )}
                            </td>
                            <td className="px-6 mb-5"  style={{ backgroundColor: editId === visit.id ? '#0072ff' : 'unset' }}>
                                {editId === visit.id ? (
                                    <div>
                                        <div className="pb-5">
                                            Fim da Visita:
                                            <input
                                                type="datetime-local"
                                                name="fimvisita"
                                                value={formData.fimvisita}
                                                onChange={handleChange}
                                                className="w-[140px] rounded-lg	shadow-xl"
                                            />
                                        </div>
                                        <div>
                                            Horário Fim:
                                            <input
                                                type="text"
                                                name="horariofim"
                                                value={formData.horariofim}
                                                onChange={handleChange}
                                                className="w-[150px] pl-2 rounded-lg shadow-xl"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p>{visit.fimvisita ? `${visit.fimvisita.slice(8, 10)}-${visit.fimvisita.slice(5, 7)}-${visit.fimvisita.slice(0, 4)}` : ''}</p>
                                        <p><strong>{visit.horariofim}</strong></p>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4"  style={{ backgroundColor: editId === visit.id ? '#0072ff' : 'unset' }}>
                                {editId === visit.id ? (
                                    <textarea
                                        name="observacoes"
                                        value={formData.observacoes}
                                        onChange={handleChange}
                                        className="p-1 w-[150px] rounded-lg	shadow-xl"
                                    />
                                ) : (
                                    visit.observacoes
                                )}
                            </td>
                            <td className="px-6 py-4 flex flex-col justify-center">
                                {editId === visit.id ? (
                                    <>
                                        <Button onClick={confirmSave}>Salvar</Button>
                                        <ButtonDeleted onClick={() => setEditId(null)}>Cancelar</ButtonDeleted>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => handleEditTable(visit)} >Editar</Button>
                                        <ButtonDeleted onClick={() => handleDeleted(visit.id)}>Excluir</ButtonDeleted>
                                    </>
                                )}
                            </td>
                        </tr>
                    );
                }}
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
                message="Realmente deseja deletar este visitante?"
            />
        </>
    );
}

