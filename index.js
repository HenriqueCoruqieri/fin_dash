import 'dotenv/config'
import express from 'express'
import { CreateUserController } from './src/cotrollers/create-user.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).json(body)
})

app.listen(8080, () => console.log(`Listening on port ${process.env.PORT}`))
