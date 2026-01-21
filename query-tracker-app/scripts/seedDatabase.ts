import { connectToDatabase } from '../src/config/database';
import { Query } from '../src/models/Query';
import { Visitor } from '../src/models/Visitor';

async function seedDatabase() {
  const db = await connectToDatabase();

  // Seed Queries
  const queries = [
    { content: 'What are your store hours?', createdAt: new Date() },
    { content: 'Do you offer international shipping?', createdAt: new Date() },
    { content: 'Can I return an item?', createdAt: new Date() },
  ];

  await Query.insertMany(queries);
  console.log('Seeded Queries:', queries);

  // Seed Visitors
  const visitors = [
    { ipAddress: '192.168.1.1', visitTime: new Date() },
    { ipAddress: '192.168.1.2', visitTime: new Date() },
    { ipAddress: '192.168.1.3', visitTime: new Date() },
  ];

  await Visitor.insertMany(visitors);
  console.log('Seeded Visitors:', visitors);

  console.log('Database seeding complete!');
}

seedDatabase().catch(error => {
  console.error('Error seeding database:', error);
  process.exit(1);
});