import { database } from '../..'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        console.log('i')
        await database.pessoa.delete({
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
