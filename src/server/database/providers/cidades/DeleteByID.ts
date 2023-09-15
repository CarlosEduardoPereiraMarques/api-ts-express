import { database } from '../..'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await database.cidade.delete({
            where: {
                id: Number(id),
            },
        })
    } catch (error) {
        return Error('Error ao deletar o registro')
    } finally {
        await database.$disconnect()
    }
}
