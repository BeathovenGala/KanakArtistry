import { Request, Response } from 'express';
import VisitorService from '../services/visitorService';

class VisitorController {
  private visitorService: VisitorService;

  constructor() {
    this.visitorService = new VisitorService();
  }

  public logVisit = async (req: Request, res: Response): Promise<Response> => {
    const ipAddress = req.ip;
    const visitTime = new Date();

    try {
      await this.visitorService.logVisit(ipAddress, visitTime);
      return res.status(201).json({ message: 'Visit logged successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging visit', error: error.message });
    }
  };

  public getVisitorStats = async (req: Request, res: Response): Promise<Response> => {
    try {
      const stats = await this.visitorService.getVisitorStats();
      return res.status(200).json(stats);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving visitor statistics', error: error.message });
    }
  };
}

export default VisitorController;