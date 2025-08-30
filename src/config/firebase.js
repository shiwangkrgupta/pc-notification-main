const admin = require("firebase-admin");
const { cert } = require("firebase-admin/app");

const serviceAccount = require("../../serviceAccountKey.json"); // keep outside src

admin.initializeApp({
  credential: cert(serviceAccount),
});

const db = admin.firestore();
const messaging = admin.messaging();

module.exports = { db, messaging };
