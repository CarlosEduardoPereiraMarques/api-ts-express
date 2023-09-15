import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { IPessoa } from '../../database/models'
import { PessoasProvider } from '../../database/providers/pessoas'

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().email().required(),
            cidade_id: YUP.number().required().integer(),
            nome_completo: YUP.string().required().min(3)
        })
    ),
}))

export const create = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await PessoasProvider.create(request.body)

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        })
    }

    return response.status(StatusCodes.CREATED).json(result)
}
