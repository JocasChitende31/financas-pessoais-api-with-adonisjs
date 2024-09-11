import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class ExpensesController {
  async index() {
    const expenses = await prisma.expenses.findMany()
    try {
      if (expenses.length <= 0) return 'There is no expense available'
      return expenses
    } catch (err) {
      throw err.message
    }
  }
  async store({ request }: HttpContext) {
    const data = request.only(['description', 'invoceRef', 'cost', 'dateOfBuying', 'expensesKind'])
    try {
      if (data !== null) {
        const expense = await prisma.expenses.create({ data })
        return `Expenses created \n ${expense} \n successfully`
      }
      return data
    } catch (err) {
      throw err.message
    }
  }
  async show({ params }: HttpContext) {
    const expenseCondiction = { where: { id: `${params.id}` } }
    const expense = await prisma.expenses.findUnique(expenseCondiction)
    try {
      return expense
    } catch (err) {
      throw err.message
    }
  }
  async update({ params, request }: HttpContext) {
    const data = request.only(['description', 'invoceRef', 'cost', 'dateOfBuying', 'expensesKind'])
    const updateExpenseCondiction = { where: { id: `${params.id}` }, data }
    const expenseUpdated = await prisma.expenses.update(updateExpenseCondiction)
    try {
      return expenseUpdated
    } catch (err) {
      throw err.message
    }
  }
  async destroy({ params }: HttpContext) {
    const expenseCondiction = { where: { id: `${params.id}` } }
    const exepenseToDelete = await prisma.expenses.findUnique(expenseCondiction)
    try {
      await prisma.expenses.delete(expenseCondiction)
      return `Well done! "${exepenseToDelete?.description}", deleted successfully`
    } catch (err) {
      throw err.message
    }
  }
}
