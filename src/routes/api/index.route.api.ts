import { Express } from 'express'
import ApiSalaryRouter from './salary.route.api'
import UploadRoutes from './upload.routes.api'
import ApiRoleRouter from './role.routes.api'
import ApiUserRouter from './user.routes.api'
import ApisalaryStructureRouter from './salaryStructure.routes.api'
const ApiRoutes = (app: Express): void => {
  app.use(`/api/salary`, ApiSalaryRouter)
  app.use(`/api/upload`, UploadRoutes)
  app.use(`/api/role`, ApiRoleRouter)
  app.use('/api/users', ApiUserRouter)
  app.use('/api/salaryStructure', ApisalaryStructureRouter)
}
export default ApiRoutes
