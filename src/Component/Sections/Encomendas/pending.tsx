import { useContext, useState } from "react";
import { Button, ButtonDeleted, ButtonSave, Input } from "../Inquilinos/styles";
import { SupaContext } from "@/Context/context";
import ConfirmModal from "@/Component/Modal/modal";
import { TypeEncomendas } from "@/Types/types";
import { toast } from "react-toastify";

export default function TableEncomendas() {
    const { contextEncomendas, deletedEncomenda, updateEncomenda } = useContext(SupaContext)
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [idToConfirm, setIdToConfirm] = useState<number | null>(null);
    const [idToDeleted, setIdToDeleted] = useState<number | null>(null);
    const [isTooLong, setIsTooLong] = useState(false);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [formData, setFormData] = useState<TypeEncomendas>({
        id: 0,
        receivedby: '',
        receivedto: '',
        datareceived: '0',
        description: '',
        deletedat: '',
        acknowledgmentstatus: false,
    });

    const confirmDelete = async () => {
        if (idToDeleted !== null) {
            try {
                await deletedEncomenda(idToDeleted);
            } finally {
                setShowDeleteModal(false);
                setIdToDeleted(null);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmSave = async () => {
        try {
            await updateEncomenda(formData);
            setEditMode(null);
            setEditId(0);
        } catch (error) {
            toast.error("Erro ao editar o inquilino.");
            console.log(error)
        } finally {
            setShowModal(false);
        }
    };


    const handleDeleted = (encomendaID: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIdToDeleted(encomendaID);
        setShowDeleteModal(true);
    };

    const handleEditTable = (encomenda: TypeEncomendas) => {
        setEditId(encomenda.id);
        setFormData({
            id: encomenda.id,
            receivedby: encomenda.receivedby || "",
            receivedto: encomenda.receivedto || "",
            datareceived: encomenda.datareceived || "",
            description: encomenda.description || "",
            deletedat: encomenda.deletedat ?? "",
            acknowledgmentstatus: encomenda.acknowledgmentstatus
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'description' && value.length > 200) {
            if (!isTooLong) {
                toast.error('Mensagem muito longa');
                setIsTooLong(true);
            }
            return;
        }

        if (name === 'description' && value.length <= 200) {
            setIsTooLong(false);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConfirmClick = (encomendaID: number) => {
        setIdToConfirm(encomendaID);
        setShowConfirmModal(true);
    };

    const confirmSaveReceived = async () => {
        if (idToConfirm === null) return;

        try {
            const encomendaOriginal = contextEncomendas.find(encomenda => encomenda.id === idToConfirm);

            if (!encomendaOriginal) {
                throw new Error("Encomenda não encontrada.");
            }

            const encomendaParaAtualizar = {
                ...encomendaOriginal,
                acknowledgmentstatus: true,
            };

            await updateEncomenda(encomendaParaAtualizar);

            setEditMode(null);
            setEditId(0);
            toast.success("Entrega da encomenda confirmada com sucesso.");
        } catch (error) {
            console.error("Erro ao confirmar a entrega da encomenda:", error);
            toast.error("Ocorreu um erro ao confirmar a entrega da encomenda.");
        } finally {
            setShowConfirmModal(false);
            setIdToConfirm(null);
        }
    };


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Entregue</th>
                        <th scope="col" className="px-6 py-3">Recebida por: </th>
                        <th scope="col" className="px-6 py-3">Entrega para: </th>
                        <th scope="col" className="px-6 py-3">Hora recebimento</th>
                        <th scope="col" className="px-6 py-3">Descrição</th>
                        <th scope="col" className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {contextEncomendas
                        .filter(encomenda => !encomenda.acknowledgmentstatus && !encomenda.deletedat)
                        .map(encomenda => (
                            <tr key={encomenda.id} className="odd:bg-blue-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 drop-shadow-xl">
                                <td className="px-4 py-4 justify-start text-center">
                                    <ButtonSave onClick={() => handleConfirmClick(encomenda.id)}>Confirmar entrega</ButtonSave>
                                </td>
                                <td className="px-4 py-4">{encomenda.receivedby}</td>
                                <td className="px-4 py-4">{encomenda.receivedto}</td>
                                <td className="px-4 py-4">{new Date(encomenda.datareceived).toLocaleString()}</td>
                                <td className="px-4 py-4 font-medium text-gray-900 break-words w-[14%]">
                                    {editId === encomenda.id ? (
                                        <Input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="border rounded px-2 py-1 w-[20%]"
                                        />
                                    ) : (
                                        encomenda.description
                                    )}
                                </td>
                                <td className="px-4 py-4 justify-start text-center">
                                    {editId === encomenda.id ? (
                                        <>
                                            <ButtonSave onClick={confirmSave}>Salvar</ButtonSave>
                                            <ButtonDeleted onClick={() => setEditId(null)}>Cancelar</ButtonDeleted>
                                        </>
                                    ) : (
                                        <>
                                            <Button className="mb-2" onClick={() => handleEditTable(encomenda)}>Editar</Button>
                                            <ButtonDeleted onClick={handleDeleted(encomenda.id)}>Deletar</ButtonDeleted>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
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
                message="Realmente deseja deletar essa encomenda?"
            />
            <ConfirmModal
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmSaveReceived}
                message="Realmente deseja confirmar a entrega?"
            />
        </div>
    )
}

