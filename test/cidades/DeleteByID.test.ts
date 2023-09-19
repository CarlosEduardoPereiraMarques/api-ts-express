import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Delete', () => {
    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta deletar um registro de cidade sem autenticação', async () => {
        const response = await testServer
            .delete('/cidades/delete/1')
            .send()

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(response.body).toHaveProperty('errors.default');
    })

    it('Deve deletar um registro de cidade', async () => {
        const output = await testServer
            .post('/cidades/create')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ 'nome': 'São Paulo'})


        const responseDelete = await testServer
            .delete(`/cidades/delete/${output.body.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({})

        expect(responseDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
        expect(typeof responseDelete.body).toEqual('object')

    })

    it('Tenta deletar um registro de cidade passando um texto', async () => {
        const output = await testServer
            .delete('/cidades/delete/deletar')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.params.id')

    })

    it('Tenta deletar um registro de cidade sem passar parâmetros', async () => {
        const output = await testServer
            .delete('/cidades/delete/')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(output.body).toEqual({})

    })

    it('Tenta deletar um registro de cidade com um id inválido', async () => {
        const output = await testServer
            .delete('/cidades/delete/789789797')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(output.body).toHaveProperty('errors.default')
    })
})