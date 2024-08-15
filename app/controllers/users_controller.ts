import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UsersController {
  //
  async index() {
    const user = await prisma.users.findMany()
    try {
      if (user.length <= 0) return 'There no users!'
      return user
    } catch (e) {
      throw e.message
    }
  }
  async store({ request }: HttpContext) {
    const data = request.only(['email', 'password', 'name', 'address'])
    const user = await prisma.users.create({ data })

    return user
  }
}
