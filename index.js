const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const HomeRouter = require('./routes/home.js')
const ContactRouter = require('./routes/contact.js')
const mongoose = require('mongoose')
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const Joi = require('joi');

// main affectations
const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        // origin: 'https://anasmasti.com',
        origin: 'http://localhost:4200',
        credentials: true,
        methods: ["GET", "POST"],
    }
})

// lunsh .env file
dotenv.config()

// global variables
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;

// setup body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// config for Cors
app.use(cors({
    origin: '*',
    credentials: true,
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ],
    allowedHeaders: 'Content-Type, X-Requested-With, Accept, Origin, Authorization'
}))

//Ccnnection with database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch(err => {
    console.log('Could not connect. Exiting now...', err);
    process.exit();
});

//check if new user on my app on rel time
io.on('connection', (socket) => {
    console.log('a new user connected');
    //listen on chat event
    socket.on('chat', (data) => {
        console.log('user send msg: ', data);
        //send the message to client
        io.emit('get_message', data)
    });
    socket.on('typing', () => {
        console.log('typing..');
    });
});

// Global route config
app.use('/', HomeRouter); // main
app.use('/api/contact', ContactRouter); //contact

console.log(DB_URL);
//run the server
server.listen(PORT, console.log(`Application listening on http://localhost: ${PORT}`))