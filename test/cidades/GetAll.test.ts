import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {

    it('Deve pegar todos os registro de cidade', async () => {
        const responseCreate = await testServer
            .get('/cidades')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(typeof responseCreate.body).toEqual('object')

    })

    it('Tenta pegar registros de cidades com parâmetro page', async () => {
        const responseCreate = await testServer
            .get('/cidades?page=2')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toEqual({})

    })

    it('Tenta pegar registros de cidades com parâmetro limit', async () => {
        const responseCreate = await testServer
            .get('/cidades?limit=22')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toEqual({})

    })

    it('Tenta pegar registros de cidades com parâmetro filter', async () => {
        const responseCreate = await testServer
            .get('/cidades?filter=belo')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toEqual({})

    })
})