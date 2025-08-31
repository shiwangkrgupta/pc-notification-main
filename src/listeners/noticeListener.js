const { db } = require("../config/firebase");
const { sendNotification } = require("../services/notificationService");

function noticeListener() {
    console.log("🚀 Notice Listener started...");
    let isInitialLoad = true;
    db.collection("notice pdfs").onSnapshot((snapshot) => {
        if (isInitialLoad) {
            isInitialLoad = false;
            return;
        }

        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const newNotice = change.doc.data();
                console.log("New Notice :", newNotice);

                // Example: broadcast to everyone
                db.collection("users").get().then((snap) => {
                    const tokens = snap.docs.map((doc) => doc.data().token).filter(Boolean);
                    sendNotification(tokens, {
                        title: "New Notice Release",
                        body: "📄 "+newNotice?.fileName,
                        messageType: "new_notice_notification",
                    });
                });
            }
        });
    });
}

module.exports = { noticeListener };
