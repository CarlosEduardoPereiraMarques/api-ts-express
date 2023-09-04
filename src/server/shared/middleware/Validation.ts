import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Schema, ValidationError } from 'yup'

type TProperty = 'body'|'params'|'header'|'query'
type TAllSchemas = Record<TProperty, Schema<any>>
type TValidation = (validationSchemas: Partial<TAllSchemas>) => RequestHandler

export const validation: TValidation = (validationSchemas) => async (request, response, next) => {
    const errorsResult: Record<string, Record<string, string>> = {}

    Object.entries(validationSchemas).forEach(([field, schema]) => {
        try {
            schema.validateSync(request[field as TProperty], { abortEarly: false });
        } catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            });

            errorsResult[field] = errors;
        }
    })

    if (Object.entries(errorsResult).length === 0) {
        return next()
    }
    if (Object.entries(errorsResult).length >= 1) {
        return response.status(StatusCodes.BAD_REQUEST).json({ errors: ValidationError })
    }
    return errorsResult
}


