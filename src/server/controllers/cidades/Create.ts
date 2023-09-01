import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as YUP from 'yup'

interface ICity{
    nome: string
}

const bodyValidator: YUP.Schema<ICity> = YUP.object().shape({
    nome: YUP.string().required().min(3),

})

export const createCity = async (request: Request<{}, {}, ICity>, response: Response) => {
    let validatedData: ICity | undefined = undefined
    try {
        validatedData = await bodyValidator.validate(request.body)
    } catch (error) {
        const yupError = error as YUP.ValidationError
        return response.json({
            errors: {
                default: yupError.message
            }
        })
    }
    console.log(validatedData)
    return response.send('Create!')
}
