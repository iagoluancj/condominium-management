import { ReactNode } from "react";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";
import { createContext } from "react";
import ToastProvider from "@/lib/ToastProvider";
import { toast } from "react-toastify";
import { getInquilinos } from "@/Routes/getInquilinos";

type TypeInquilinos = {
    id: number
    nome: string // deve aceitar somente LETRAS. 
    cpf: number
    tem_carro: boolean
    quantidade_carros: number
    modelo_carro: string
    placa_carro: string
    apartamento: string
    status: string
    // É string, mas pode ser somente 'proprietario' ou 'inquilino', ajustar para que se fugir disso.
    // ao remodular o banco, alterar para 0 e 1.
    comunicado_importante: string
    is_deleted: boolean
    bloco: string
}

type SupaContextType = {
    typeInquilinos: TypeInquilinos[]
    ChangePage: boolean,
    updateInquilino: (inquilinoData: TypeInquilinos) => void;
    createInquilino: (inquilinoData: Omit<TypeInquilinos, 'id'>) => void;
    deletedInquilinoDEFINITIVY: (cpf: number) => void
    deletedInquilino: (cpf: number) => void
    handleChangePage: (change: boolean) => void
}

type SupaProviderProps = {
    children: ReactNode;
};

export const SupaContext = createContext({
    typeInquilinos: [],
    ChangePage: false,
    updateInquilino: () => { },
    deletedInquilinoDEFINITIVY: () => { },
    deletedInquilino: () => { },
    createInquilino: () => { },
    handleChangePage: () => { },
    children: null
} as SupaContextType)

const SupaProvider: React.FC<SupaProviderProps> = ({ children }) => {
    const [inquilinos, setInquilinos] = useState<TypeInquilinos[]>([])
    const [changePage, setChangePage] = useState(false)

    const fetchInquilinos = async () => {
        const data = await getInquilinos();
        setInquilinos(data || []);
    }

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

    const createInquilino = async (inquilinoData: Omit<TypeInquilinos, 'id'>) => {
        const { nome, cpf, tem_carro, quantidade_carros, modelo_carro, placa_carro, apartamento, status, comunicado_importante, bloco } = inquilinoData;

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

    const handleChangePage = (change: boolean) => {
        if (change) {
            setChangePage(false)
        } else {
            setChangePage(true)
        }
    }

    useEffect(() => {
        const getAll = async () => {
            let { data: inquilinoData } = await supabase
                .from('inquilinos')
                .select('*')
                .order('id')
                .returns<TypeInquilinos[]>()

            return { inquilinoData };
        }

        (async () => {
            const { inquilinoData } = await getAll();
            setInquilinos(inquilinoData || []);
        })();

        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'inquilinos',
                },
                (payload) => {
                    console.log('Change received:', payload);
                    fetchInquilinos(); 
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);

    return (
        <SupaContext.Provider value={{ ChangePage: changePage, typeInquilinos: inquilinos, updateInquilino, deletedInquilino, deletedInquilinoDEFINITIVY, createInquilino, handleChangePage }}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </SupaContext.Provider>
    )
}

export default SupaProvider