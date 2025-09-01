require("dotenv").config();

const admin = require("firebase-admin");
const { cert } = require("firebase-admin/app");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);


admin.initializeApp({
  credential: cert(serviceAccount),
});

const db = admin.firestore();
const messaging = admin.messaging();

module.exports = { db, messaging };
