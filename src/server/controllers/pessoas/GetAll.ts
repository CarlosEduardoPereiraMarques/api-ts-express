import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { PessoasProvider } from '../../database/providers/pessoas'

interface IQueryProps {
    page?: number
    limit?: number
    filter?: string
}

export const getAllValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        YUP.object().shape({
            page: YUP.number().optional().moreThan(0),
            limit: YUP.number().optional().moreThan(0),
            filter: YUP.string().optional(),
        })
    ),
}))

export const getAll = async (
    request: Request<{}, {}, {}, IQueryProps>,
    response: Response
) => {
    const result = await PessoasProvider.getAll(
        request.query.page || 1,
        request.query.limit || 7,
        request.query.filter || '',
    )
    const count = await PessoasProvider.count(request.query.filter)

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        })
    }
    if (count instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            },
        })
    }
    response.setHeader('access-control-expose-headers', 'X-Total-Count')
    response.setHeader('X-Total-Count', count)
    return response.status(StatusCodes.OK).json(result)
}
