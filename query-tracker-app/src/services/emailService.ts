import nodemailer from 'nodemailer';
import { EmailConfig } from '../config/email';
import { DailyReport } from '../models/DailyReport';

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EmailConfig.host,
      port: EmailConfig.port,
      secure: EmailConfig.secure,
      auth: {
        user: EmailConfig.user,
        pass: EmailConfig.pass,
      },
    });
  }

  async sendDailyReport(report: DailyReport) {
    const mailOptions = {
      from: EmailConfig.from,
      to: EmailConfig.to,
      subject: 'Daily Report - New Queries',
      text: this.formatReport(report),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Daily report email sent successfully.');
    } catch (error) {
      console.error('Error sending daily report email:', error);
    }
  }

  private formatReport(report: DailyReport): string {
    return `Daily Report:\n\nNew Queries:\n${report.queries.map(q => `- ${q.content}`).join('\n')}\n\nVisitor Statistics:\nTotal Visitors: ${report.totalVisitors}`;
  }
}