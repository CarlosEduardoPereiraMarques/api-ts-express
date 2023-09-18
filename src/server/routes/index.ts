import { Router } from 'express'
import { CidadesController, PessoasController, UsuariosController } from '../controllers'

const router = Router()

// Cidades

router.post(
    '/cidades/create',
    CidadesController.createValidation,
    CidadesController.create
)
router.get(
    '/cidades',
    CidadesController.getAllValidation,
    CidadesController.getAll
)
router.get(
    '/cidades/:id',
    CidadesController.getByIdValidation,
    CidadesController.getById
)
router.put(
    '/cidades/update/:id',
    CidadesController.updateByIdValidation,
    CidadesController.updateById
)
router.delete(
    '/cidades/delete/:id',
    CidadesController.deleteByIdValidation,
    CidadesController.deleteById
)

// Pessoas

router.get(
    '/pessoas',
    PessoasController.getAllValidation,
    PessoasController.getAll
)
router.get(
    '/pessoas/:id',
    PessoasController.getByIdValidation,
    PessoasController.getById
)
router.post(
    '/pessoas/create',
    PessoasController.createValidation,
    PessoasController.create
)
router.put(
    '/pessoas/update/:id',
    PessoasController.updateByIdValidation,
    PessoasController.updateById
)
router.delete(
    '/pessoas/delete/:id',
    PessoasController.deleteByIdValidation,
    PessoasController.deleteById
)


// Usuario

router.post('/usuario/signin', UsuariosController.signInValidation, UsuariosController.signIn)
router.post('/usuario/signup', UsuariosController.signUpValidation, UsuariosController.signUp)

export { router }
