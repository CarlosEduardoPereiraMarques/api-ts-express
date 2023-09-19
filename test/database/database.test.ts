import { database } from '../../src/server/database'

describe('Testando banco de dados', () => {
    it('Teste de conexão com o banco', async() => {
        const output = await database.$connect()

        expect(output).toBe(undefined)
    })

    it('Deve buscar registros de cidade no banco', async() => {
        const output = await database.cidade.findMany()

        expect(output.length).toBeGreaterThanOrEqual(3)
    })

    it('Deve buscar registros de pessoas no banco', async () => {
        const output = await database.pessoa.findMany()

        expect(output.length).toBeGreaterThanOrEqual(3)
    });

    it('Deve buscar registros de usuarios no banco', async () => {
        const output = await database.usuario.findMany()

        expect(output.length).toBeGreaterThanOrEqual(3)
    });

    it('Deve testar se o banco está desconectado', async() => {
        const output = await database.$disconnect()

        expect(output).toBe(undefined)
    })
})