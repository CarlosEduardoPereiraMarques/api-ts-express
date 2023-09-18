import { IUpdatePessoa } from '../../models'
import { database } from '../..'

export const updateById = async (
    id: number,
    pessoa: Omit<IUpdatePessoa, 'id'>
): Promise<void | Error> => {
    try {
        const count = await database.cidade.findMany({
            where:{
                id: pessoa.cidade_id
            }
        })
        if (!count) {
            return Error('A cidade usada no cadastro não foi encontrada')
        }

        const result = await database.pessoa.update({
            where: {
                id: Number(id),
            },
            data: {
                ...pessoa
            },
        })
        if (!result) {
            return new Error('Registro não encontrado')
        }
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        database.$disconnect()
    }
}
