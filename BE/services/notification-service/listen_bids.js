const { listenToEvents } = require('../shared/event_listener');

listenToEvents('bid.created', (data) => {
  console.log('New bid created:', data);
  // TODO: Save to notifications collection in MongoDB
});
