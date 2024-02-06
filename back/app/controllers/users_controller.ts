import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const { username } = request.all()
    const user = await User.create({ username, history: [] })
    return response.json(user)
  }
}
