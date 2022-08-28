const Cloud = require("@google-cloud/storage");
const path = require("path");
const CloudKey = path.join(__dirname, "../CloudKey.json");

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: CloudKey,
  projectId: process.env.PROJECT_ID,
});

module.exports = storage;
