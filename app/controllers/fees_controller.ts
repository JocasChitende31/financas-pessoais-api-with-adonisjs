import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class FeesController {
  async index() {
    const fees = await prisma.fee.findMany()
    if (fees.length <= 0) return 'Sorry! No fees founds'
    return fees
  }
  async store({ request }: HttpContext) {
    const data = request.only(['description', 'percentage'])
    const feeCreated = await prisma.fee.create({ data })
    return feeCreated
  }
  async show({ params }: HttpContext) {
    const feeCondiction = {
      where: {
        id: `${params.id}`,
      },
    }
    try {
      const fee = await prisma.fee.findUnique(feeCondiction)

      return fee
    } catch (err) {
      throw err.message
    }
  }
  async update({ params, request }: HttpContext) {
    const data = request.only(['description', 'percentage'])
    const feeCondiction = { where: { id: `${params.id}` }, data }
    const feeUpdated = await prisma.fee.update(feeCondiction)
    return feeUpdated
  }
  async destroy({ params }: HttpContext) {
    const feeCondiction = { where: { id: `${params.id}` } }
    const fee = await prisma.fee.findUnique(feeCondiction)
    await prisma.fee.delete(feeCondiction)
    return `Well done! "${fee?.description}", deleted successfully`
  }
}
