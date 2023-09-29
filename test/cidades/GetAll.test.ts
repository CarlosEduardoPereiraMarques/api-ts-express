import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {
    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar todos os registro de cidade sem autenticação', async () => {
        const output = await testServer
            .get('/cidades')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')

    })

    it('Deve pegar todos os registro de cidade', async () => {
        const output = await testServer
            .get('/cidades')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(typeof output.body).toEqual('object')

    })

    it('Tenta pegar registros de cidades com parâmetro page', async () => {
        const output = await testServer
            .get('/cidades?page=2')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK)
    })

    it('Tenta pegar registros de cidades com parâmetro limit', async () => {
        const output = await testServer
            .get('/cidades?limit=3')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body).toHaveLength(3)

    })

    it('Tenta pegar registros de cidades com parâmetro filter', async () => {
        const output = await testServer
            .get('/cidades?filter=belo')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              nome: expect.any(String),
            })
        ]))

    })
})