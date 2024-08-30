import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class SourceOfIncomesController {
  async index() {
    const sourceOfIncomes = await prisma.income.findMany()
    try {
      if (sourceOfIncomes.length <= 0) return 'There is no source of incomes registered'
      return sourceOfIncomes
    } catch (e) {
      throw e.message
    }
  }

  async store({ request }: HttpContext) {
    const data = request.only(['salarioBase', 'subsidios', 'company'])

    try {
      const sourceOfIncome = await prisma.income.create({ data })
      return `User created successfully, \n ${sourceOfIncome}`
    } catch (e) {
      console.log(e.message)
      throw e.message
    }
  }
}
