import supertest from 'supertest';
import { server } from '../src/server/Server';
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

export const testServer = supertest(server)
