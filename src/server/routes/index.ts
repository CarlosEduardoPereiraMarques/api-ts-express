import { Router } from 'express'
import { CidadesController } from '../controllers'

const router = Router()

router.get('/', (request, response) => {
    return response.send('Hello World!')
})

router.post('/cidades/create', CidadesController.createValidation, CidadesController.create)
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll)
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById)
router.put('/cidades/update/:id', CidadesController.updateByIdValidation, CidadesController.updateById)
router.delete('/cidades/delete/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById)



export { router }