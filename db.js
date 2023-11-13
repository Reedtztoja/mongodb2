const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Reedtz:iMn5Y3s3HVq2ahYS@cluster0.mjmbb0c.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment.");

        return client;
    } catch (e) {
        console.log("Error: " + e);
        process.exit(1);
    }
}

async function getAllListings(client) {
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    let list = collection.find().toArray();
    return list;
}

async function get(client, criteria) {
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    let list = collection.find(criteria).toArray();
    return list;
}

function close(client) {
    client.close();
    console.log("Successfully disconnected from MongoDB");
}
module.exports = {connect, getAllListings, close, get}