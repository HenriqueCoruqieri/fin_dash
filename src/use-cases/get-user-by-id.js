import { PostgresGetUserByIdRepository } from '../repositores/postgres/get-user-by-id.js'

export class GetUserByIdCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository()

        const user = await getUserByIdRepository.execute(userId)

        return user
    }
}
