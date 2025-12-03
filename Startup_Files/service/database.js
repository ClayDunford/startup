const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const crypto = require('crypto');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const succulentCollection = db.collection('succulents');


succulentCollection.createIndex({ owner: 1 }, { unique: true })
  .then(() => console.log('Unique index confirmed'))
  .catch(err => console.error('Failed to create unique index:', err));

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function getAllUsers() {
  return await userCollection.find({}).toArray();
}

async function getSucculent(username) {
  return succulentCollection.findOne({ owner: username });
}

async function createSucculent(owner) {
  const newSucculent = {
    id: crypto.randomUUID(),
    owner,
    size: 1,
    water: 6,
    potColor: '#a97c50',
    updatedAt: new Date().toISOString(),
  };
  await succulentCollection.insertOne(newSucculent);
  return newSucculent;
}

async function updateSucculent(owner, updates) {
  const result = await succulentCollection.updateOne(
    { owner },
    { $set: { ...updates, updatedAt: new Date().toISOString() } },
    { upsert: true }
  );
  return result;
}

async function getAllSucculents() {
  return await succulentCollection.find({}).toArray();
}


module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getAllUsers,
  getSucculent,
  createSucculent,
  updateSucculent,
  getAllSucculents,
};
