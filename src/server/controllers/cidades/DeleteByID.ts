import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
    id?: number
}

export const deleteByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamProps>(YUP.object().shape({
        id: YUP.number().integer().required().moreThan(0)
    }))
}));

export const deleteById = async (
    request: Request<IParamProps>,
    response: Response
) => {

    return response.status(StatusCodes.NO_CONTENT).send('Não Implementado DELETE!');
};
