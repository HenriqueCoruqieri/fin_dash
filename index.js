import 'dotenv/config'
import express from 'express'
import { CreateUserController } from './src/cotrollers/create-user.js'
import { GetUserByIdController } from './src/cotrollers/get-user-by-id.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).json(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(8080, () => console.log(`Listening on port ${process.env.PORT}`))
