const { firestore, realtimeDB } = require('./firebaseConfig');

const storeUserInFirestore = async (uuid, email) => {
  console.log(`Attempting to store user with UUID: ${uuid} in Firestore`);
  try {
    await firestore.collection('users').doc(uuid).set({
      uuid: uuid,
      email: email
    });
    console.log(`User with UUID: ${uuid} stored in Firestore successfully`);
  } catch (error) {
    console.error(`Error storing user with UUID: ${uuid} in Firestore: `, error);
  }
};

const storeUserInRealtimeDB = async (uuid, email) => {
  console.log(`Attempting to store user with UUID: ${uuid} in Realtime Database`);
  try {
    await realtimeDB.ref('users/' + uuid).set({
      uuid: uuid,
      email: email
    });
    console.log(`User with UUID: ${uuid} stored in Realtime Database successfully`);
  } catch (error) {
    console.error(`Error storing user with UUID: ${uuid} in Realtime Database: `, error);
  }
};

module.exports = { storeUserInFirestore, storeUserInRealtimeDB };
