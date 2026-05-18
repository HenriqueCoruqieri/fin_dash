import bcrypt from 'bcrypt'
import {
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
} from '../repositores/postgres/index.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                updateUserParams.email,
            )

        if (userWithProvidedEmail && userWithProvidedEmail.id != userId) {
            throw new EmailAlreadyInUseError(updateUserParams.email)
        }

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                12,
            )
            user.password = hashedPassword
        }

        const postgreUpdateUserRepository = new PostgresUpdateUserRepository()

        const updatedUser = await postgreUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
