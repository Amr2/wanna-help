const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const { keyword, category } = req.query;
  // Simulate filtering logic
  res.send({
    results: [
      { id: 1, title: 'Fix my sink', category: 'home_services' },
      { id: 2, title: 'Design a logo', category: 'design' }
    ].filter(item =>
      (!keyword || item.title.includes(keyword)) &&
      (!category || item.category === category)
    )
  });
});

app.listen(3000, () => {
  console.log('Search service listening on port 3000');
});
