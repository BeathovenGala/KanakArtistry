import nodemailer from 'nodemailer';

const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(emailConfig);

const emailTemplates = {
  dailyReport: (reportData) => {
    return `
      <h1>Daily Report</h1>
      <p>New queries received:</p>
      <ul>
        ${reportData.map(query => `<li>${query.content} (Received at: ${query.createdAt})</li>`).join('')}
      </ul>
    `;
  },
};

export { transporter, emailTemplates };