const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb')
const { getDb } = require('./dbConnection/connection');
const dbMiddleware = require('./middleware/dbMiddleware');
require('dotenv').config();

app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(dbMiddleware);

app.get('/', async (req, res) => {
    const collection = req.collection;
    const records = await collection.find({}).toArray();
    res.status(200).json(records);
});

app.post('/', async (req, res) => {
    const collection = req.collection;
    const { name } = req.body;
    collection.insertOne({ name: name });
    res.status(201).json({ data: req.body })
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await collection.findOne({ _id: new ObjectId(id) });
    res.status(200).json({ data: data });
});

app.put('/test/:id', async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    collection.updateOne({ _id: new ObjectId(id) }, { $set: { name: name } });
    res.status(200).json({ data: req.body });
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ data: `${id} deleted successfully` });
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`App is running on port ${port}`)
});