var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs"); // not required this time since we aren't reading from a file
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// MongoDB
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

// GET method to show/read all events contained in Mongo database
app.get("/listEvents", async (req, res) => {
    await client.connect(); // connects NodeJS to MongoDB

    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("romanEmpireEvents")
        .find(query)
        .limit(100)
        .toArray();

    console.log(results);
    res.status(200);
    res.send(results);
});

// GET method to retrieve the event that matches the requested id
app.get("/listEvents/:id", async (req, res) => {
    try {
        const productid = Number(req.params.id);
        console.log("Event to find :", productid);

        await client.connect();

        console.log("Node connected successfully to GET-id MongoDB");
        const query = { "id": productid };

        const results = await db.collection("romanEmpireEvents")
            .findOne(query);

        console.log("Results :", results);
        if (!results) res.send("Not Found").status(404);
        else res.send(results).status(200);
    }

    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

// POST method to add a new event to the database/product catalog
app.post("/addEvent", async (req, res) => {

    // use try-and-catch in case the server finds an error
    try {
        // check if request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Bad request: No data provided.' });
        }

        await client.connect();

        // check if "romanEmpireEvents" collection exists
        const collections = await db.listCollections({ name: "romanEmpireEvents" }).toArray();
        if (collections.length === 0) {
            return res.status(404).send({ error: 'Not found: Collection does not exist.' });
        }

        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        const newDocument = {
            "id": req.body.id,
            "title": req.body.title,
            "description": req.body.description,
            "sites": req.body.sites.map(site => ({
                "name": site.name,
                "url": site.url
            })),
            "image": req.body.image,
            "category": req.body.category,
            "notes": req.body.notes
        };
        console.log(newDocument);

        // check if id is unique in collection, meaning if duplicate events exist or not
        const existingDoc = await db.collection("romanEmpireEvents").findOne({ "id": newDocument.id });
        if (existingDoc) {
            return res.status(409).send({ error: 'Conflict: An event with this ID already exists.' });
        }

        const results = await db
            .collection("romanEmpireEvents")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    }

    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }

});

// PUT method to update the text of an event existing in the database
app.put("/updateEvent/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };

    await client.connect();

    console.log("Event to Update :", id);

    // Data for updating the document, typically comes from the request body
    console.log(req.body);

    const updateData = {
        $set: {
            "notes": req.body.notes,
        }
    };

    // read data from robot to update to send to frontend
    const eventUpdated = await db.collection("romanEmpireEvents").findOne(query);

    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = {};
    const results = await db.collection("romanEmpireEvents").updateOne(query, updateData, options);

    // If no document was found to update, you can choose to handle it by sending a 404 response
    if (results.matchedCount === 0) {
        return res.status(404).send({ message: 'Event not found' });
    }

    res.status(200);
    res.send(eventUpdated);
});

// DELETE method to delete the requested product from the database/catalog
app.delete("/deleteEvent/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        await client.connect();
        console.log("Event to delete:", id);

        const query = { id: id };

        // read data to delete to send it to frontend to validate what you're deleting
        const eventDeleted = await db.collection("romanEmpireEvents").findOne(query);

        // delete
        const results = await db.collection("romanEmpireEvents").deleteOne(query);
        res.status(200);
        res.send(eventDeleted);
    }
    catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log("App listening at http://127.0.0.1:27017", host, port);
});
