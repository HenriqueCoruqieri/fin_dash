import { v6 as uuidv6 } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgresCreateUserRepository } from '../repositores/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositores/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se o email já está em uso
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidedEmail) {
            throw new Error('The provided e-mail is already in use')
        }

        // gerar id do usuário
        const userId = uuidv6()

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 12)

        // inserir usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
