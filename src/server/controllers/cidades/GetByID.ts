import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
    id?: number
}

export const getByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamProps>(YUP.object().shape({
        id: YUP.number().integer().required().moreThan(0)
    }))
}));

export const getById = async (
    request: Request<IParamProps>,
    response: Response
) => {
    console.log(request.params)
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não Implementado GET ID!');
};
