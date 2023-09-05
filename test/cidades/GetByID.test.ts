import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Get by ID', () => {

    it('Deve pegar um registro de cidade por seu ID', async () => {
        const responseCreate = await testServer
            .get('/cidades/3')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(typeof responseCreate.body).toEqual('object')

    })

    it('Tenta pega um registro de cidade com id sendo um texto', async () => {
        const responseCreate = await testServer
            .get('/cidades/vel')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toHaveProperty('errors.params.id')

    })

    it('Tenta pegar um registro de cidade sem passar o campo ID', async () => {
        const responseCreate = await testServer
            .get('/cidades/')
            .send()

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toEqual({})

    })
})