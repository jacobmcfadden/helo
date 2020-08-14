require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
const auth = require('./controllers/authController');
const ctrl = require('./controllers/controller');

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48}
    
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
    }).then( db => {
        app.set('db', db)
        console.log('connected to db')
    }).catch( err => console.log(err))

// Put endpoints here
app.post('/auth/login', auth.login)
app.post('/auth/register', auth.register)
app.get('/auth/logout', auth.logout)
app.get('/auth/user', auth.getUser)
app.get('/api/posts', ctrl.getPosts)
app.post('/api/posts', ctrl.createPost)
app.delete('/api/posts', ctrl.deletePost)

app.listen(SERVER_PORT, ()=> console.log(`Connected to port ${SERVER_PORT}`))

