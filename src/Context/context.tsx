import { ReactNode } from "react";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";
import { createContext } from "react";
import ToastProvider from "@/lib/ToastProvider";
import { toast } from "react-toastify";
import { TypeApartamento, TypeBloco, TypeEncomendas, TypeFuncionarios, TypeInquilinos, TypeVisit, } from "@/Types/types";

type SupaContextType = {
    typeInquilinos: TypeInquilinos[]
    contextVisits: TypeVisit[]
    contextApartamentos: TypeApartamento[],
    contextBlocos: TypeBloco[],
    contextFuncionarios: TypeFuncionarios[]
    contextEncomendas: TypeEncomendas[]
    ChangePage: string,
    ChangeTheme: boolean,
    updateInquilino: (inquilinoData: TypeInquilinos) => void;
    updateVisitante: (visitanteData: TypeVisit) => void;
    updateEncomenda: (encomendaData: TypeEncomendas) => void;
    createInquilino: (inquilinoData: Omit<TypeInquilinos, 'id'>) => void;
    createVisit: (visitData: Omit<TypeVisit, 'id'>) => void;
    createEncomenda: (encomendaData: Omit<TypeEncomendas, 'id'>) => void;
    deletedInquilinoDEFINITIVY: (cpf: number) => void
    deletedInquilino: (cpf: number) => void
    deletedEncomenda: (id: number, dateDeletedAt: string) => void
    deletedVisits: (cpf: number) => void
    handleChangePage: (change: string) => void
    handleChangeTheme: (theme: boolean) => void
}

type SupaProviderProps = {
    children: ReactNode;
};

export const SupaContext = createContext({
    typeInquilinos: [],
    contextVisits: [],
    contextApartamentos: [],
    contextBlocos: [],
    contextEncomendas: [],
    contextFuncionarios: [],
    ChangePage: '',
    ChangeTheme: false,
    updateInquilino: () => { },
    updateVisitante: () => { },
    updateEncomenda: () => { },
    deletedInquilinoDEFINITIVY: () => { },
    deletedInquilino: () => { },
    deletedEncomenda: () => { },
    deletedVisits: () => { },
    createInquilino: () => { },
    createVisit: () => { },
    createEncomenda: () => { },
    handleChangePage: () => { },
    handleChangeTheme: () => { },
    children: null
} as SupaContextType)

