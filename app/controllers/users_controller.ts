import { HttpContext } from '@adonisjs/core/http'
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
  async show({ params }: HttpContext) {
    const user = await prisma.users.findUnique({
      where: {
        id: `${params.id}`,
      },
    })

    return user
  }
  async update({ params, request }: HttpContext) {
    const data = request.only(['email', 'password', 'name', 'address'])
    const user = {
      where: {
        id: `${params.id}`,
      },
      data,
    }

    const userUpdated = await prisma.users.update(user)
    return userUpdated
  }

  async destroy({ params }: HttpContext) {
    const user = {
      where: {
        id: `${params.id}`,
      },
    }
    await prisma.users.delete(user)
    return 'User Successfull Deleted.'
  }
}
