const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
function listenToEvents(channel, callback) {
  redis.subscribe(channel, () => {});
  redis.on("message", (chan, message) => {
    if (chan === channel) callback(JSON.parse(message));
  });
}
module.exports = { listenToEvents };
