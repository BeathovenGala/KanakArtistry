import { Visitor } from '../models/Visitor';

export class VisitorService {
  async logVisit(ipAddress: string): Promise<void> {
    const visitTime = new Date();
    const visitor = new Visitor({ ipAddress, visitTime });
    await visitor.save();
  }

  async getVisitorStatistics(): Promise<any> {
    const totalVisitors = await Visitor.countDocuments();
    const uniqueVisitors = await Visitor.distinct('ipAddress').countDocuments();
    return {
      totalVisitors,
      uniqueVisitors,
    };
  }

  async getVisitsByDate(date: Date): Promise<any[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await Visitor.find({
      visitTime: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
  }
}