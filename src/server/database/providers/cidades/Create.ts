import { ICidade } from '../../models'
import { database } from '../..'

export const create = async (
    cidade: Omit<ICidade, 'id'>
): Promise<Object | Error> => {
    try {
        const createdCidade = await database.cidade.create({
            data: cidade,
        })
        return createdCidade
    } catch (error) {
        return Error('Error ao cadastrar o registro')
    } finally {
        await database.$disconnect()
    }
}
