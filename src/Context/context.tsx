import { ReactNode } from "react";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";
import { createContext } from "react";
import ToastProvider from "@/lib/ToastProvider";
import { toast } from "react-toastify";
import { getInquilinos } from "@/Routes/getInquilinos";
import { TypeInquilinos, TypeVisit, } from "@/Types/types";

// type TypeInquilinos = {
//     id: number
//     nome: string // deve aceitar somente LETRAS. 
//     cpf: number
//     tem_carro: boolean
//     quantidade_carros: number
//     modelo_carro: string
//     placa_carro: string
//     apartamento: string
//     status: string
//     // É string, mas pode ser somente 'proprietario' ou 'inquilino', ajustar para que se fugir disso.
//     // ao remodular o banco, alterar para 0 e 1.
//     comunicado_importante: string
//     is_deleted: boolean
//     bloco: string
//     createdAt: Date;
// }

type SupaContextType = {
    typeInquilinos: TypeInquilinos[]
    contextVisits: TypeVisit[]
    ChangePage: string,
    updateInquilino: (inquilinoData: TypeInquilinos) => void;
    updateVisitante: (visitanteData: TypeVisit) => void;
    createInquilino: (inquilinoData: Omit<TypeInquilinos, 'id'>) => void;
    createVisit: (visitData: Omit<TypeVisit, 'id'>) => void;
    deletedInquilinoDEFINITIVY: (cpf: number) => void
    deletedInquilino: (cpf: number) => void
    deletedVisits: (cpf: number) => void
    handleChangePage: (change: string) => void
}

type SupaProviderProps = {
    children: ReactNode;
};

export const SupaContext = createContext({
    typeInquilinos: [],
    contextVisits: [],
    ChangePage: '',
    updateInquilino: () => { },
    updateVisitante: () => { },
    deletedInquilinoDEFINITIVY: () => { },
    deletedInquilino: () => { },
    deletedVisits: () => { },
    createInquilino: () => { },
    createVisit: () => { },
    handleChangePage: () => { },
    children: null
} as SupaContextType)

const SupaProvider: React.FC<SupaProviderProps> = ({ children }) => {
    const [inquilinos, setInquilinos] = useState<TypeInquilinos[]>([])
    const [visits, setVisits] = useState<TypeVisit[]>([])
    const [changePage, setChangePage] = useState('Visitantes')

    // const fetchInquilinos = async () => {
    //     const data = await getInquilinos();
    //     setInquilinos(data || []);
    // }

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


    const deletedInquilinoDEFINITIVY = async (cpf: number) => {
        const { data, error } = await supabase
            .from('inquilinos')
            .delete()  // Função delete não precisa de parâmetros extras
            .eq('cpf', cpf);  // Condição para encontrar o inquilino

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

    const deletedVisits = async (id: number) => {
        try {
            // Obtendo o registro da visita para pegar o valor atual de `fimvisita`
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
                        deleted_date: visit.fimvisita, // Grava histórico da data original
                        fimvisita: new Date().toISOString() // Atualiza com a data e hora atual
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
        const { nome, cpf, tem_carro, quantidade_carros, modelo_carro, placa_carro, apartamento, status, comunicado_importante, bloco, created_at } = inquilinoData;

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
                        apartamento,
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
            deleted_at
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
                        deleted_at
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

    const handleChangePage = (change: string) => {
        setChangePage(change)
    }

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

        (async () => {
            const { inquilinoData } = await getAllInquilinos();
            setInquilinos(inquilinoData || []);

            const { visitanteData } = await getAllVisitantes();
            setVisits(visitanteData || [])
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

        return () => {
            inquilinosChannel.unsubscribe();
            visitantesChannel.unsubscribe();
        };
    }, []);

    return (
        <SupaContext.Provider value={{ ChangePage: changePage, typeInquilinos: inquilinos, contextVisits: visits, updateInquilino, deletedInquilino, deletedInquilinoDEFINITIVY, createInquilino, updateVisitante, handleChangePage, deletedVisits, createVisit }}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </SupaContext.Provider>
    )
}

export default SupaProvider