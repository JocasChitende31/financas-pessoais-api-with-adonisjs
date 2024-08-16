import { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UsersController {
  //
  async index() {
    const usersFound = await prisma.users.findMany()
    try {
      if (usersFound.length <= 0) return 'There no users!'
      return usersFound
    } catch (e) {
      throw e.message
    }
  }

  async store({ request }: HttpContext) {
    const data = request.only(['email', 'password', 'name', 'address'])

    const userCreated = await prisma.users.create({ data })
    return userCreated
  }

  async show({ params }: HttpContext) {
    const userCondiction = {
      where: {
        id: `${params.id}`,
      },
    }

    const userFound = await prisma.users.findUnique(userCondiction)
    return userFound
  }

  async update({ params, request }: HttpContext) {
    const data = request.only(['email', 'password', 'name', 'address'])
    const userCondiction = {
      where: {
        id: `${params.id}`,
      },
      data,
    }

    const userUpdated = await prisma.users.update(userCondiction)
    return userUpdated
  }

  async destroy({ params }: HttpContext) {
    const userCondiction = {
      where: {
        id: `${params.id}`,
      },
    }

    await prisma.users.delete(userCondiction)
    return 'User Successfull Deleted.'
  }
}
