const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const port = 3000;

const app = express();

// Generates session id and shit
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware')
        console.log(req.sessionID)
        return uuid()
    },
    store: new FileStore(),
    secret: 'imdoingthislastminute',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    console.log(req.sessionID)
    res.send('home page\n')
  })

app.listen(port, () => {
    console.log(`Listenint on localhost:${port}`);
});