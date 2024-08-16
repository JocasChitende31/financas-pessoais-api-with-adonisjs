import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class WorkCompaniesController {
  async index() {
    const componiesFound = await prisma.workCompany.findMany()
    if (componiesFound.length <= 0) return 'There is no work company registered'
    return componiesFound
  }

  async show({ params }: HttpContext) {
    const workCompanyCondition = {
      where: {
        id: `${params.id}`,
      },
    }

    const companyFound = await prisma.workCompany.findUnique(workCompanyCondition)
    return companyFound
  }

  async store({ request }: HttpContext) {
    const data = request.only(['description', 'address'])

    const companyCreated = await prisma.workCompany.create({ data })
    return companyCreated
  }

  async update({ params, request }: HttpContext) {
    const data = request.only(['description', 'address'])
    const workCompanyCondiction = {
      where: {
        id: `${params.id}`,
      },
      data,
    }

    const userUdated = await prisma.workCompany.update(workCompanyCondiction)
    return userUdated
  }

  async destroy({ params }: HttpContext) {
    const workCompanyCondition = {
      where: {
        id: `${params.id}`,
      },
    }
    await prisma.workCompany.delete(workCompanyCondition)
    return 'Company deleted successfully'
  }
}
