import { Router } from 'express'
import { CidadesController, PessoasController, UsuariosController } from '../controllers'
import { ensureAuth } from '../shared/middleware'

const router = Router()

// Cidades

router.post(
    '/cidades/create', ensureAuth,
    CidadesController.createValidation,
    CidadesController.create
)
router.get(
    '/cidades', ensureAuth,
    CidadesController.getAllValidation,
    CidadesController.getAll
)
router.get(
    '/cidades/:id', ensureAuth,
    CidadesController.getByIdValidation,
    CidadesController.getById
)
router.put(
    '/cidades/update/:id', ensureAuth,
    CidadesController.updateByIdValidation,
    CidadesController.updateById
)
router.delete(
    '/cidades/delete/:id', ensureAuth,
    CidadesController.deleteByIdValidation,
    CidadesController.deleteById
)

// Pessoas

router.get(
    '/pessoas', ensureAuth,
    PessoasController.getAllValidation,
    PessoasController.getAll
)
router.get(
    '/pessoas/:id', ensureAuth,
    PessoasController.getByIdValidation,
    PessoasController.getById
)
router.post(
    '/pessoas/create', ensureAuth,
    PessoasController.createValidation,
    PessoasController.create
)
router.put(
    '/pessoas/update/:id', ensureAuth,
    PessoasController.updateByIdValidation,
    PessoasController.updateById
)
router.delete(
    '/pessoas/delete/:id', ensureAuth,
    PessoasController.deleteByIdValidation,
    PessoasController.deleteById
)


// Usuario

router.post('/usuario/signin', UsuariosController.signInValidation, UsuariosController.signIn)
router.post('/usuario/signup', UsuariosController.signUpValidation, UsuariosController.signUp)

export { router }
