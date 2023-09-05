import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Create', () => {

    it('Deve criar um registro de cidade', async () => {
        const responseCreate = await testServer
            .post('/cidades/create')
            .send({ nome: 'Belo Horizonte' })

        expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof responseCreate.body).toEqual('object')

    })

    it('Tenta criar um registro de cidade com nome muito curto', async () => {
        const responseCreate = await testServer
            .post('/cidades/create')
            .send({ nome: 'Be' })

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toHaveProperty('errors.body.nome')

    })

    it('Tenta criar um registro de cidade sem passar o campo nome', async () => {
        const responseCreate = await testServer
            .post('/cidades/create')
            .send()

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toHaveProperty('errors.body.nome')

    })
})