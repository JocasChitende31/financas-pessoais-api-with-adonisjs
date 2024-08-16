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
router.get('/user/:id', [UsersController, 'show'])
router.post('create', [UsersController, 'store'])
router.put('update/:id', [UsersController, 'update'])
router.delete('delete/:id', [UsersController, 'destroy'])

//WorkCompany
router.get('companies', [WorkCompaniesController, 'index'])
router.post('company', [WorkCompaniesController, 'store'])
