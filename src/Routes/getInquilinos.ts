import { supabase } from "@/services/supabase";
import { toast } from "react-toastify";

export const getInquilinos = async () => {
    const { data, error } = await supabase
        .from('inquilinos')
        .select('*')
        .order('id');

    if (error) {
        console.error("Erro ao buscar inquilinos:", error);
        toast.error("Ocorreu um erro ao buscar os inquilinos.");
    } else {
        return data || []
    }
};

export const getMoradores = async () => {
    const { data, error } = await supabase
        .from('moradores')
        .select('*')
        .order('id');

    if (error) {
        console.error("Erro ao buscar moradores:", error);
        toast.error("Ocorreu um erro ao buscar os moradores.");
    } else {
        return data || []
    }
};