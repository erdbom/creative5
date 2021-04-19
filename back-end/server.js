const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// Create a scheme for items in the museum: a title and a path to an image.
const locationSchema = new mongoose.Schema({
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

app.post('/api/itinerary', async (req, res) => {
    const location = new Location({
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

app.delete('/api/itinerary/:id', async (req, res) => {
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

app.get('/api/itinerary', async (req, res) => {
    try {
        let itinerary = await Location.find();
        res.send(itinerary);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/itinerary/:id', async (req, res) => {
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

app.listen(3003, () => console.log('Server listening on port 3003!'));

