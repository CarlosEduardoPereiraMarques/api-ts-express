import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { IUsuario } from '../../database/models'
import { UsuariosProvider } from '../../database/providers/usuarios'

interface IBodyProps extends Omit<IUsuario, 'id'> {}

export const signUpValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            nome: YUP.string().required().min(3).max(150),
            email: YUP.string().required().email().max(150),
            senha: YUP.string().required().min(6).max(150),
        })
    ),
}))

export const signUp = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await UsuariosProvider.create(request.body)

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        })
    }

    return response.status(StatusCodes.CREATED).json(result)
}
