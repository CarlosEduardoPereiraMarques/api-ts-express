import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';


interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(YUP.object().shape({
        nome: YUP.string().required().min(3),
    }))
}));

export const create = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {

    return response.status(StatusCodes.CREATED).send('Não Implementado POST!');
};
