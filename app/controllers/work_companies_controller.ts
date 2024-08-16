import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export default class WorkCompaniesController {
  async index() {
    const componies = await db.workCompany.findMany()
    if (componies.length <= 0) return 'There is no work company registered'
    return componies
  }
  async store({ request }: HttpContext) {
    const data = request.only(['description', 'address'])
    const company = await db.workCompany.create({ data })
    return company
  }
}
