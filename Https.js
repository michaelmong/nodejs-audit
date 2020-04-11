const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('./privateKey.key', 'utf8');
const certificate = fs.readFileSync('./certificate.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require("express");
const app = express();

const path = require('path').join(__dirname, '.');
app.use(express.static(path));

app.route('/')
    .get((req, res) => {
    res
        .send('<html><head></head><body>Hello, express<div><img src="public/grey100x100.jpg"></body></html>')
        .status(200)
        .end();
})

//portNo = process.env.PORT || 3000;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => console.log('Listening http on port 3000...'));
httpsServer.listen(3773, () => console.log('Listening https on port 3773...'));
