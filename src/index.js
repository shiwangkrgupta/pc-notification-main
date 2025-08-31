const { campusActivityListener } = require("./listeners/campusActivityListener");
const { classActivityListener } = require("./listeners/classActivityListener");
const { noticeListener } = require("./listeners/noticeListener");

// later import others like noticeListener, classActivityListener etc.

console.log("🚀 Pocket Campus backend running...");

campusActivityListener();
classActivityListener();
noticeListener();
