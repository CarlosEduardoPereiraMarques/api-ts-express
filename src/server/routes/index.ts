import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (request, response) => {
    return response.send('Hello World!')
})

router.post('/', (request, response) => {
    return response.status(StatusCodes.UNAUTHORIZED).json(request.body)
})


export { router }