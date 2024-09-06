// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { storeUserInFirestore, storeUserInRealtimeDB } = require('./authService');

const app = express();
app.use(bodyParser.json());

app.post('/storeUser', async (req, res) => {
  const { uuid, email } = req.body;

  try {
    await storeUserInRealtimeDB(uuid, email);
    console.log(`User with UUID: ${uuid} and Email: ${email} stored successfully`);

    res.status(200).send('User stored successfully');
  } catch (error) {
    console.error(`Error storing user with UUID: ${uuid} and Email: ${email}: ${error.message}`);
    res.status(500).send('Error storing user: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
