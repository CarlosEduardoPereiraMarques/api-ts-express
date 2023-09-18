import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { IPessoa } from '../../database/models'
import { PessoasProvider } from '../../database/providers/pessoas'

interface IParamProps {
    id?: number
}

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const updateByIdValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().email().optional(),
            cidade_id: YUP.number().optional().integer(),
            nome_completo: YUP.string().optional().min(3)
        })
    ),
    params: getSchema<IParamProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0),
        })
    ),
}))

export const updateById = async (
    request: Request<IParamProps, {}, IBodyProps>,
    response: Response
) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID não informado!',
            },
        })
    }
    const result = await PessoasProvider.updateById(
        request.params.id,
        request.body
    )
    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        })
    }
    return response.status(StatusCodes.ACCEPTED).send(result)
}
