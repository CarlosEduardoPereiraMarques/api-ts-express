import { ICidade } from '../../models'
import { database } from '../..'

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<Number | Error> => {
    try {
        const createdCidade = await database.cidade.create({
            data: cidade
        })
        return createdCidade.id
    } catch (error) {
        return Error('Error ao cadastrar o registro')
    } finally {
        await database.$disconnect();
    }
}