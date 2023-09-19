import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Update', () => {
    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta atualizar um registro de cidade sem autenticação', async () => {
        const output = await testServer
            .put('/cidades/update/1')
            .send({ nome: 'Belo Horizonte' })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')
    })

    it('Deve atualizar um registro de cidade', async () => {
        const output = await testServer
            .put('/cidades/update/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ nome: 'Belo Horizonte' })

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED)
        expect(typeof output.body).toEqual('object')
    })

    it('Tenta atualizar um registro de cidade com nome muito curto', async () => {
        const output = await testServer
            .put('/cidades/update/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ nome: 'Be' })

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar um registro de cidade sem passar o campo nome', async () => {
        const output = await testServer
            .put('/cidades/update/1')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.nome')
    })
})