import { database } from '../..'

export const count = async (filter: string = ''): Promise<number | Error> => {
    try {
        const totalCount = await database.cidade.count({
            where: {
                nome: {
                    contains: filter,
                    mode: 'insensitive'
                }
            },
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
