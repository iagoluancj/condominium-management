import React, { useContext, useState } from "react";
import { SupaContext } from "@/Context/context";
import ConfirmModal from "../../Modal/modal";
import { Button, ButtonDeleted, ButtonSave, Input, SpanContext } from "./styles";
import { TypeInquilinos } from "@/Types/types";
import { toast } from "react-toastify";

type SortField = keyof TypeInquilinos;

export default function Tables() {
    const [sortField, setSortField] = useState<SortField>('nome');
    const { typeInquilinos, updateInquilino, deletedInquilino, contextApartamentos, contextBlocos } = useContext(SupaContext);
    const [editId, setEditId] = useState<number | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [filterTerm, setFilterTerm] = useState<string>("");
    const [filterByName, setFilterByName] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPageOptions = [5, 10, 20];
    const [possuiCar, setPossuiCar] = useState(false)
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
        apartamento_id: "",
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

    const confirmSave = async (inquilinoId: number) => {
        const presentEmail = typeInquilinos.find(inquilino =>
            inquilino.email === formData.email && inquilino.id !== formData.id
        );

        if (presentEmail && presentEmail.id !== inquilinoId) {
            toast.error("Não foi possível editar o e-mail. E-mail presente no cadastro de outro morador.");
            return;
        }

        try {
            await updateInquilino(formData);
            setEditMode(null);
            setEditId(0);
        } catch (error) {
            console.error("Erro ao editar o inquilino:", error);
        } finally {
            setShowModal(false);
            setIsEdited(false)
        }
    };

    const confirmCancel = async () => {
        setIsEdited(false)
        setEditId(null)
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const { name, type } = e.target;
        setPossuiCar(isChecked);

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
        }
    };

    const handleDeleted = (cpf: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setCpfToDelete(cpf);
        setShowDeleteModal(true);
    };

    const handleEditTable = (inquilino: TypeInquilinos) => {
        setEditId(inquilino.id);
        setIsEdited(true)
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
        <SpanContext>
            <div className="flex flex-row justify-around mt-10 gap-10 mb-5">
                <Input
                    type="text"
                    placeholder="Procure por nome ou CPF"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded bg-blue-50 w-100"
                />
                <div className="flex space-x-2 ">
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
                <table className=" text-sm text-left rtl:text-right text-gray-500  justify-center items-center" >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50   justify-center items-center">
                        <tr className="justify-center items-center">
                            <th scope="col" className="px-4 py-3 w-24">Nome</th>
                            <th scope="col" className="px-4 py-3 w-32">CPF</th>
                            <th scope="col" className="px-4 py-3 w-20">E-mail </th>
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
                                <tr key={inquilino.id} className="odd:bg-blue-100  even:bg-gray-50  border-b  drop-shadow-xl">
                                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap  w-[3%]" style={{ backgroundColor: editId === inquilino.id ? '#0072ff' : 'unset' }}
                                    >
                                        {editId === inquilino.id ? (
                                            <Input
                                                type="text"
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleChange}
                                            />
                                        ) : inquilino.nome}
                                    </td>
                                    <td className="px-4 py-4 w-[3%]" style={{ backgroundColor: editId === inquilino.id ? '#0072ff' : 'unset' }}>
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
                                    <td className="px-4 py-4 w-[8%]" style={{ backgroundColor: editId === inquilino.id ? '#0072ff' : 'unset' }}>
                                        {editId === inquilino.id ? (
                                            // <Input
                                            //     type="checkbox"
                                            //     name="tem_carro"
                                            //     checked={formData.tem_carro}
                                            //     onChange={handleCheckboxChange}
                                            // />
                                            <Input
                                                type="string"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        ) : inquilino.email}
                                    </td>
                                    <td className="px-4 py-4 w-[10%]" style={{ backgroundColor: editId === inquilino.id ? '#0072ff' : 'unset' }}>
                                        {editId === inquilino.id ? (
                                            <div className="flex flex-col gap-1 items-end">
                                                {/* <span>
                                                    <Input
                                                        type="checkbox"
                                                        name="tem_carro"
                                                        checked={formData.tem_carro}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </span> */}
                                                <span className="flex flex-row items-center w-[100%] justify-evenly">
                                                    <span>
                                                        Quantidade:
                                                    </span>
                                                    <Input
                                                        type="number"
                                                        name="quantidade_carros"
                                                        value={formData.quantidade_carros}
                                                        onChange={handleChange}
                                                        disabled={!possuiCar}
                                                    />
                                                </span>
                                                <span className="flex flex-row items-center w-[100%] justify-evenly">
                                                    <span>Modelo:</span>
                                                    <Input
                                                        type="text"
                                                        name="modelo_carro"
                                                        value={formData.modelo_carro}
                                                        onChange={handleChange}
                                                        disabled={!possuiCar}
                                                    />
                                                </span>
                                                <span className="flex flex-row items-center w-[100%] justify-evenly">
                                                    <span>
                                                        Placa:
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        name="placa_carro"
                                                        value={formData.placa_carro}
                                                        onChange={handleChange}
                                                        disabled={!possuiCar}
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
                                    <td className="px-4 py-4" style={{ backgroundColor: editId === inquilino.id ? '#0072ff' : 'unset' }}>
                                        {editId === inquilino.id ? (
                                            <div>
                                                <span>
                                                    Apartamento:
                                                    <Input
                                                        type="text"
                                                        name="apartamento_id"
                                                        value={(() => {
                                                            const currentApartamento = contextApartamentos.find(
                                                                apartamento => apartamento.id.toString() === formData.apartamento_id.toString()
                                                            );
                                                            const apartamentoName = currentApartamento ? currentApartamento.apartamento : 'Apartamento não encontrado';

                                                            const blocoId = currentApartamento ? currentApartamento.bloco_id : null;

                                                            const currentBloco = contextBlocos.find(
                                                                bloco => bloco.id.toString() === blocoId?.toString()
                                                            );
                                                            const blocoName = currentBloco ? currentBloco.bloco : 'Bloco não encontrado';

                                                            return `${apartamentoName} - ${blocoName}`;
                                                        })()}
                                                        onChange={handleChange}
                                                        disabled
                                                    />
                                                </span>
                                            </div>
                                        ) : (
                                            (() => {
                                                const currentApartamento = contextApartamentos.find(
                                                    apartamento => apartamento.id.toString() === inquilino.apartamento_id.toString()
                                                );
                                                const apartamentoName = currentApartamento ? currentApartamento.apartamento : 'Apartamento não encontrado';

                                                const blocoId = currentApartamento ? currentApartamento.bloco_id : null;

                                                const currentBloco = contextBlocos.find(
                                                    bloco => bloco.id.toString() === blocoId?.toString()
                                                );
                                                const blocoName = currentBloco ? currentBloco.bloco : 'Bloco não encontrado';

                                                return `${apartamentoName} - ${blocoName}`;
                                            })()
                                        )}
                                    </td>
                                    <td className="px-4 py-4" style={{ backgroundColor: editId === inquilino.id ? '#0072ff' : 'unset' }}>
                                        {editId === inquilino.id ? (
                                            <span className="flex flex-row items-center justify-center gap-2">
                                                <span>
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
                                                </span>
                                                <span>
                                                    <textarea
                                                        name="comunicado_importante"
                                                        value={formData.comunicado_importante}
                                                        onChange={handleChange}
                                                        className="border rounded p-1"
                                                        rows={3}
                                                    />
                                                </span>
                                            </span>
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
                                        <td className="px-4" style={{ backgroundColor: editId === inquilino.id ? '#0072ff' : 'unset' }}>
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
                                    <td className="px-4 py-4 flex flex-col w-[120px] h-[100%]">
                                        {editId === inquilino.id ? (
                                            <>
                                                <ButtonSave className="" onClick={() => confirmSave(inquilino.id)}>Salvar</ButtonSave>
                                                <ButtonDeleted onClick={confirmCancel}>Cancelar</ButtonDeleted>
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

                <div className="mt-4 w-[100%] flex gap-10 justify-between items-center p-4">
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
                onConfirm={() => confirmSave(0)}
                message="Deseja prosseguir com a alteração?"
            />

            <ConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                message="Realmente deseja deletar este inquilino?"
            />
        </SpanContext>
    );
}
