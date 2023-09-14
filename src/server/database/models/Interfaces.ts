
export interface ICidade{
    id: number;
    nome: string;
}

export interface IPessoa {
    id: number
    nomeCompleto: string
    email: string
    cidadeId: number
}

export interface IUsuario {
    id: number
    nome: string
    email: string
    senha: string
}