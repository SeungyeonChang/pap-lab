const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
//set the view engine to ejs
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
    myTypeClient: myTypeServer
  })
});


app.get('/send', function (req, res) {
    
  res.sendFile(__dirname + '/index.html');
})

//app.listen(3000)

app.listen(port, () => {
  console.log(`nov app listening on port ${port}`)
})