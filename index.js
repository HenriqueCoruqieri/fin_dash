import 'dotenv/config'
import express from 'express'
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/cotrollers/index.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { PostgresGetUserByIdRepository } from './src/repositores/postgres/get-user-by-id.js'
import { PostgresDeleteUserRepository } from './src/repositores/postgres/delete-user.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'
import { PostgresCreateUserRepository } from './src/repositores/postgres/create-user.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'
import { PostgresGetUserByEmailRepository } from './src/repositores/postgres/get-user-by-email.js'
import { PostgresUpdateUserRepository } from './src/repositores/postgres/update-user.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdUseCase = new GetUserByIdUseCase()

    const getUserByIdRepository = new PostgresGetUserByIdRepository(
        getUserByIdUseCase,
    )

    const getUserByIdController = new GetUserByIdController(
        getUserByIdRepository,
    )

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).json(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const updateUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)

    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserUseCase = new DeleteUserUseCase()

    const deleteUserRepository = new PostgresDeleteUserRepository(
        deleteUserUseCase,
    )

    const deleteUserController = new DeleteUserController(deleteUserRepository)

    const { statusCode, body } = await deleteUserController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(8080, () => console.log(`Listening on port ${process.env.PORT}`))
