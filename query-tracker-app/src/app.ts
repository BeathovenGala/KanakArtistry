import express from 'express';
import { json } from 'body-parser';
import { setQueryRoutes } from './routes/queryRoutes';
import { setVisitorRoutes } from './routes/visitorRoutes';
import { connectToDatabase } from './config/database';
import { logger } from './utils/logger';
import { SchedulerService } from './services/schedulerService';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Connect to the database
connectToDatabase()
  .then(() => {
    logger.info('Database connected successfully');
    
    // Set up routes
    setQueryRoutes(app);
    setVisitorRoutes(app);
    
    // Start the scheduler for daily reports
    const schedulerService = new SchedulerService();
    schedulerService.start();

    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    logger.error('Database connection failed:', error);
    process.exit(1);
  });