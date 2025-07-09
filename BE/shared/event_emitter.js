const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
function emitEvent(channel, payload) {
  redis.publish(channel, JSON.stringify(payload));
}
module.exports = { emitEvent };
