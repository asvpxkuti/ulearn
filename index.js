const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('mongoose');
const cors = require("cors");
const mongoose = require('mongoose');
const config = require('./config/properties');
const contactController = require('./routes/contactRouter');


const app = express();

// Connect To Database (OLD CODE)
mongoose.connect(config.database,{ useNewUrlParser: true }).then(()=>{
    console.log('connected successfully');
});
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database ');
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});


// Port Number
const port = process.env.PORT || 5000;

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:4200',
    preflightContinue: false
};

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':false}));

app.use(cors(corsOptions));
app.use('/contacts', contactController);

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
});