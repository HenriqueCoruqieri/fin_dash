import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositores/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresUpdateUserRepository } from '../repositores/postgres/update-user.js'

export class UpdateUserCase {
    async execute(userId, updateUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                updateUserParams.email,
            )

        if (userWithProvidedEmail) {
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
            updateUserParams,
        )

        return updatedUser
    }
}
