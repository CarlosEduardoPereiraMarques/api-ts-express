import { ICidade } from '../../models'
import { database } from '../..'
import { Prisma } from '@prisma/client'

export const getAll = async (
    page: number,
    limit: number,
    filter: string,
    id = 0
): Promise<ICidade[] | Error> => {
    try {
        page = Number(page)
        limit = Number(limit)

        const skip = (page - 1) * limit
        const cidade: Prisma.cidadeWhereInput = {}

        if (id > 0) {
            cidade.id = id
        }

        const result = await database.cidade.findMany({
            skip: skip,
            take: limit,
            where: {
                nome: {
                    contains: filter,
                    mode: 'insensitive'
                }
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
