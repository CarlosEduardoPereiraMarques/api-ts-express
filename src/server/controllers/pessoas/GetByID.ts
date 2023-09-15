import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { PessoasProvider  } from '../../database/providers/pessoas'

interface IParamProps {
    id?: number
}

export const getByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0),
        })
    ),
}))

export const getById = async (
    request: Request<IParamProps>,
    response: Response
) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID não informado!',
            },
        })
    }
    const result = await PessoasProvider.getById(request.params.id)
    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        })
    }
    return response.status(StatusCodes.OK).json(result)
}
