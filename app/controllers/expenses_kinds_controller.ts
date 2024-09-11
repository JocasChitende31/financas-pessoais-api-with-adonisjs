import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class ExpensesKindsController {
  async index() {
    const expensesKind = await prisma.expensesKind.findMany()
    try {
      if (expensesKind.length <= 0) return 'There is no exepenses available'
      return expensesKind
    } catch (err) {
      throw err.message
    }
  }
  async store({ request }: HttpContext) {
    const data = request.only(['description'])
    try {
      const expensesKindCreated = await prisma.expensesKind.create({ data })
      return expensesKindCreated
    } catch (err) {
      throw err.message
    }
  }
  async show({ params }: HttpContext) {
    const expensesKindCondition = { where: { id: `${params.id}` } }
    try {
      const expenseKind = await prisma.expensesKind.findUnique(expensesKindCondition)
      return expenseKind
    } catch (err) {
      throw err.message
    }
  }
  async update({ params, request }: HttpContext) {
    const data = request.only(['description'])
    const expensesKindCondition = { where: { id: `${params.id}` }, data }
    try {
      const expensesKindUpdated = await prisma.expensesKind.update(expensesKindCondition)
      return expensesKindUpdated
    } catch (err) {
      throw err.message
    }
  }
  async destroy({ params }: HttpContext) {
    const expensesKindCondition = { where: { id: `${params.id}` } }
    const expensesKind = await prisma.expensesKind.findUnique(expensesKindCondition)
    try {
      await prisma.expensesKind.delete(expensesKindCondition)
      return `Well done! "${expensesKind?.description}", deleted successfully`
    } catch (err) {
      throw err.mesage
    }
  }
}
