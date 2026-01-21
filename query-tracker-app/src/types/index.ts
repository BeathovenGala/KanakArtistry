export interface Query {
  id: string;
  content: string;
  createdAt: Date;
}

export interface Visitor {
  id: string;
  ipAddress: string;
  visitTime: Date;
}

export interface DailyReport {
  date: Date;
  totalQueries: number;
  uniqueVisitors: number;
  queries: Query[];
  visitors: Visitor[];
}