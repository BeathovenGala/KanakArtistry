import { Router } from 'express';
import VisitorController from '../controllers/visitorController';

const router = Router();
const visitorController = new VisitorController();

export function setVisitorRoutes(app) {
  app.use('/api/visitors', router);

  router.post('/log', visitorController.logVisit.bind(visitorController));
  router.get('/', visitorController.getVisitorStats.bind(visitorController));
}