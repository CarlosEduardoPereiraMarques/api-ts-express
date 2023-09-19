import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Get by ID', () => {
    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar um registro de cidade por seu ID sem autenticação', async () => {
        const output = await testServer
            .get('/cidades/3')

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')

    })


    it('Deve pegar um registro de cidade por seu ID', async () => {
        const output = await testServer
            .get('/cidades/3')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(typeof output.body).toEqual('object')

    })

    it('Tenta pega um registro de cidade com id sendo um texto', async () => {
        const output = await testServer
            .get('/cidades/vel')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.params.id')

    })
})