import { v6 as uuidv6 } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgreCreateUserRepository } from '../repositores/postgres/create-user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se o email já está em uso

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
        const postgresCreateUserRepository = new PostgreCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
