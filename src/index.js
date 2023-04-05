const connectToMongo = require('./db')
const express = require("express")
const bodyParser = require('body-parser');
var cors = require('cors')
var path = require('path')

connectToMongo();

const app = express()
const port = 5000
app.use(cors())
app.use(bodyParser.json());

const static_path = path.join(__dirname, "../public")

app.use(express.static(static_path))

app.set("view engine", "hbs")
//Available Routes
app.get("/", (req, res) => {
    res.render("index")
})
app.use('/', require(('./routes/info')))

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})