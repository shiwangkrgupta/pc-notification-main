const { messaging } = require("../config/firebase");

async function sendNotification(tokens, title, body, extraData = {}) {
  if (!tokens || tokens.length === 0) {
    console.log("⚠️ No tokens to notify");
    return;
  }

  const multicastMsg = {
    data: {title, body, ...extraData},  // chatId, messageType etc.
    tokens,
  };

  try {
    const response = await messaging.sendEachForMulticast(multicastMsg);
    console.log(`✅ Sent: ${response.successCount}, ❌ Failed: ${response.failureCount}`);
  } catch (err) {
    console.error("❌ Notification error:", err);
  }
}

module.exports = { sendNotification };
