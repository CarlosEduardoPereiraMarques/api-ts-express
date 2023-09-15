import { ICidade, IPessoa, IUsuario } from '../models'

declare module 'Tables' {
    interface Tables {
        cidade: ICidade
        pessoa: IPessoa
        usuario: IUsuario
    }
}
