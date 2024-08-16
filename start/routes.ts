/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const WorkCompaniesController = () => import('#controllers/work_companies_controller')

router.get('/', async () => {
  return {
    hello: 'api finanças públicas',
  }
})
//User
router.get('users', [UsersController, 'index'])
router.get('user/:id', [UsersController, 'show'])
router.post('create-user', [UsersController, 'store'])
router.put('update-user/:id', [UsersController, 'update'])
router.delete('delete-user/:id', [UsersController, 'destroy'])

//WorkCompany
router.get('companies', [WorkCompaniesController, 'index'])
router.get('company/:id', [WorkCompaniesController, 'show'])
router.post('create-company', [WorkCompaniesController, 'store'])
router.put('update-company/:id', [WorkCompaniesController, 'update'])
router.delete('delete-company/:id', [WorkCompaniesController, 'destroy'])
