import { ICidade } from '../../models';
import { database } from '../..';

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
    try {
        const result = await database.cidade.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: cidade.nome,
            }
        })
        if (!result) {
            return new Error ('Registro não encontrado')
        }
    } catch (error) {
        return new Error ('Erro ao buscar registro')
    } finally {
        database.$disconnect()
    }
}