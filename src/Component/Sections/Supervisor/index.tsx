import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SeparationPessoalSupervisor, SupervisorContainer } from "./styles";
import { ActionsInquilino, ActionsInquilinoRegister, BrevelyDescription, CreateInqui, Form, FormContainer, H3Pessoal, HeaderInquilinos, IconInquilino, OptionAction, OptionsActionInquilos, SeparationPessoal, TitleHeader } from "../Inquilinos/styles";
import { IoPeopleSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import InputComponent from "@/Component/Primitivy/Input";
import { TypeFuncionarios } from "@/Types/types";
import { toast } from "react-toastify";
import { SupaContext } from "@/Context/context";
import FuncionariosTable from "./currentFuncionarios";
import DeletedFuncionarios from "./deletedFuncionarios";

export default function Supervisor() {
    const [isSupervisor, setIsSupervisor] = useState(false); // Ao realizar deploy deve estar como "FALSE"
    const [selected, setSelected] = useState('cadasterFunc')
    const { createFuncionario, contextFuncionarios } = useContext(SupaContext);
    const [title, setTitle] = useState('Cadastrar novo funcionário')
    const [formData, setFormData] = useState<TypeFuncionarios>({
        id: 0,
        nome: '',
        cpf: '', // Alterar para permitir os 11.
        email: '' 
    });

    const formatCPF = (cpf: string) => {
        return cpf
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
        let updatedValue = value;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
        } else {
            if (name === "nome") {
                if (regex.test(value)) {
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: value
                    }));
                } else {
                    console.log('Entrada inválida: apenas letras são permitidas');
                }
            } else if (name === "cpf") {
                const numericValue = value.replace(/\D/g, '');
                if (numericValue.length <= 11) {
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: formatCPF(numericValue)
                    }));
                } else {
                    console.log('Entrada inválida: máximo de 11 números');
                }
            } else {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: updatedValue,
                }));
            }
        }
    };


    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.nome || !formData.cpf || !formData.email) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        const presentEmail = contextFuncionarios.some(
            funcionario => funcionario.email === formData.email && funcionario.deleted_at === null
        );
        
        if (presentEmail) {
            toast.error("E-mail já cadastrado.");
            return;
        }

        try {
            await createFuncionario({
                nome: formData.nome,
                cpf: formData.cpf.replace(/\D/g, ''),
                email: formData.email
            });

            setFormData({
                id: 0,
                nome: '',
                cpf: '',
                email: ''
            });
        } catch (error) {
            console.error(error);
            toast.error('Erro ao registrar o funcionário.');
        }
    };

    const alterSelected = (funcionario: string) => {
        let newTitle = '';
        switch (funcionario) {
            case 'cadasterFunc':
                newTitle = 'Cadastrar novo funcionário';
                break;
            case 'currentFunc':
                newTitle = 'Funcionários com cadastro ativo';
                break;
            case 'deletedFuncionarios':
                newTitle = 'Inquilinos deletados ou antigos';
                break;
            default:
                newTitle = '';
        }

        setTitle(newTitle)
        setSelected(funcionario);
    };

    useEffect(() => {
        const userSession = localStorage.getItem('userSession');

        if (userSession) {
            const user = JSON.parse(userSession);
            setIsSupervisor(user.is_supervisor === true);
        } else {
            console.log('userSession não encontrado');
        }
    }, []);

    if (isSupervisor === null) return <SupervisorContainer>Carregando...</SupervisorContainer>;

    if (!isSupervisor) {
        return (
            <SupervisorContainer>
                Você não deveria estar aqui, seu usuário não é de supervisão. Saia e entre novamente, por gentileza.
            </SupervisorContainer>
        );
    }

    return (
        <SupervisorContainer>
            <ActionsInquilino>
                <IconInquilino>
                    <h2>Gerenciamento de funcionários
                    </h2>
                    <IoPeopleSharp size={18} />
                </IconInquilino>
                <OptionsActionInquilos>
                    <OptionAction onClick={() => alterSelected('cadasterFunc')} $isSelected={selected === 'cadasterFunc'}>
                        <span>
                            Cadastro de Funcuionário
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('currentFunc')} $isSelected={selected === 'currentFunc'}>
                        <span>
                            Funcionários atuais
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('deletedFuncionarios')} $isSelected={selected === 'deletedFuncionarios'}>
                        <span>
                            Inquilinos deletados
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                </OptionsActionInquilos>
            </ActionsInquilino>
            <ActionsInquilinoRegister>
                <HeaderInquilinos>
                    <TitleHeader>{title}</TitleHeader>
                    <BrevelyDescription>
                        <span>
                            Gerencie inquilinos de forma eficiente: cadastre, visualize, edite e acesse registros com facilidade.
                        </span>
                    </BrevelyDescription>
                </HeaderInquilinos>
                <div>
                    {selected === 'cadasterFunc' && (
                        <Form onSubmit={handleCreate}>
                            <FormContainer>
                                <H3Pessoal>Dados pessoais</H3Pessoal>
                                <SeparationPessoalSupervisor>
                                    <InputComponent
                                        label="Nome completo"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputComponent
                                        label="E-mail"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputComponent
                                        label="CPF"
                                        type="text"
                                        name="cpf"
                                        value={formData.cpf.toString()}
                                        onChange={handleChange}
                                        required
                                    />
                                </SeparationPessoalSupervisor>
                            </FormContainer>
                            <CreateInqui type="submit">Criar Funcionário</CreateInqui>
                        </Form>
                    )}
                    {selected === 'currentFunc' && (
                        <div className="">
                            <FuncionariosTable />
                        </div>
                    )}
                    {selected === 'deletedFuncionarios' && (
                        <DeletedFuncionarios />
                    )}
                </div>
            </ActionsInquilinoRegister>
        </SupervisorContainer>
    );
}
