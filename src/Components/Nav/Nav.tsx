// import { useContext, useEffect, useState } from "react";
// import { SupaContext } from "@/Context/context";
// import { toast } from "react-toastify";
// import ConfirmModal from "../Modal/modal";

// export type TypeInquilinos = {
//   id: number;
//   nome: string;
//   cpf: number;
//   tem_carro: boolean;
//   quantidade_carros: number;
//   modelo_carro: string;
//   placa_carro: string;
//   apartamento: string;
//   status: string;
//   comunicado_importante: string;
//   is_deleted: boolean;
//   bloco: string
// };

// type SortField = keyof TypeInquilinos;

// export default function Nav() {
//   const { typeInquilinos, updateInquilino, createInquilino, deletedInquilino } = useContext(SupaContext);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [cpfToDelete, setCpfToDelete] = useState<number | null>(null);
//   const [editMode, setEditMode] = useState<number | null>(null);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [viewMode, setViewMode] = useState(false)
//   const [sortField, setSortField] = useState<SortField>('nome');
//   const [filterTerm, setFilterTerm] = useState<string>("");
//   const [filterByName, setFilterByName] = useState(false)
//   const [formData, setFormData] = useState<TypeInquilinos>({
//     id: 0,
//     nome: "",
//     cpf: 0,
//     tem_carro: false,
//     quantidade_carros: 0,
//     modelo_carro: "",
//     placa_carro: "",
//     apartamento: "",
//     status: "inquilino",
//     comunicado_importante: "",
//     is_deleted: false,
//     bloco: ''
//   });

//   const handleSave = async () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const confirmSave = async () => {
//     try {
//       await updateInquilino(formData);
//       setEditMode(null);
//       setEditId(0)
//     } catch (error) {
//       console.error("Erro ao editar o inquilino:", error);
//     } finally {
//       setShowModal(false); // Fecha o modal após a confirmação
//     }
//   };

//   const confirmDelete = async () => {
//     if (cpfToDelete !== null) {
//       try {
//         await deletedInquilino(cpfToDelete);
//       } finally {
//         setShowDeleteModal(false);
//         setCpfToDelete(null);
//       }
//     }
//   };

//   // ------ CRUD ------ 
//   const handleEdit = (inquilino: TypeInquilinos) => {
//     setEditMode(inquilino.id);
//     setFormData(inquilino);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;

//     if (type === "checkbox") {
//       const { checked } = e.target as HTMLInputElement;
//       setFormData(prevData => ({
//         ...prevData,
//         [name]: checked
//       }));
//     } else {
//       setFormData(prevData => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
//   };

//   const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!formData.nome || !formData.cpf) {
//       toast.error('Preencha os campos obrigatórios.');
//       return;
//     }

