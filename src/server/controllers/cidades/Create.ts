import { Request, Response } from 'express'

export const create = (request: Request, response: Response) => {

    return response.send('Create!')
}
