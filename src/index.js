const { campusActivityListener } = require("./listeners/campusActivityListener");
const { classActivityListener } = require("./listeners/classActivityListener");
const { noticeListener } = require("./listeners/noticeListener");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

console.log("🚀 Pocket Campus backend running...");

campusActivityListener();
classActivityListener();
noticeListener();


// 🔥 ping endpoint
app.get("/ping", (req, res) => {
  res.send("ok");
  console.log("Recieved ping request -> Ping : OK")
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
