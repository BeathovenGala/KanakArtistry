import { Query } from '../models/Query';

export class QueryService {
  async createQuery(content: string): Promise<Query> {
    const query = new Query({ content });
    await query.save();
    return query;
  }

  async getAllQueries(): Promise<Query[]> {
    return await Query.find();
  }

  async getQueryById(id: string): Promise<Query | null> {
    return await Query.findById(id);
  }

  async updateQuery(id: string, content: string): Promise<Query | null> {
    return await Query.findByIdAndUpdate(id, { content }, { new: true });
  }

  async deleteQuery(id: string): Promise<Query | null> {
    return await Query.findByIdAndDelete(id);
  }
}