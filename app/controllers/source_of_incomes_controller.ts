import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class SourceOfIncomesController {
  async index() {
    const sourceOfIncomes = await prisma.income.findMany({
      include: {
        company: true,
      },
    })
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

  async show({ params }: HttpContext) {
    const incomeCondiction = {
      where: {
        id: `${params.id}`,
      },
    }
    const income = await prisma.income.findUnique(incomeCondiction)
    return income
  }

  async update({ params, request }: HttpContext) {
    const data = request.only(['salarioBase', 'subsidios', 'company'])
    const incomeCondictionToUpdate = {
      where: {
        id: `${params.id}`,
      },
      data,
    }
    const incomeUpdated = await prisma.income.update(incomeCondictionToUpdate)
    return incomeUpdated
  }

  async destroy({ params }: HttpContext) {
    const incomeCondiction = {
      where: {
        id: `${params.id}`,
      },
    }
    await prisma.income.delete(incomeCondiction)
    return 'Source of Income deleted successfully'
  }
}
