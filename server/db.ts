import mongoose from 'mongoose';

const DB_PORT: string = '27017';
const DB_NAME: string = 'chores';

async function main(): Promise<void> {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`);
    console.log(`DB connection established successfully to DB: ${DB_NAME}!`);
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

main();

export default mongoose;