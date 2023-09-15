import { IPessoa } from '../../models'
import { database } from '../..'
import { Prisma } from '@prisma/client'

export const getAll = async (
    page: number,
    limit: number,
    filter: string
): Promise<IPessoa[] | Error> => {
    try {
        page = Number(page)
        limit = Number(limit)

        const skip = (page - 1) * limit
        const where: Prisma.pessoaWhereInput = {}

        if (filter) {
            where.nome_completo = {
                contains: filter,
            }
        }

        if (id > 0) {
            where.id = id
        }

        const result = await database.pessoa.findMany({
            skip: skip,
            take: limit,
            where: where,
        })

        if (result.length === 0) {
            throw new Error(
                'Não foram encontrados registros com os filtros atuais'
            )
        }

        return result
    } catch (error) {
        throw new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
