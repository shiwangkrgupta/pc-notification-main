const { campusActivityListener } = require("./listeners/campusActivityListener");
// later import others like noticeListener, classActivityListener etc.

console.log("🚀 Pocket Campus backend running...");

campusActivityListener();
// noticeListener();
// classActivityListener();
