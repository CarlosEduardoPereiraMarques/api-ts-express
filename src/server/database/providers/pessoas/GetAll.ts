import { IPessoa } from '../../models'
import { database } from '../..'


export const getAll = async (
    page: number,
    limit: number,
    filter: string
): Promise<IPessoa[] | Error> => {
    try {
        page = Number(page)
        limit = Number(limit)

        const skip = (page - 1) * limit

        const result = await database.pessoa.findMany({
            skip: skip,
            take: limit,
            where: {
                nome_completo: {
                    contains: filter,
                    mode: 'insensitive',
                },
            },
        })

        if (result.length === 0) {
            return new Error(
                'Não foram encontrados registros com os filtros atuais'
            )
        }

        return result
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
