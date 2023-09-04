import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
    id?: number
}

interface IBodyProps {
    nome: string
}

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
    console.log(request.params)
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não Implementado PUT!');
};
