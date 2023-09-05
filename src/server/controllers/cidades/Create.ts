import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface ICidade {
    nome: string;
}

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<ICidade>(YUP.object().shape({
        nome: YUP.string().required().min(3),
    }))
}));

export const create = async (
    request: Request<{}, {}, ICidade>,
    response: Response
) => {

    return response.status(StatusCodes.CREATED).send('Não Implementado POST!');
};
