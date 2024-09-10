import React, { useContext, useState } from "react";
import { SupaContext } from "@/Context/context";
import ConfirmModal from "../../Modal/modal";
import { Button, ButtonDeleted, ButtonSave, Input } from "./styles";
import { TypeInquilinos } from "@/Types/types";

type SortField = keyof TypeInquilinos;

export default function Tables() {
    const [sortField, setSortField] = useState<SortField>('nome');
    const { typeInquilinos, updateInquilino, deletedInquilino } = useContext(SupaContext);
    const [editId, setEditId] = useState<number | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [filterTerm, setFilterTerm] = useState<string>("");
    const [filterByName, setFilterByName] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPageOptions = [5, 10, 20];
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
        bloco: '',
        created_at: ''
    });

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
            return [...typeInquilinos].sort((a: TypeInquilinos, b: TypeInquilinos) => {
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
            setShowModal(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleDeleted = (cpf: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setCpfToDelete(cpf);
        setShowDeleteModal(true);
    };

    const handleEditTable = (inquilino: TypeInquilinos) => {
        setEditId(inquilino.id);
        setFormData({
            ...inquilino,
        });
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const formatDateString = (dateString: string) => {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return 'Data não disponível';
        }

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`;
    };

    const totalPages = Math.ceil(filteredInquilinos().length / itemsPerPage);

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const paginatedInquilinos = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredInquilinos().slice(startIndex, endIndex);
    };


    return (
        <>
            <div className="flex flex-row justify-around mt-10 gap-10 mb-5">
                <Input
                    type="text"
                    placeholder="Procure por nome ou CPF"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="p-1 border border-gray-300 rounded"
                />
                <div className="flex space-x-2">
                    <button
                        onClick={() => setSortField('nome')}
                        className={`p-2 rounded ${sortField === 'nome' ? 'bg-blue-500 text-white border-b-4 border-blue-500' : 'bg-blue-100 text-gray-700 border-b-2 border-gray-300'}`}
                    >
                        Nome
                    </button>
                    <button
                        onClick={() => setSortField('status')}
                        className={`p-2 border rounded ${sortField === 'status' ? 'bg-blue-500 text-white' : 'bg-blue-100 border-gray-300 text-gray-700'}`}
                    >
                        Proprietario/Inquilino
                    </button>
                    <button
                        onClick={() => setSortField('bloco')}
                        className={`p-2 border rounded ${sortField === 'bloco' ? 'bg-blue-500 text-white' : 'bg-blue-100 border-gray-300 text-gray-700'}`}
                    >
                        Bloco
                    </button>
                    <button
                        onClick={() => setSortField('created_at')}
                        className={`p-2 border rounded ${sortField === 'created_at' ? 'bg-blue-500 text-white' : 'bg-blue-100 border-gray-300 text-gray-700'}`}
                    >
                        Criação
                    </button>
                </div>
            </div>
            <div className="relative  shadow-md sm:rounded-lg justify-center items-center">
                <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-center items-center" >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 justify-center items-center">
                        <tr className="justify-center items-center">
                            <th scope="col" className="px-4 py-3 w-24">Nome</th>
                            <th scope="col" className="px-4 py-3 w-32">CPF</th>
                            <th scope="col" className="px-4 py-3 w-20">Tem Carro</th>
                            <th scope="col" className="px-4 py-3 w-40">Carro</th>
                            <th scope="col" className="px-4 py-3 w-40">Localização</th>
                            <th scope="col" className="px-4 py-3 w-64">Status e Observação</th>
                            {sortField === 'created_at' ? <th scope="col" className="px-4 py-3 w-64">Criado em:</th> : ''}
                            <th scope="col" className="px-4 py-3 w-32">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="justify-center items-center">
                        {paginatedInquilinos()
                            .filter((inquilino) => !inquilino.is_deleted)
                            .map((inquilino) => (
                                <tr key={inquilino.id} className="odd:bg-blue-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 drop-shadow-xl">
                                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[3%]">
                                        {editId === inquilino.id ? (
                                            <Input
                                                type="text"
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleChange}
                                            />
                                        ) : inquilino.nome}
                                    </td>
                                    <td className="px-4 py-4 w-[3%]">
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
                                    <td className="px-4 py-4 w-[8%]">
                                        {editId === inquilino.id ? (
                                            <Input
                                                type="checkbox"
                                                name="tem_carro"
                                                checked={formData.tem_carro}
                                                onChange={handleChange}
                                            />
                                        ) : inquilino.tem_carro ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-4 py-4 w-[10%]">
                                        {editId === inquilino.id ? (
                                            <div>
                                                <span>
                                                    Quantidade:
                                                    <Input
                                                        type="number"
                                                        name="quantidade_carros"
                                                        value={formData.quantidade_carros}
                                                        onChange={handleChange}
                                                    />
                                                </span>
                                                <span>
                                                    Modelo:
                                                    <Input
                                                        type="text"
                                                        name="modelo_carro"
                                                        value={formData.modelo_carro}
                                                        onChange={handleChange}
                                                    />
                                                </span>
                                                <span>
                                                    Placa:
                                                    <Input
                                                        type="text"
                                                        name="placa_carro"
                                                        value={formData.placa_carro}
                                                        onChange={handleChange}
                                                    />
                                                </span>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>{inquilino.quantidade_carros === 1 ? <strong>{inquilino.quantidade_carros} Carro</strong> : <strong>{inquilino.quantidade_carros} Carros</strong>}</p>
                                                <p>{inquilino.modelo_carro}</p>
                                                <p><strong>{inquilino.placa_carro}</strong></p>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 ">
                                        {editId === inquilino.id ? (
                                            <div>
                                                <span>
                                                    Apartamento:
                                                    <Input
                                                        type="text"
                                                        name="apartamento"
                                                        value={formData.apartamento}
                                                        onChange={handleChange}
                                                    />
                                                </span>
                                                <span>
                                                    Bloco:
                                                    <Input
                                                        type="text"
                                                        name="bloco"
                                                        value={formData.bloco}
                                                        onChange={handleChange}
                                                    />
                                                </span>
                                            </div>
                                        ) : `${inquilino.apartamento} - ${inquilino.bloco}`}
                                    </td>
                                    <td className="px-4 py-4 ">
                                        {editId === inquilino.id ? (
                                            <>
                                                <select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    className="border rounded p-1 mb-2"
                                                >
                                                    <option value="inquilino"><strong>Inquilino</strong></option>
                                                    <option value="proprietario">Proprietário</option>
                                                    <option value="morador">Morador</option>
                                                </select>
                                                <textarea
                                                    name="comunicado_importante"
                                                    value={formData.comunicado_importante}
                                                    onChange={handleChange}
                                                    className="border rounded p-1"
                                                    rows={3}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <p><strong>
                                                    {inquilino.status === 'inquilino' && 'Inquilino'}
                                                    {inquilino.status === 'proprietario' && 'Proprietário'}
                                                    {inquilino.status === 'morador' && 'Morador'}
                                                </strong></p>
                                                <p>{inquilino.comunicado_importante === '' ? <span>Sem observação adicional.</span> : inquilino.comunicado_importante}</p>
                                            </>
                                        )}
                                    </td>
                                    {sortField === 'created_at'
                                        ?
                                        <td className="px-4 ">
                                            {editId === inquilino.id ? (
                                                <div>
                                                    <div>
                                                        <span>
                                                            {formData.created_at ? formatDateString(formData.created_at) : 'Data não disponível'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span>
                                                    {inquilino.created_at ? formatDateString(inquilino.created_at) : 'Data não disponível a'}
                                                </span>
                                            )}
                                        </td>
                                        :
                                        ''}
                                    <td className="px-4 py-4 flex flex-col w-[120px]">
                                        {editId === inquilino.id ? (
                                            <>
                                                <ButtonSave className="" onClick={confirmSave}>Salvar</ButtonSave>
                                                <ButtonDeleted onClick={() => setEditId(null)}>Cancelar</ButtonDeleted>
                                            </>
                                        ) : (
                                            <>
                                                <Button className="" onClick={() => handleEditTable(inquilino)}>Editar</Button>
                                                <ButtonDeleted onClick={handleDeleted(inquilino.cpf)}>Deletar</ButtonDeleted>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="mt-4 flex justify-between items-center p-4">
                    <div className="flex items-center gap-4">
                        <span>Itens por página:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded"
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="p-2 border rounded bg-blue-100 border-gray-300 text-gray-700"
                        >
                            Anterior
                        </button>
                        <span className="px-4">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded bg-blue-100 border-gray-300 text-gray-700"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </div>

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
                message="Realmente deseja deletar este inquilino?"
            />
        </>
    );
}
