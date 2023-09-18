export interface ICidade {
    id: number
    nome: string
}

export interface IPessoa {
    id: number
    nome_completo: string
    email: string
    cidade_id: number
}

export interface IUsuario {
    id: number
    nome: string
    email: string
    senha: string
}

export interface IUpdatePessoa {
    id: number
    nome_completo?: string
    email?: string
    cidade_id?: number
}

export interface IUpdateUsuario {
    id: number
    nome?: string
    email?: string
    senha?: string
}
