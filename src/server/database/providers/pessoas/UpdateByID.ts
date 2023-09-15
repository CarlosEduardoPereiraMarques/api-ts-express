import { IPessoa } from '../../models'
import { database } from '../..'

export const updateById = async (
    id: number,
    pessoa: Omit<IPessoa, 'id'>
): Promise<void | Error> => {
    try {
        const [{ count }] = await database.cidade.findMany({
            where:{
                id: pessoa.cidade_id
            }
        })
        if (!count) {
            return Error('A cidade usada no cadastro não foi encontrada')
        }

        const result = await database.cidade.update({
            where: {
                id: Number(id),
            },
            data: {
                nome: pessoa.nome_completo,
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
