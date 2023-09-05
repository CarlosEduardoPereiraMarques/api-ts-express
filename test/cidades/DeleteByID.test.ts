import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Delete', () => {

    it('Deve deletar um registro de cidade', async () => {
        const responseCreate = await testServer
            .delete('/cidades/delete/1')

        expect(responseCreate.statusCode).toEqual(StatusCodes.NO_CONTENT)
        expect(typeof responseCreate.body).toEqual('object')

    })

    it('Tenta deletar um registro de cidade passando um texto', async () => {
        const responseCreate = await testServer
            .delete('/cidades/delete/deletar')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toHaveProperty('errors.params.id')

    })

    it('Tenta deletar um registro de cidade sem passar parâmetros', async () => {
        const responseCreate = await testServer
            .delete('/cidades/delete/')

        expect(responseCreate.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(responseCreate.body).toEqual({})

    })
})