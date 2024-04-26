const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const uri = require("./connection");
const { handle404, handle500 } = require('./Controllers/errorController');
const { getAllUsers, postUser, getUserByEmail, loginUser, patchUser, addBookedEventToUser } = require('./Controllers/userController');
const { getAllEvents, postEvent, getEventByID, deleteEventByID } = require('./Controllers/eventController');
const { port = 9090 } = process.env;
const { google } = require('googleapis');
require('dotenv').config();
// const multer = require("multer");
// const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(uri);

app.get('/users', getAllUsers);
app.get('/events', getAllEvents);
app.get('/events/:eventID', getEventByID);
app.get('/users/:email', getUserByEmail);
app.post('/event', postEvent);
app.post('/admin/addevent', postEvent);
app.post('/user', postUser);
app.post('/login', loginUser);
app.patch('/users/:email', patchUser);
app.delete('/events/:eventID', deleteEventByID);
app.patch('/users/:email/bookEvent', addBookedEventToUser);



// Image storage engine

// const storage = multer.diskStorage({
//     destination: 'upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({storage:storage});


const corsOptions = {
    origin: ['https://checkmyevents.netlify.app', "https://events-sihs.onrender.com"], 
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization, Access-Control-Allow-Origin',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 

const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID, 
    process.env.CLIENT_SECRET, 
    process.env.REDIRECT)

const session = require('express-session');

app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.get('/auth', (req, res) => {
    // Assuming event details are passed as query parameters for simplicity
    req.session.eventForCalendar = req.query;
    console.log(req.query);

    const url = OAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/calendar',
        prompt: 'consent',
        state: JSON.stringify({ event: req.query }),  //  Pass event as state
    });
    res.redirect(url);
});

app.get('/redirect', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await OAuth2Client.getToken(code);
        OAuth2Client.setCredentials(tokens);
        const event = req.session.eventForCalendar; 
        const eventToAdd = {
            summary: event.summary,
            description: event.description,
            location: event.location,
            start: {
                dateTime: event.startDateTime,
                timeZone: 'Europe/London'
            },
            end: {
                dateTime: event.endDateTime,
                timeZone: 'Europe/London'
            }
        }
        const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });
        const result = await calendar.events.insert({
            calendarId: 'primary',
            resource: eventToAdd,
        });
        res.redirect(`https://checkmyevents.netlify.app/success`);  //frontend
    } catch (error) {
        console.error('Failed to exchange code for tokens:', error);
        res.status(500).send('Authentication failed');
    }
});



// app.use('/images', express.static('upload/images'));

// app.post("/upload", upload.single('event'), (req, res) => {
//     if (req.file) {
//         res.json({
//             success: 1,
//             image_url: `http://localhost:9090/images/${req.file.filename}`
//         });
//     } else {
//         res.status(400).json({ success: 0, message: "No file uploaded." });
//     }
// });


app.use(handle404)
app.use(handle500);


module.exports = app;