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

module.exports = {connect}