const SupaProvider: React.FC<SupaProviderProps> = ({ children }) => {
    const [inquilinos, setInquilinos] = useState<TypeInquilinos[]>([])
    const [visits, setVisits] = useState<TypeVisit[]>([])
    const [encomendas, setEncomendas] = useState<TypeEncomendas[]>([])
    const [funcinarios, setFuncionarios] = useState<TypeFuncionarios[]>([])
    const [apartamentos, setApartamentos] = useState<TypeApartamento[]>([])
    const [blocos, setBlocos] = useState<TypeBloco[]>([])
    const [changePage, setChangePage] = useState('HomePage')
    const [changeTheme, setChangeTheme] = useState(true)

    const updateInquilino = async (inquilinoData: TypeInquilinos) => {
        const { id, ...fieldsToUpdate } = inquilinoData;
        const { data, error } = await supabase
            .from('inquilinos')
            .update(fieldsToUpdate)
            .eq('id', id);

        if (error) {
            toast.error("Ocorreu um erro ao tentar editar o inquilino.");
        } else {
            toast.success("Inquilino editado.");
        }
    };

    const updateVisitante = async (visitanteData: TypeVisit) => {
        const { id, ...fieldsToUpdate } = visitanteData;
        const { data, error } = await supabase
            .from('visitantes')
            .update(fieldsToUpdate)
            .eq('id', id);

        if (error) {
            toast.error("Ocorreu um erro ao tentar editar o visitante.");
        } else {
            toast.success("Visitante editado com sucesso.");
        }
    };

    const updateEncomenda = async (encomendaData: TypeEncomendas) => {
        const { id, ...fieldsToUpdate } = encomendaData;
        const { data, error } = await supabase
            .from('encomendas')
            .update(fieldsToUpdate)
            .eq('id', id);

        if (error) {
            toast.error("Ocorreu um erro ao tentar editar a encomenda.");
        } else {
            console.log("Encomenda editado com sucesso.");
        }
    };

    const deletedInquilinoDEFINITIVY = async (cpf: number) => {
        const { data, error } = await supabase
            .from('inquilinos')
            .delete()
            .eq('cpf', cpf);

        if (error) {
            console.log("deletedInquilinoDEFINITIVY: Ocorreu um erro ao tentar deletar o inquilino." + error);
        } else {
            console.log('deletedInquilinoDEFINITIVY: Inquilino deletado com sucesso' + data)
        }
    };

    const deletedInquilino = async (cpf: number) => {
        if (cpf) {
            const { data, error } = await supabase
                .from('inquilinos')
                .update({ 'is_deleted': true })
                .eq('cpf', cpf);
            if (error) {
                toast.error("Ocorreu um erro ao tentar deletar o inquilino.");
            } else {
                toast.success("Inquilino deletado.");
            }
        }
    };

    const deletedEncomenda = async (id: number, dateDeletedAt: string) => {
        if (id) {
            const { data, error } = await supabase
                .from('encomendas')
                .update({
                    deletedat: true,
                    date_deleted_at: dateDeletedAt
                })
                .eq('id', id);

            if (error) {
                toast.error("Ocorreu um erro ao tentar deletar a encomenda.");
            } else {
                toast.success("Encomenda deletada.");
            }
        }
    };

    const deletedVisits = async (id: number) => {
        try {
            const { data: visit, error: fetchError } = await supabase
                .from('visitantes')
                .select('fimvisita')
                .eq('id', id)
                .single();

            if (fetchError) {
                throw new Error(fetchError.message);
            }

            if (visit) {
                const { data, error } = await supabase
                    .from('visitantes')
                    .update({
                        deletado: true,
                        deleted_date: visit.fimvisita,
                        fimvisita: new Date().toISOString()
                    })
                    .eq('id', id);

                if (error) {
                    throw new Error(error.message);
                }

                toast.success("Visita deletada com sucesso.");
            } else {
                toast.error("Visita não encontrada.");
            }
        } catch (error) {
            toast.error(`Ocorreu um erro ao tentar deletar a visita`);
        }
    };

    const createInquilino = async (inquilinoData: Omit<TypeInquilinos, 'id'>) => {
        const { nome, cpf, tem_carro, quantidade_carros, modelo_carro, placa_carro, apartamento_id, status, comunicado_importante, bloco, created_at } = inquilinoData;

        try {
            const { data, error } = await supabase
                .from('inquilinos')
                .insert([
                    {
                        nome,
                        cpf,
                        tem_carro,
                        quantidade_carros,
                        modelo_carro,
                        placa_carro,
                        apartamento_id,
                        status,
                        comunicado_importante,
                        is_deleted: false,
                        updated_at: new Date().toISOString(),
                        created_at,
                        bloco
                    }
                ]);

            if (error) {
                console.error(error);
                toast.error("Erro ao criar o inquilino.");

            } else {
                toast.success("Inquilino criado com sucesso:");
            }
        } catch (error) {
            toast.error("Erro ao criar o inquilino.");
        }
    };

    const createVisit = async (
        visitData: Omit<TypeVisit, 'id'>
    ) => {
        const {
            nomevisitante,
            datavisita,
            fimvisita,
            localvisita,
            cpfinquilinopermissao,
            horarioinicio,
            horariofim,
            cpfvisitante,
            observacoes,
            created_at,
            deleted_at,
            tipo_visita
        } = visitData;

        try {
            const { data, error } = await supabase
                .from('visitantes')
                .insert([
                    {
                        nomevisitante,
                        datavisita,
                        fimvisita,
                        localvisita,
                        cpfinquilinopermissao,
                        horarioinicio,
                        horariofim,
                        cpfvisitante,
                        observacoes,
                        created_at,
                        deleted_at,
                        tipo_visita
                    }
                ]);

            if (error) {
                console.error(error);
                toast.error("Erro ao registrar a visita.");
            } else {
                toast.success("Visita registrada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao criar a visita", error);
            toast.error("Erro ao registrar a visita.");
        }
    };

    const createEncomenda = async (encomendaData: Omit<TypeEncomendas, 'id'>) => {
        const { receivedby, receivedto, datareceived, description, deletedat, acknowledgmentstatus } = encomendaData;

        try {
            const { data, error } = await supabase
                .from('encomendas')
                .insert([
                    {
                        receivedby,
                        receivedto,
                        datareceived,
                        description,
                        deletedat: deletedat || null,
                        acknowledgmentstatus: acknowledgmentstatus || false
                    }
                ]);

            if (error) {
                console.error(error);
                toast.error("Erro ao criar a encomenda.");
            } else {
                toast.success("Encomenda criada com sucesso.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar a encomenda.");
        }
    };

    const handleChangePage = (change: string) => {
        setChangePage(change)
    }

    const handleChangeTheme = (theme: boolean) => {
        if (!theme) {
            setChangeTheme(true);
        } else {
            setChangeTheme(false);
        }
    };

    useEffect(() => {
        const getAllInquilinos = async () => {
            let { data: inquilinoData } = await supabase
                .from('inquilinos')
                .select('*')
                .order('id')
                .returns<TypeInquilinos[]>()

            return { inquilinoData };
        }

        const getAllVisitantes = async () => {
            let { data: visitanteData } = await supabase
                .from('visitantes')
                .select('*')
                .order('id')
                .returns<TypeVisit[]>()

            return { visitanteData };
        }

        const getAllApartamentos = async () => {
            let { data: apartamentoData } = await supabase
                .from('apartamentos')
                .select('*')
                .order('id')
                .returns<TypeApartamento[]>()

            return { apartamentoData };
        }

        const getAllBlocos = async () => {
            let { data: blocoData } = await supabase
                .from('blocos')
                .select('*')
                .order('id')
                .returns<TypeBloco[]>()

            return { blocoData };
        }

        const getAllEncomendas = async () => {
            let { data: encomendasData } = await supabase
                .from('encomendas')
                .select('*')
                .order('id')
                .returns<TypeEncomendas[]>()

            return { encomendasData };
        }

        const getAllFuncionarios = async () => {
            let { data: funcionarioData } = await supabase
                .from('funcionarios')
                .select('*')
                .order('id')
                .returns<TypeFuncionarios[]>()
            return { funcionarioData };
        }

        (async () => {
            const { inquilinoData } = await getAllInquilinos();
            setInquilinos(inquilinoData || []);

            const { visitanteData } = await getAllVisitantes();
            setVisits(visitanteData || [])

            const { encomendasData } = await getAllEncomendas();
            setEncomendas(encomendasData || [])

            const { funcionarioData } = await getAllFuncionarios();
            setFuncionarios(funcionarioData || [])

            const { apartamentoData } = await getAllApartamentos();
            setApartamentos(apartamentoData || []);

            const { blocoData } = await getAllBlocos();
            setBlocos(blocoData || []);
        })();

        const inquilinosChannel = supabase
            .channel('inquilinos-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'inquilinos',
                },
                (payload) => {
                    console.log('Change received for inquilinos:', payload);
                    getAllInquilinos().then(({ inquilinoData }) => setInquilinos(inquilinoData || []));
                }
            )
            .subscribe();

        const visitantesChannel = supabase
            .channel('visitantes-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'visitantes',
                },
                (payload) => {
                    console.log('Change received for visitantes:', payload);
                    getAllVisitantes().then(({ visitanteData }) => setVisits(visitanteData || []));
                }
            )
            .subscribe();

        const encomendasChannel = supabase
            .channel('encomendas-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'encomendas',
                },
                (payload) => {
                    console.log('Change received for encomendas:', payload);
                    getAllEncomendas().then(({ encomendasData }) => setEncomendas(encomendasData || []));
                }
            )
            .subscribe();

        const funcionariosChannel = supabase
            .channel('funcionarios-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'funcionarios',
                },
                (payload) => {
                    console.log('Change received for funcionarios:', payload);
                    getAllFuncionarios().then(({ funcionarioData }) => setFuncionarios(funcionarioData || []));
                }
            )
            .subscribe();


        return () => {
            inquilinosChannel.unsubscribe();
            visitantesChannel.unsubscribe();
            encomendasChannel.unsubscribe();
            funcionariosChannel.unsubscribe();
        };
    }, []);

    return (
        <SupaContext.Provider value={{
            contextEncomendas: encomendas,
            contextFuncionarios: funcinarios,
            contextApartamentos: apartamentos,
            ChangeTheme: changeTheme,
            contextBlocos: blocos,
            ChangePage: changePage,
            typeInquilinos: inquilinos,
            contextVisits: visits,
            updateInquilino, deletedInquilino, deletedInquilinoDEFINITIVY, createInquilino, updateVisitante, handleChangePage, handleChangeTheme, deletedVisits, createVisit, createEncomenda, deletedEncomenda, updateEncomenda
        }}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </SupaContext.Provider>
    )
}

export default SupaProvider