import { Request, Response } from 'express'

interface ICidade{
    nome: string
}

export const create = (request: Request<{}, {}, ICidade>, response: Response) => {
    const data = request.body

    return response.send('Create!')
}
