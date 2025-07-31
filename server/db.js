const mongoose = require('mongoose');

const DB_PORT = '27017';
const DB_NAME = 'chores';

async function main() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`);
    console.log(`DB connection established successfully to DB: ${DB_NAME}!`);
  } catch (error) {
    console.log(error);
  }
}
main();

module.exports = mongoose;