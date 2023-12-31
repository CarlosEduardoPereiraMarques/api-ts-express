import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Create', () => {
    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta criar um registro de cidade sem autenticação', async () => {
        const output = await testServer
            .post('/cidades/create')
            .send({ nome: 'Nepomuceno' })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')
    })

    it('Deve criar um registro de cidade', async () => {
        const output = await testServer
            .post('/cidades/create')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Nepomuceno' })

        expect(output.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof output.body).toEqual('object')
    })

    it('Tenta criar um registro de cidade com nome muito curto', async () => {
        const output = await testServer
            .post('/cidades/create')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Be' })

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar um registro de cidade sem passar o campo nome', async () => {
        const output = await testServer
            .post('/cidades/create')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.nome')
    })
})