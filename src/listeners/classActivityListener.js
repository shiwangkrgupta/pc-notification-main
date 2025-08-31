const { db } = require("../config/firebase");
const { sendNotification } = require("../services/notificationService");

function classActivityListener() {
    console.log("🚀 Class Activity Listener started...");
    let isInitialLoad = true;
    db.collection("class activity").onSnapshot((snapshot) => {
        if (isInitialLoad) {
            isInitialLoad = false;
            return;
        }

        snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
                const newMsg = change.doc.data();
                console.log("📚 New class activity:", newMsg);

                const { branch, year, message } = newMsg;
                if (!branch || !year) {
                    return console.warn("⚠️ Missing branch/year in class activity message.");
                }

                // 🔎 Fetch only users from same branch + year
                const usersSnap = await db.collection("users")
                    .where("branch", "==", branch)
                    .where("year", "==", year)
                    .get();

                const tokens = usersSnap.docs
                    .map((doc) => doc.data().token)
                    .filter(Boolean);

                sendNotification(tokens, {
                    title: "📨 Class Activity",
                    body: newMsg.message,
                    click_action: "OPEN_CLASS_ACTIVITY",
                    messageType: "class_activity_notification",
                    messagePosition: newMsg?.position.toString()
                });
            }
        });
    });
}

module.exports = { classActivityListener };
