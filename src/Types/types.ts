
export type TypeInquilinos = {
    id: number;
    nome: string;
    cpf: number;
    tem_carro: boolean;
    quantidade_carros: number;
    modelo_carro: string;
    placa_carro: string;
    apartamento_id: string;
    status: string;
    comunicado_importante: string;
    is_deleted: boolean;
    bloco: string
    created_at: string;
    localvisitaId?: string;
    email?:string;
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
    tipo_visita: string;
    localvisitaId?: string;
};

export type TypeEncomendas = {
    id?: number;
    receivedby: string;
    receivedto: string;
    datareceived: string;
    description: string;
    deletedat: string | null;
    acknowledgmentstatus: boolean;
    date_deleted_at: string;
    tokendelivery: boolean
};

export type TypeFuncionarios = {
    id: number;
    nome: string;
    cpf: string;
    email: string;
};

export type TypeApartamento = {
    id: string;          
    bloco_id: string;   
    apartamento: string;
}

export type TypeBloco = {
    id: string;     
    bloco: string;
}
