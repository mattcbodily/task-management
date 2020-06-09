require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      sessions = require('express-session'),
      authCtrl = require('./controllers/authController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express();

app.use(express.json());
app.use(sessions({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
})

app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))