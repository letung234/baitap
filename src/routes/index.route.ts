import { Express, Request, Response } from 'express'
import SalaryRouter from './salary.routes'
import UserRouter from './user.routes'
import RoleRouter from './role.routes'
import SalaryStructureRouter from './salaryStructure.routes'
const Routes = (app: Express): void => {
  app.use(`/salary`, SalaryRouter)
  app.use('/users', UserRouter)
  app.use('/role', RoleRouter)
  app.use('/salaryStructure', SalaryStructureRouter)
}
export default Routes
