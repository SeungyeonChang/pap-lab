require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
// const bodyParse = re
//set the view engine to ejs
const { MongoClient, ServerApiVersion } = require('mongodb');

let path = require('path');
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.get('/', function (req, res) {
    
//   res.send('Hello World from Express')
// })

// user res.render to load up an ejs view file

let myTypeServer ="Type 5 (The Investigator)";

app.get('/', function (req, res){
  res.render('index', {
    myTypeClient: myTypeServer,
    // myResultClient: myTypeServer
  })
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const result = await client
    .db("papa-database")
    .collection("papa-collection")
    .find()
    .toArray();

    // console.log("cxnDB result: ", result);
    return result;

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);

app.get('/read', async (req,res)=>{
  
  let myResultServer = await run();

  console.log("myResultServer:",myResultServer);

  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: myResultServer
  });

});

run().catch(console.dir);

app.get('/send', function (req, res) {
    
  res.sendFile(__dirname + '/index.html');
})

//app.listen(3000)

app.listen(port, () => {
  console.log(`papa app listening on port ${port}`)
})