import { Router } from 'express'
import { CidadesController } from '../controllers'

const router = Router()

router.get('/', (request, response) => {
    return response.send('Hello World!')
})

router.post('/cidades/create', CidadesController.createBodyValidator, CidadesController.createQueryValidator, CidadesController.createCity)


export { router }