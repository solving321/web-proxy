const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    // Log the requested URL
    console.log(`Proxying: ${url}`);

    // Fetch the requested URL
    request({ url, method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } }, (error, response, body) => {
        if (error) {
            console.error(`Error fetching the URL: ${error.message}`);
            return res.status(500).send('Error fetching the URL');
        }

        // Set the appropriate headers
        res.setHeader('Content-Type', response.headers['content-type']);
        res.status(response.statusCode).send(body);
    });
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});