//     try {
//       await createInquilino(formData);
//       setFormData({
//         id: 0,
//         nome: "",
//         cpf: 0,
//         tem_carro: false,
//         quantidade_carros: 0,
//         modelo_carro: "",
//         placa_carro: "",
//         apartamento: "",
//         status: "inquilino",
//         comunicado_importante: "",
//         is_deleted: false,
//         bloco: ''
//       });
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   const handleDeleted = (cpf: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     setCpfToDelete(cpf);
//     setShowDeleteModal(true);
//   };
//   // ------ CRUD ------ 

//   // Exclusivo para edicação no modo tabela. 
//   const handleEditTable = (inquilino: TypeInquilinos) => {
//     setEditId(inquilino.id);
//     setFormData(inquilino);
//   }
//   // ------------------------------------------------
//   const toggleViewMode = () => {
//     if (viewMode === false) {
//       setViewMode(true)
//     } else {
//       setViewMode(false)
//     }
//   }

//   const getBlockColor = (colorByOrder: string) => {
//     switch (colorByOrder) {
//       case 'A':
//         return 'lightblue';
//       case 'B':
//         return 'lightgreen';
//       case 'C':
//         return 'lightcoral';
//       case 'D':
//         return 'violet';
//       case 'inquilino':
//         return 'red';
//       case 'proprietario':
//         return 'blue';
//       default:
//         return 'lightgray';
//     }
//   };

//   const sortInquilinos = (field: any) => {
//     setSortField(field);
//   };

//   const sortedInquilinos = () => {
//     if (sortField === 'bloco') {
//       const groupedInquilinos: Record<string, TypeInquilinos[]> = typeInquilinos.reduce((acc, inquilino) => {
//         const bloco = inquilino['bloco'];
//         if (bloco) {
//           const key = (bloco as string).toUpperCase();
//           (acc[key] = acc[key] || []).push(inquilino);
//         }
//         return acc;
//       }, {} as Record<string, TypeInquilinos[]>);

//       const sortedBlocks = Object.keys(groupedInquilinos).sort();

//       return sortedBlocks.flatMap(block =>
//         groupedInquilinos[block].sort((a, b) => {
//           const aName = a['nome'];
//           const bName = b['nome'];
//           return typeof aName === 'string' && typeof bName === 'string'
//             ? aName.localeCompare(bName)
//             : 0;
//         })
//       );
//     } else {
//       return [...typeInquilinos].sort((a: any, b: any) => {
//         const aValue = a[sortField];
//         const bValue = b[sortField];
//         return typeof aValue === 'string' && typeof bValue === 'string'
//           ? aValue.localeCompare(bValue)
//           : 0;
//       });
//     }
//   };

//   const filteredInquilinos = () => {
//     const term = filterTerm.toLowerCase();
//     return sortedInquilinos().filter((inquilino) =>
//       !inquilino.is_deleted &&
//       (inquilino.nome.toLowerCase().includes(term) || inquilino.cpf.toString().includes(term))
//     );
//   };

//   const displayedInquilinos = sortedInquilinos();
//   const displayedInquilinosFindByName = filteredInquilinos();

//   useEffect(() => {
//     if (filterTerm === "") {
//       setFilterByName(false)
//     } else {
//       setFilterByName(true)
//     }
//   }, [filterTerm])

//   return (
//     <>
//       <div>
//         <div>
//           <button onClick={toggleViewMode}>
//             Alterar tabela x card
//           </button>
//           <button onClick={() => sortInquilinos('bloco')}>
//             Ordenar por bloco
//           </button>
//           <button onClick={() => sortInquilinos('nome')}>
//             Ordenar por nome
//           </button>
//           <button onClick={() => sortInquilinos('status')}>
//             Ordenar por status
//           </button>
//           <p>
//             Filtrar por nome ou CPF.
//             <input
//               type="text"
//               onChange={(e) => setFilterTerm(e.target.value)}
//             />
//           </p>
//         </div>
//         {viewMode
//           ?
//           <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', width: '100%' }}>
//             {typeInquilinos
//               .filter((inquilino) => !inquilino.is_deleted)
//               .map((inquilino) => (
//                 <div key={inquilino.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
//                   {editMode === inquilino.id ? (
//                     <div>
//                       <p>
//                         <label>
//                           Nome:
//                           <input
//                             type="text"
//                             name="nome"
//                             value={formData.nome}
//                             onChange={handleChange}
//                           />
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           CPF:
//                           <input
//                             type="number"
//                             name="cpf"
//                             value={formData.cpf}
//                             onChange={handleChange}
//                             disabled
//                           />
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           Tem Carro:
//                           <input
//                             type="checkbox"
//                             name="tem_carro"
//                             checked={formData.tem_carro}
//                             onChange={handleChange}
//                           />
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           Quantidade de Carros:
//                           <input
//                             type="number"
//                             name="quantidade_carros"
//                             value={formData.quantidade_carros}
//                             onChange={handleChange}
//                           />
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           Modelo do Carro:
//                           <input
//                             type="text"
//                             name="modelo_carro"
//                             value={formData.modelo_carro}
//                             onChange={handleChange}
//                           />
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           Placa do Carro:
//                           <input
//                             type="text"
//                             name="placa_carro"
//                             value={formData.placa_carro}
//                             onChange={handleChange}
//                           />
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           Apartamento:
//                           <input
//                             type="text"
//                             name="apartamento"
//                             value={formData.apartamento}
//                             onChange={handleChange}
//                           />
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           Status:
//                           <select name="status" value={formData.status} onChange={handleChange}>
//                             <option value="inquilino">Inquilino</option>
//                             <option value="proprietario">Proprietário</option>
//                           </select>
//                         </label>
//                       </p>
//                       <p>
//                         <label>
//                           Comunicado Importante:
//                           <input
//                             type="text"
//                             name="comunicado_importante"
//                             value={formData.comunicado_importante}
//                             onChange={handleChange}
//                           />
//                         </label>
//                       </p>
//                       <button onClick={handleSave}>Salvar</button>
//                       <button onClick={() => setEditMode(null)}>Cancelar</button>
//                     </div>
//                   ) : (
//                     <div>
//                       <p>Nome: {inquilino.nome}</p>
//                       <p>ID: {inquilino.id}</p>
//                       <p>CPF: {inquilino.cpf}</p>
//                       <p>Tem Carro: {inquilino.tem_carro ? 'Sim' : 'Não'}</p>
//                       <p>Quantidade de Carros: {inquilino.quantidade_carros}</p>
//                       <p>Modelo do Carro: {inquilino.modelo_carro}</p>
//                       <p>Placa do Carro: {inquilino.placa_carro}</p>
//                       <p>Apartamento: {inquilino.apartamento}</p>
//                       <p>Status: {inquilino.status}</p>
//                       <p>Comunicado Importante: {inquilino.comunicado_importante}</p>
//                       <button onClick={() => handleEdit(inquilino)}>Editar</button>
//                       <button onClick={handleDeleted(inquilino.cpf)}>Deletar</button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>
//           :
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr>
//                 <th>Nome</th>
//                 <th>CPF</th>
//                 <th>Tem Carro</th>
//                 <th>Quantidade de Carros</th>
//                 <th>Modelo do Carro</th>
//                 <th>Placa do Carro</th>
//                 <th>Apartamento</th>
//                 <th>Status</th>
//                 <th>Comunicado Importante</th>
//                 <th>Bloco</th>
//                 <th>Ações</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filterByName
//                 ?
//                 displayedInquilinosFindByName
//                   .filter((inquilino) => !inquilino.is_deleted)
//                   .map((inquilino) => (
//                     <tr key={inquilino.id} style={{ backgroundColor: getBlockColor(String(inquilino[sortField])) }}>
//                       {editId === inquilino.id ? (
//                         <>
//                           <td>
//                             <input
//                               type="text"
//                               name="nome"
//                               value={formData.nome}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               name="cpf"
//                               value={formData.cpf}
//                               onChange={handleChange}
//                               disabled
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="checkbox"
//                               name="tem_carro"
//                               checked={formData.tem_carro}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               name="quantidade_carros"
//                               value={formData.quantidade_carros}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="modelo_carro"
//                               value={formData.modelo_carro}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="placa_carro"
//                               value={formData.placa_carro}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="apartamento"
//                               value={formData.apartamento}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <select
//                               name="status"
//                               value={formData.status}
//                               onChange={handleChange}
//                             >
//                               <option value="inquilino">Inquilino</option>
//                               <option value="proprietario">Proprietário</option>
//                             </select>
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="comunicado_importante"
//                               value={formData.comunicado_importante}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="Bloco"
//                               value={formData.bloco}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <button onClick={handleSave}>Salvar</button>
//                             <button onClick={() => setEditId(null)}>Cancelar</button>
//                           </td>
//                         </>
//                       ) : (
//                         <>
//                           <td>{inquilino.nome}</td>
//                           <td>{inquilino.cpf}</td>
//                           <td>{inquilino.tem_carro ? "Sim" : "Não"}</td>
//                           <td>{inquilino.quantidade_carros}</td>
//                           <td>{inquilino.modelo_carro}</td>
//                           <td>{inquilino.placa_carro}</td>
//                           <td>{inquilino.apartamento}</td>
//                           <td>{inquilino.status}</td>
//                           <td>{inquilino.comunicado_importante}</td>
//                           <td >{inquilino.bloco}</td>
//                           <td>
//                             <button onClick={() => handleEditTable(inquilino)}>Editar</button>
//                             <button onClick={handleDeleted(inquilino.cpf)}>Deletar</button>
//                           </td>
//                         </>
//                       )}
//                     </tr>
//                   ))
//                 :
//                 displayedInquilinos
//                   .filter((inquilino) => !inquilino.is_deleted)
//                   .map((inquilino) => (
//                     <tr key={inquilino.id} style={{ backgroundColor: getBlockColor(String(inquilino[sortField])) }}>
//                       {editId === inquilino.id ? (
//                         <>
//                           <td>
//                             <input
//                               type="text"
//                               name="nome"
//                               value={formData.nome}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               name="cpf"
//                               value={formData.cpf}
//                               onChange={handleChange}
//                               disabled
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="checkbox"
//                               name="tem_carro"
//                               checked={formData.tem_carro}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               name="quantidade_carros"
//                               value={formData.quantidade_carros}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="modelo_carro"
//                               value={formData.modelo_carro}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="placa_carro"
//                               value={formData.placa_carro}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="apartamento"
//                               value={formData.apartamento}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <select
//                               name="status"
//                               value={formData.status}
//                               onChange={handleChange}
//                             >
//                               <option value="inquilino">Inquilino</option>
//                               <option value="proprietario">Proprietário</option>
//                             </select>
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="comunicado_importante"
//                               value={formData.comunicado_importante}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="Bloco"
//                               value={formData.bloco}
//                               onChange={handleChange}
//                             />
//                           </td>
//                           <td>
//                             <button onClick={handleSave}>Salvar</button>
//                             <button onClick={() => setEditId(null)}>Cancelar</button>
//                           </td>
//                         </>
//                       ) : (
//                         <>
//                           <td>{inquilino.nome}</td>
//                           <td>{inquilino.cpf}</td>
//                           <td>{inquilino.tem_carro ? "Sim" : "Não"}</td>
//                           <td>{inquilino.quantidade_carros}</td>
//                           <td>{inquilino.modelo_carro}</td>
//                           <td>{inquilino.placa_carro}</td>
//                           <td>{inquilino.apartamento}</td>
//                           <td>{inquilino.status}</td>
//                           <td>{inquilino.comunicado_importante}</td>
//                           <td >{inquilino.bloco}</td>
//                           <td>
//                             <button onClick={() => handleEditTable(inquilino)}>Editar</button>
//                             <button onClick={handleDeleted(inquilino.cpf)}>Deletar</button>
//                           </td>
//                         </>
//                       )}
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         }
//       </div>

