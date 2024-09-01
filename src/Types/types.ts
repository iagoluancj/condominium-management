
export type TypeInquilinos = {
    id: number;
    nome: string;
    cpf: number;
    tem_carro: boolean;
    quantidade_carros: number;
    modelo_carro: string;
    placa_carro: string;
    apartamento: string;
    status: string;
    comunicado_importante: string;
    is_deleted: boolean;
    bloco: string
    created_at: string;
};

export type TypeVisit = {
    id: number;
    nomevisitante: string;
    datavisita: string;
    fimvisita: string;
    localvisita: string;
    cpfinquilinopermissao: string;
    horarioinicio: string;
    horariofim: string;
    cpfvisitante: string;
    observacoes: string;
    created_at: string;
    deleted_at: string;
};
