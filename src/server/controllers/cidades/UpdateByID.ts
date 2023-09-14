import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

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
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID não informado!',
            },
        });
    }
    const result = await CidadesProvider.updateById(request.params.id, request.body)
    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return response.status(StatusCodes.ACCEPTED).send(result);
};
