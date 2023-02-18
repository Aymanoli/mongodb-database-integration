const express = require('express');
const { MongoClient} = require('mongodb');
const cors = require('cors')
const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: mydbuser-1
// pass: NeBywKyFGLpltKyG

const uri = "mongodb+srv://testuser:saI0viSG97bjATZd@cluster0.far0qag.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("lalalala");
        const usersCollection = database.collection("users");
        
        //post API
        app.post("/users", async(req, res) =>{
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log("got new user", req.body);
            console.log("added user", result)
            res.json(result);
        })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Runnig my CRUD Server");
});

app.listen(port, () => {
    console.log('running server on port', port);
})