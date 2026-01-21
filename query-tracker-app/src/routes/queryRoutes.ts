import { Router } from 'express';
import QueryController from '../controllers/queryController';

const router = Router();
const queryController = new QueryController();

export function setQueryRoutes(app) {
  app.use('/api/queries', router);

  router.post('/', queryController.addQuery.bind(queryController));
  router.get('/', queryController.getAllQueries.bind(queryController));
  router.get('/:id', queryController.getQueryById.bind(queryController));
  router.put('/:id', queryController.updateQuery.bind(queryController));
  router.delete('/:id', queryController.deleteQuery.bind(queryController));
}