//       <form onSubmit={handleCreate}>
//         <h2>Cadastrar Novo Inquilino</h2>
//         <p>
//           <label>
//             *Nome:
//             <input
//               type="text"
//               name="nome"
//               value={formData.nome}
//               onChange={handleChange}
//               required
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             *CPF:
//             <input
//               type="number"
//               name="cpf"
//               value={formData.cpf}
//               onChange={handleChange}
//               required
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             *Tem Carro:
//             <input
//               type="checkbox"
//               name="tem_carro"
//               checked={formData.tem_carro}
//               onChange={handleChange}
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             *Quantidade de Carros:
//             <input
//               type="number"
//               name="quantidade_carros"
//               value={formData.quantidade_carros}
//               onChange={handleChange}
//               required
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             Modelo do Carro:
//             <input
//               type="text"
//               name="modelo_carro"
//               value={formData.modelo_carro}
//               onChange={handleChange}
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             Placa do Carro:
//             <input
//               type="text"
//               name="placa_carro"
//               value={formData.placa_carro}
//               onChange={handleChange}
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             *Apartamento:
//             <input
//               type="text"
//               name="apartamento"
//               value={formData.apartamento}
//               onChange={handleChange}
//               required
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             *Status:
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               required
//             >
//               <option value="inquilino">Inquilino</option>
//               <option value="proprietario">Proprietário</option>
//             </select>
//           </label>
//         </p>
//         <p>
//           <label>
//             *Bloco:
//             <input
//               type="text"
//               name="bloco"
//               value={formData.bloco}
//               onChange={handleChange}
//               required
//             />
//           </label>
//         </p>
//         <p>
//           <label>
//             Comunicado Importante:
//             <input
//               type="text"
//               name="comunicado_importante"
//               value={formData.comunicado_importante}
//               onChange={handleChange}
//             />
//           </label>
//         </p>
//         <button type="submit">Criar Inquilino</button>
//       </form>

