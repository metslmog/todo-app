import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';
import taskRoutes from './routes/tasks.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function seedTestData() {
  const existingTasks = await Task.find();
  if (existingTasks.length > 0) {
    console.log('Test data already exists, skipping seeding.');
    return;
  }
  await Task.insertMany([
    {
      title: 'Laundry',
      description: 'Wash and fold clothes',
      dueDate: new Date(Date.now() + 86400000), // 1 day from now
      priority: 'high',
      project: 'Home',
      completed: false,
    },
    {
      title: 'Wash dishes',
      priority: 'medium',
      project: 'Home',
      completed: true
    }
  ]);
  console.log('Test data seeded successfully.');
}

seedTestData();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
