import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';

interface ICity {
    nome: string;
    estado: string;
}

interface IFilter {
    filter?: string;
}


export const createValidation: RequestHandler = validation({
    body: YUP.object().shape({
        nome: YUP.string().required().min(3),
        estado: YUP.string().required(),
    }),
    query: YUP.object().shape({
        filter: YUP.string().required().min(3),
    }),
});

export const createCity = async (
    request: Request<{}, {}, ICity>,
    response: Response
) => {
    return response.send('Create!');
};
