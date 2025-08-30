const { db } = require("../config/firebase");
const { sendNotification } = require("../services/notificationService");

function campusActivityListener() {
  let isInitialLoad = true;
  db.collection("campus activity").onSnapshot((snapshot) => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }

    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const newMsg = change.doc.data();
        console.log("📨 New campus activity:", newMsg);

        // Example: broadcast to everyone
        db.collection("users").get().then((snap) => {
          const tokens = snap.docs.map((doc) => doc.data().token).filter(Boolean);
          sendNotification(tokens, "📨 Campus Activity", newMsg.message, {
            click_action: "OPEN_CHAT_ACTIVITY",
            chatID: "campus_activity_notification",
            messagePosition: newMsg?.position.toString(),
            messageType: "chat",
          });
        });
      }
    });
  });
}

module.exports = { campusActivityListener };
