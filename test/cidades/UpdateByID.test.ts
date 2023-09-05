import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Update', () => {

    it('Deve atualizar um registro de cidade', async () => {
        const responseCreate = await testServer
            .put('/cidades/update/1')
            .send({ nome: 'Belo Horizonte' })

        expect(responseCreate.statusCode).toEqual(StatusCodes.ACCEPTED)
        expect(typeof responseCreate.body).toEqual('object')

    })

    it('Tenta atualizar um registro de cidade com nome muito curto', async () => {
        const responseCreate = await testServer
            .put('/cidades/update/1')
            .send({ nome: 'Be' })

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toHaveProperty('errors.body.nome')

    })

    it('Tenta criar um registro de cidade sem passar o campo nome', async () => {
        const responseCreate = await testServer
            .put('/cidades/update/1')

        expect(responseCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseCreate.body).toHaveProperty('errors.body.nome')

    })
})