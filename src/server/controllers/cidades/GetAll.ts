import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
    page?: number
    limit?: number
    filter?: string
}

export const getAllValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema<IQueryProps>(YUP.object().shape({
        page: YUP.number().optional().moreThan(0),
        limit: YUP.number().optional().moreThan(0),
        filter: YUP.string().optional()

    }))
}));

export const getAll = async (
    request: Request<{}, {}, {}, IQueryProps>,
    response: Response
) => {
    console.log(request.query)
    return response.status(StatusCodes.BAD_REQUEST).send('Não Implementado GET!');
};
