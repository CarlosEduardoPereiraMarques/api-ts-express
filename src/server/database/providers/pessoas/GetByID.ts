import { IPessoa } from '../../models'
import { database } from '../..'

export const getById = async (id: number): Promise<IPessoa | Error> => {
    try {
        const result = await database.pessoa.findUnique({
            where: {
                id: Number(id),
            },
        })

        if (!result) {
            return new Error('Pessoa não encontrada')
        }

        return result
    } catch (error) {
        return new Error('Erro ao buscar pessoa')
    } finally {
        database.$disconnect()
    }
}
