import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';

interface ICidade {
    nome: string;
    estado: string;
}

interface IFilter {
    filter?: string;
}

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<ICidade>(YUP.object().shape({
        nome: YUP.string().required().min(3),
        estado: YUP.string().required(),
    })),
    query: getSchema<IFilter>(YUP.object().shape({
        filter: YUP.string().required().min(3),
    })),
}));

export const create = async (
    request: Request<{}, {}, ICidade>,
    response: Response
) => {
    return response.send('Create!');
};
