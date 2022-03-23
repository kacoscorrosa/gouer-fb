const admin = require("firebase-admin");

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gouer-app-default-rtdb.firebaseio.com"
});

module.exports = admin;