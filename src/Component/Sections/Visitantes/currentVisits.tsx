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
    const { contextVisits, typeInquilinos, deletedVisits, updateVisitante } = useContext(SupaContext);
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

    const visitasEmAndamento = contextVisits.filter((visit) => {
        const fimvisitaDate = new Date(visit.fimvisita);
        const horariofimDate = new Date(`${visit.fimvisita}T${visit.horariofim}`);
        return fimvisitaDate > hoje || (fimvisitaDate.toDateString() === hoje.toDateString() && horariofimDate > hoje);
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
                            className="odd:bg-blue-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 drop-shadow-xl"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {editId === visit.id ? (
                                    <input
                                        type="text"
                                        name="nomevisitante"
                                        value={formData.nomevisitante}
                                        onChange={handleChange}
                                        className="p-1 w-[200px]"
                                    />
                                ) : (
                                    visit.nomevisitante
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editId === visit.id ? (
                                    <input
                                        type="text"
                                        name="cpfvisitante"
                                        value={formData.cpfvisitante}
                                        onChange={handleChange}
                                        disabled
                                        className="p-1 w-[100px]"
                                    />
                                ) : (
                                    visit.cpfvisitante
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editId === visit.id ? (
                                    <input
                                        type="text"
                                        name="cpfinquilinopermissao"
                                        value={inquilinoAprovador ? inquilinoAprovador.nome : ''}
                                        onChange={handleChange}
                                        disabled
                                        className="p-1 w-[70px]"
                                    />
                                ) : (
                                    inquilinoAprovador ? inquilinoAprovador.nome : 'Não encontrado'
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editId === visit.id ? (
                                    <input
                                        type="text"
                                        name="localvisita"
                                        value={formData.localvisita}
                                        onChange={handleChange}
                                        disabled
                                        className="p-1 w-[50px]"
                                        />
                                ) : (
                                    visit.localvisita
                                )}
                            </td>
                            <td className="px-6 mb-5">
                                {editId === visit.id ? (
                                    <div>
                                        <div className="pb-5">
                                            Fim da Visita: 
                                            <input
                                                type="datetime-local"
                                                name="fimvisita"
                                                value={formData.fimvisita}
                                                onChange={handleChange}
                                                className="w-[140px]"
                                            />
                                        </div>
                                        <div>
                                            Horário Fim: 
                                            <input
                                                type="text"
                                                name="horariofim"
                                                value={formData.horariofim}
                                                onChange={handleChange}
                                                className="w-[150px] pl-2"
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
                            <td className="px-6 py-4">
                                {editId === visit.id ? (
                                    <textarea
                                        name="observacoes"
                                        value={formData.observacoes}
                                        onChange={handleChange}
                                        className="p-1 w-[150px] rounded-md"
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



// {visitasEmAndamento.map((visit) => {
//     const inquilinoAprovador = typeInquilinos.find(inquilino => String(inquilino.cpf) === String(visit.cpfinquilinopermissao));
//     return (
//         <tr
//             key={visit.id}
//             className="odd:bg-blue-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 drop-shadow-xl"
//         >
//             <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                 {editId === visit.id ? (
//                     <Input
//                         type="text"
//                         name="nomevisitante"
//                         value={formData.nomevisitante}
//                         onChange={handleChange}
//                     />
//                 ) : visit.nomevisitante}
//             </td>
//             <td className="px-4 py-4">
//                 {editId === visit.id ? (
//                     <Input
//                         type="text"
//                         name="cpfvisitante"
//                         value={formData.cpfvisitante}
//                         onChange={handleChange}
//                         disabled
//                     />
//                 ) : visit.cpfvisitante}
//             </td>
//             <td className="px-4 py-4">
//                 {editId === visit.id ? (
//                     <Input
//                         type="text"
//                         name="inquilinoAprovador"
//                         value={inquilinoAprovador ? inquilinoAprovador.nome : ''}
//                         onChange={handleChange}
//                         disabled
//                     />
//                 ) : inquilinoAprovador ? inquilinoAprovador.nome : 'Não encontrado'}
//             </td>
//             <td className="px-4 py-4">
//                 {editId === visit.id ? (
//                     <Input
//                         type="text"
//                         name="localvisita"
//                         value={formData.localvisita}
//                         onChange={handleChange}
//                         disabled
//                     />
//                 ) : visit.localvisita}
//             </td>
//             <td className="px-4 py-4">
//                 {editId === visit.id ? (
//                     <div>
//                         <span>
//                             Fim da Visita:
//                             <Input
//                                 type="datetime-local"
//                                 name="fimvisita"
//                                 value={formData.fimvisita}
//                                 onChange={handleChange}
//                                 disabled
//                             />
//                         </span>
//                         <span>
//                             Horário Fim:
//                             <Input
//                                 type="text"
//                                 name="horariofim"
//                                 value={formData.horariofim}
//                                 onChange={handleChange}
//                                 disabled
//                             />
//                         </span>
//                     </div>
//                 ) : (
//                     <div>
//                         <p>{visit.fimvisita ? `${visit.fimvisita.slice(8, 10)}-${visit.fimvisita.slice(5, 7)}-${visit.fimvisita.slice(0, 4)}` : ''}</p>
//                         <p><strong>{visit.horariofim}</strong></p>
//                     </div>
//                 )}
//             </td>
//             <td className="px-4 py-4">
//                 {editId === visit.id ? (
//                     <div>
//                         <span>
//                             Observação:
//                             <Input
//                                 type="textarea"
//                                 name="observacoes"
//                                 value={formData.observacoes}
//                                 onChange={handleChange}
//                             />
//                         </span>
//                     </div>
//                 ) : (
//                     <div>
//                         <p>{visit.observacoes}</p>
//                     </div>
//                 )}
//             </td>
//             <td className="px-4 py-4 flex flex-col w-[120px] text-center">
//                 {editId === visit.id ? (
//                     <>
//                         <ButtonSave className="mb-2" onClick={confirmSave}>Salvar</ButtonSave>
//                         <ButtonDeleted onClick={() => setEditId(null)}>Cancelar</ButtonDeleted>
//                     </>
//                 ) : (
//                     <>
//                         <Button className="mb-2" onClick={() => handleEditTable(visit)}>Editar</Button>
//                         <ButtonDeleted onClick={handleDeleted(visit.id)}>Excluir</ButtonDeleted>
//                     </>
//                 )}
//             </td>
//         </tr>
//     );
// })}