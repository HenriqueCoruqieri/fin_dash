import {
    PostgresCreateTransactionRepository,
    PostgresGetUserByEmailRepository,
} from '../../repositores/postgres/index.js'

import { CreateTransactionUseCase } from '../../use-cases/index.js'

import { CreateTransactionController } from '../../cotrollers/transaction/create-transaction.js'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()

    const getUserByIdRepository = new PostgresGetUserByEmailRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}
