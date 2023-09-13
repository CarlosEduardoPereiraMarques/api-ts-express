import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';

interface IParamProps {
    id?: number
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const updateByIdValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(YUP.object().shape({
        nome: YUP.string().required().min(3)
    })),
    params: getSchema<IParamProps>(YUP.object().shape({
        id: YUP.number().integer().required().moreThan(0)
    }))
}));

export const updateById = async (
    request: Request<IParamProps, {}, IBodyProps>,
    response: Response
) => {

    return response.status(StatusCodes.ACCEPTED).send('Não Implementado PUT!');
};
