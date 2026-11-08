const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const projectId = process.env.FIREBASE_PROJECT_ID;
const region = process.env.FUNCTIONS_REGION;

if (!projectId) {
  throw new Error('FIREBASE_PROJECT_ID is required. Copy .env.example to .env and configure it.');
}

if (!region) {
  throw new Error('FUNCTIONS_REGION is required. Copy .env.example to .env and configure it.');
}

module.exports = { projectId, region };
