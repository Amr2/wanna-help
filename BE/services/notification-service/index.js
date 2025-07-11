const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.send({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Service running on port ${port}`);
});
