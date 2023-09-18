import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ensureAuth: RequestHandler = (request, response, next) => {
    const {authorization} = request.headers
    if (!authorization){
        return response.status(StatusCodes.UNAUTHORIZED).json({errors: {
            default: 'Não autenticado'
        }})
    }



    return next()
}