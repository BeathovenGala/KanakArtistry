import { CronJob } from 'cron';
import { EmailService } from './emailService';
import { QueryService } from './queryService';
import { VisitorService } from './visitorService';

export class SchedulerService {
  private emailService: EmailService;
  private queryService: QueryService;
  private visitorService: VisitorService;

  constructor() {
    this.emailService = new EmailService();
    this.queryService = new QueryService();
    this.visitorService = new VisitorService();
    this.scheduleDailyReport();
  }

  private scheduleDailyReport() {
    const job = new CronJob('0 6 * * *', async () => {
      try {
        const newQueries = await this.queryService.getQueriesFromYesterday();
        const visitorStats = await this.visitorService.getVisitorStatsFromYesterday();
        await this.emailService.sendDailyReport(newQueries, visitorStats);
        console.log('Daily report sent successfully.');
      } catch (error) {
        console.error('Error sending daily report:', error);
      }
    });

    job.start();
  }
}