import { Request, RequestHandler, Response } from 'express';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';


interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(YUP.object().shape({
        nome: YUP.string().required().min(3).max(150),
    }))
}));

export const create = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await CidadesProvider.create(request.body)

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }


    return response.status(StatusCodes.CREATED).json(result);
};
