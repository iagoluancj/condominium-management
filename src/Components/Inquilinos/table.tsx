import React, { useContext, useState } from "react";
import { Button, Input } from "./styles";
import { TypeInquilinos } from "../Nav/Nav";
import { SupaContext } from "@/Context/context";
import ConfirmModal from "../Modal/modal";

type SortField = keyof TypeInquilinos;

export default function Tables() {
    const [sortField, setSortField] = useState<SortField>('nome');
    const { typeInquilinos, updateInquilino, createInquilino, deletedInquilino } = useContext(SupaContext);
    const [editId, setEditId] = useState<number | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [filterTerm, setFilterTerm] = useState<string>("");
    const [filterByName, setFilterByName] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cpfToDelete, setCpfToDelete] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<TypeInquilinos>({
        id: 0,
        nome: "",
        cpf: 0,
        tem_carro: false,
        quantidade_carros: 0,
        modelo_carro: "",
        placa_carro: "",
        apartamento: "",
        status: "inquilino",
        comunicado_importante: "",
        is_deleted: false,
        bloco: ''
    });

    const getBlockColor = (colorByOrder: string) => {
        switch (colorByOrder) {
            case 'A':
                return 'lightblue';
            case 'B':
                return 'lightgreen';
            case 'C':
                return 'lightcoral';
            case 'D':
                return 'violet';
            case 'inquilino':
                return 'red';
            case 'proprietario':
                return 'blue';
            default:
                return 'lightgray';
        }
    };

    const sortedInquilinos = () => {
        if (sortField === 'bloco') {
            const groupedInquilinos: Record<string, TypeInquilinos[]> = typeInquilinos.reduce((acc, inquilino) => {
                const bloco = inquilino['bloco'];
                if (bloco) {
                    const key = (bloco as string).toUpperCase();
                    (acc[key] = acc[key] || []).push(inquilino);
                }
                return acc;
            }, {} as Record<string, TypeInquilinos[]>);

            const sortedBlocks = Object.keys(groupedInquilinos).sort();

            return sortedBlocks.flatMap(block =>
                groupedInquilinos[block].sort((a, b) => {
                    const aName = a['nome'];
                    const bName = b['nome'];
                    return typeof aName === 'string' && typeof bName === 'string'
                        ? aName.localeCompare(bName)
                        : 0;
                })
            );
        } else {
            return [...typeInquilinos].sort((a: any, b: any) => {
                const aValue = a[sortField];
                const bValue = b[sortField];
                return typeof aValue === 'string' && typeof bValue === 'string'
                    ? aValue.localeCompare(bValue)
                    : 0;
            });
        }
    };

    const confirmSave = async () => {
        try {
            await updateInquilino(formData);
            setEditMode(null);
            setEditId(0);
        } catch (error) {
            console.error("Erro ao editar o inquilino:", error);
        } finally {
            setShowModal(false); // Fecha o modal após a confirmação
        }
    };

    const confirmDelete = async () => {
        if (cpfToDelete !== null) {
            try {
                await deletedInquilino(cpfToDelete);
            } finally {
                setShowDeleteModal(false);
                setCpfToDelete(null);
            }
        }
    };

    const filteredInquilinos = () => {
        const term = filterTerm.toLowerCase();
        return sortedInquilinos().filter((inquilino) =>
            !inquilino.is_deleted &&
            (inquilino.nome.toLowerCase().includes(term) || inquilino.cpf.toString().includes(term))
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
            console.log('checado')
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
            console.log('não checado')
        }
    };

    const handleDeleted = (cpf: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setCpfToDelete(cpf);
        setShowDeleteModal(true);
    };

    const handleEditTable = (inquilino: TypeInquilinos) => {
        setEditId(inquilino.id);
        setFormData(inquilino);
    }

    const handleSave = async () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const displayedInquilinosFindByName = filteredInquilinos();
    const displayedInquilinos = sortedInquilinos();

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nome</th>
                            <th scope="col" className="px-6 py-3">CPF</th>
                            <th scope="col" className="px-6 py-3">Tem Carro</th>
                            <th scope="col" className="px-6 py-3">Carro</th>
                            <th scope="col" className="px-6 py-3">Localização</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Comunicado Importante</th>
                            <th scope="col" className="px-6 py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(filterByName ? displayedInquilinosFindByName : displayedInquilinos)
                            .filter((inquilino) => !inquilino.is_deleted)
                            .map((inquilino) => (
                                <tr key={inquilino.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {editId === inquilino.id ? (
                                            <Input
                                                type="text"
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleChange} 
                                            />
                                        ) : inquilino.nome}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editId === inquilino.id ? (
                                            <Input
                                                type="number"
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        ) : inquilino.cpf}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editId === inquilino.id ? (
                                            <Input
                                                type="checkbox"
                                                name="tem_carro"
                                                checked={formData.tem_carro}
                                                onChange={handleChange}
                                            />
                                        ) : inquilino.tem_carro ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editId === inquilino.id ? (
                                            <div>
                                                <Input
                                                    type="number"
                                                    name="quantidade_carros"
                                                    value={formData.quantidade_carros}
                                                    onChange={handleChange}
                                                />
                                                <Input
                                                    type="text"
                                                    name="modelo_carro"
                                                    value={formData.modelo_carro}
                                                    onChange={handleChange}
                                                />
                                                <Input
                                                    type="text"
                                                    name="placa_carro"
                                                    value={formData.placa_carro}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        ) : `${inquilino.quantidade_carros} - ${inquilino.modelo_carro} - ${inquilino.placa_carro}`}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editId === inquilino.id ? (
                                            <div>
                                                <Input
                                                    type="text"
                                                    name="apartamento"
                                                    value={formData.apartamento}
                                                    onChange={handleChange}
                                                />
                                                <Input
                                                    type="text"
                                                    name="bloco"
                                                    value={formData.bloco}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        ) : `${inquilino.apartamento} - ${inquilino.bloco}`}
                                    </td>
                                    <td className="px-6 py-4" style={{ backgroundColor: getBlockColor(inquilino.status) }}>
                                        {editId === inquilino.id ? (
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="border rounded p-1"
                                            >
                                                <option value="inquilino">Inquilino</option>
                                                <option value="proprietario">Proprietário</option>
                                            </select>
                                        ) : (
                                            inquilino.status
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editId === inquilino.id ? (
                                            <textarea
                                                name="comunicado_importante"
                                                value={formData.comunicado_importante}
                                                onChange={handleChange}
                                                className="border rounded p-1"
                                                rows={3} 
                                            />
                                        ) : inquilino.comunicado_importante}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editId === inquilino.id ? (
                                            <>
                                                <Button onClick={confirmSave}>Salvar</Button>
                                                <Button onClick={() => setEditId(null)}>Cancelar</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button onClick={() => handleEditTable(inquilino)}>Editar</Button>
                                                <Button onClick={handleDeleted(inquilino.cpf)}>Deletar</Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {showDeleteModal && (
                <ConfirmModal
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
            {showModal && (
                <ConfirmModal
                    onConfirm={confirmSave}
                    onCancel={closeModal}
                />
            )}
        </>
    );
}
