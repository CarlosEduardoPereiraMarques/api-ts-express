import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadesController } from '../controllers'

const router = Router()

router.get('/', (request, response) => {
    return response.send('Hello World!')
})

router.post('/cidades/create', CidadesController.createCity)


export { router }