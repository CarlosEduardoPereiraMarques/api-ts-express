import { IPessoa } from '../../models'
import { database } from '../..'

export const create = async (
    pessoa: Omit<IPessoa, 'id'>
): Promise<Object | Error> => {
    try {
        const count = await database.cidade.findMany({
            where:{
                id: pessoa.cidade_id
            }
        })
        if (!count) {
            return Error('A cidade usada no cadastro não foi encontrada')
        }
        const createdPessoa = await database.pessoa.create({
            data: {
                nome_completo: pessoa.nome_completo,
                email: pessoa.email,
                cidade_id: pessoa.cidade_id
            },
        });
        return createdPessoa;
    } catch (error) {
        return Error('Error ao cadastrar o registro')
    } finally {
        await database.$disconnect()
    }
}