//       {/* <div>
//         {typeInquilinos
//           .filter((inquilino) => !inquilino.is_deleted)
//           .map((inquilino) => (
//             <div key={inquilino.id} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
//               <span><strong>Nome:</strong> <span>{inquilino.nome} | </span></span>
//               <span><strong>CPF:</strong> <span>{inquilino.cpf} | </span></span>
//               <p>
//                 <span><strong>Tem Carro:</strong> <span>{inquilino.tem_carro ? 'Sim' : 'Não'} | </span></span>
//                 <span><strong>Quantidade de Carros:</strong> <span>{inquilino.quantidade_carros} | </span></span>
//                 <span><strong>Modelo do Carro:</strong> <span>{inquilino.modelo_carro} | </span></span>
//                 <span><strong>Placa do Carro:</strong> <span>{inquilino.placa_carro} | </span></span>
//               </p>
//               <span><strong>Apartamento:</strong> <span>{inquilino.apartamento} | </span></span>
//               <span><strong>Status:</strong> <span>{inquilino.status} | </span></span>
//               <p><strong>Comunicado Importante:</strong> <span>{inquilino.comunicado_importante}</span></p>
//               <button onClick={handleDeleted(inquilino.cpf)}>Deletar</button>
//             </div>
//           ))}
//       </div> */}

//       <ConfirmModal
//         show={showModal}
//         onClose={closeModal}
//         onConfirm={confirmSave}
//         message="Deseja prosseguir com a alteração?"
//       />

//       <ConfirmModal
//         show={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         onConfirm={confirmDelete}
//         message="Realmente deseja deletar este inquilino?"
//       />
//     </>
//   );
// }
