import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { IUsuario } from '../../database/models'
import { UsuariosProvider } from '../../database/providers/usuarios'
import { PasswordCrypto } from '../../shared/services'

interface IBodyProps extends Omit<IUsuario, 'id'|'nome'> {}

export const signInValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().required().email().max(150),
            senha: YUP.string().required().min(6).max(150),
        })
    ),
}))

export const signIn = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const { email, senha } = request.body
    const result = await UsuariosProvider.getByEmail(email)

    if (result instanceof Error) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        })
    }
    const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha)
    if (!passwordMatch) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        })
    }

    return response.status(StatusCodes.OK).json({
        accessToken: 'teste.teste.teste'
    })
}
