const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt =require('bcrypt-nodejs');

// Mock
const users = [
    {id: '2f24vvg', username: 'test@test.com', password: '$2a$10$/q91uTmVX0nyf1XnFFsbpOihLESpxG2u0ABtIDaAjQ1pa0CR0XSo2'}
  ]
// Mock

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('Inside local strategy callback');
        const user = users[0];
        // here is where you make a call to the database
        // to find the user based on their username or email address
        // for now, we'll just pretend we found that it was users[0] 
        if(username !== user.username) {
            return done(null, false, { message: 'Invalid username.\n'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Invalid credentials.\n'});
        }
        return done(null, user);
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

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());
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

app.post('/login', (req, res) => {
    console.log('Inside POST /login callback');
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(req.user)}`)

        req.login(user, (err) => {

            if(err) {
                console.log(err);
                return res.send('Authentication failed');
            }

            console.log('req.login() callback');
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user: ${JSON.stringify(req.user)}`);
            return res.send('You were authenticated & logged in!\n');
        })

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