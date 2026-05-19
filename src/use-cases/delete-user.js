import { PostgresDeleteUserRepository } from '../repositores/postgres/delete-user.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

        const deletedUser = await postgresDeleteUserRepository.execute(userId)

        return deletedUser
    }
}
