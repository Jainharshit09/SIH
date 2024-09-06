
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://team007-dc442-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const firestore = admin.firestore();
const realtimeDB = admin.database();

console.log('Firebase Admin SDK initialized successfully.');
console.log('Connected to Firestore and Realtime Database.');

module.exports = { firestore, realtimeDB };
