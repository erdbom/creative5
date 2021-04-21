const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

const users = require("./users.js");
//const User = users.model;
const validUser = users.valid;

// Create a scheme for items in the museum: a title and a path to an image.
const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: String,
    price: Number,
    image: String,
    activities: Array,
    isInItinerary: Boolean
});

const Location = mongoose.model('Location', locationSchema);

mongoose.connect('mongodb://localhost:27017/vacation2', {
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.post('/api/itinerary', validUser, async (req, res) => {
    const location = new Location({
        user: req.user,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        activities: req.body.activities,
        isInItinerary: req.body.isInItinerary
    });
    try {
        await location.save();
        res.send(location);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/itinerary/:id', validUser, async (req, res) => {
    try {
        await Location.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/itinerary', validUser, async (req, res) => {
    try {
        let itinerary = await Location.find({
            user: req.user
        }).populate('user');
        res.send(itinerary);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/itinerary/:id', validUser, async (req, res) => {
    try {
        let location = await Location.findOne({
            _id: req.params.id
        });
        location.activities = req.body.activities;
        await location.save();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.use("/api/users", users.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));

