import { database } from '../..'

export const count = async (filter: string = ''): Promise<number | Error> => {
    try {
        const where = filter
            ? {
                nome_completo: {
                    contains: filter,
                },
            }
            : {}

        const totalCount = await database.pessoa.count({
            where,
        })

        if (!totalCount) {
            return new Error('Nenhum registro encontrado')
        }

        return totalCount
    } catch (error) {
        return new Error('Erro ao buscar registros')
    } finally {
        database.$disconnect()
    }
}
