import { database } from "../src/server/database"
import { testServer } from "./jest.setup"
import { StatusCodes } from "http-status-codes"

describe('Testando banco de dados', () => {
    it('Tenta pegar registros de cidade no banco', async() => {
        const output = await database.cidade.findMany()
        expect(output).toHaveLength(3)
    })
})