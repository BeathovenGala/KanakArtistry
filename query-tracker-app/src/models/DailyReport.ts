import { Schema, model, Document } from 'mongoose';

interface IDailyReport extends Document {
  date: Date;
  totalQueries: number;
  totalVisitors: number;
  newQueries: number;
  newVisitors: number;
}

const dailyReportSchema = new Schema<IDailyReport>({
  date: { type: Date, required: true, unique: true },
  totalQueries: { type: Number, required: true },
  totalVisitors: { type: Number, required: true },
  newQueries: { type: Number, required: true },
  newVisitors: { type: Number, required: true },
});

const DailyReport = model<IDailyReport>('DailyReport', dailyReportSchema);

export default DailyReport;