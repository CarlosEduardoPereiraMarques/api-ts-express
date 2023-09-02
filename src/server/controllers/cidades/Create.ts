import { Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as YUP from 'yup'

interface ICity{
    nome: string
    estado: string
}

interface IFilter{
    filter?: string
}

const bodyValidator: YUP.Schema<ICity> = YUP.object().shape({
    nome: YUP.string().required().min(3),
    estado: YUP.string().required()

})

const queryValidator: YUP.Schema<IFilter> = YUP.object().shape({
    filter: YUP.string().required().min(3)

})

export const createQueryValidator: RequestHandler = async (request, response, next) => {
    try {
        await queryValidator.validate(request.query, {abortEarly: false})
        return next()
    } catch (err) {
        const yupError = err as YUP.ValidationError
        const validationErrors: Record<string, string> = {}
        yupError.inner.forEach( error => {
            if (error.path === undefined) return
            validationErrors[error.path] = error.message
        })
        return response.status(StatusCodes.BAD_REQUEST).json({
            validationErrors
        })
    }
}

export const createBodyValidator: RequestHandler = async (request, response, next) => {
    try {
        await bodyValidator.validate(request.body, {abortEarly: false})
        return next()
    } catch (err) {
        const yupError = err as YUP.ValidationError
        const validationErrors: Record<string, string> = {}
        yupError.inner.forEach( error => {
            if (error.path === undefined) return
            validationErrors[error.path] = error.message
        })
        return response.status(StatusCodes.BAD_REQUEST).json({
            validationErrors
        })
    }
}

export const createCity = async (request: Request<{}, {}, ICity>, response: Response) => {

    return response.send('Create!')
}
