const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const cors = require('cors');
const ObjectId = mongoose.Types.ObjectId;
const Admin = require('./models/admin');

const dbURL = 'mongodb://localhost/testDB';

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('Inside local strategy callback');
        Admin.findOne({ username: username}, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
              return done(null, false, {
                message: 'User not found\n'
              });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
              return done(null, false, {
                message: 'Password is wrong\n'
              });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
        
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
   console.log('Inside deserializeUser callback')
   console.log(`The user id passport saved in the session file store is: ${id}`)
   const user = users[0].id === id ? users[0] : false; 
   done(null, user);
});

// Mongoose setup
mongoose.connect(dbURL);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'))

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());
app.use(cors());
// Generates session id and shit
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware');
        console.log(req.sessionID);
        return uuid();
    },
    store: new FileStore(),
    secret: 'imdoingthislastminute',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    console.log(req.sessionID)
    res.send('home page\n')
  });

app.post('/admin/register', (req, res) => {

    var admin = new Admin();

    admin.username = req.body.username;
    admin.setPassword(req.body.password);

    admin.save(function(err) {
        if(err) {
            res.send('Unable to register');
        } else {
            //res.status(200);
            res.send(`${req.body.username} registered`)
        }
    })

});

app.post('/admin/login', (req, res) => {
    console.log('Inside POST /login callback');
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(req.user)}`)

        if(err) {
            console.error(err);
            return res.send('Authentication failed');
        }

        if(user) {
            req.login(user, (err) => {

                if(err) {
                    console.error(err);
                    return res.send('Authentication failed');
                }

                console.log('req.login() callback');
                console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
                console.log(`req.user: ${JSON.stringify(req.user)}`);
                return res.send('You were authenticated & logged in!\n');
        }) } else {
            console.info(info);
            res.send(info.message);
        }

    })(req, res);
})

app.get('/authrequired', (req, res) => {
    if(req.isAuthenticated()) {
      res.send('you hit the authentication endpoint\n')
    } else {
      res.redirect('/')
    }
})

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
});