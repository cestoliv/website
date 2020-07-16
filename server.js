var express = require('express')
var compression = require('compression')
var bodyParser = require("body-parser")
var session = require('express-session')
var fs = require("fs")

var mime_ext = require('mimetype-extension')

//OBJET APP
var app = express()

////////////////////////////////////////////////////////////////////////////////////APP//////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(session({
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: false
}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// WEB CLIENT
app.get("/", (req, res) => res.render("index.ejs"))

/////////////////////////////////////FILES
.get("/files/:type/:fileName", (req, res) => {
    req.params.fileName.match(new RegExp(/\.([a-z]+?)$/))
    let fileExt = RegExp.$1

    let folder = req.params.type

    if(folder == "svg" || folder == "png" || folder == "jpg" || folder == "jpeg") {
        folder = "imgs"
    }

    fs.readFile("./res/public_res/" + folder + "/" + req.params.fileName, "", (err, data) => {
        if(err) {
            res.sendStatus(404)
        }
        else {
            res.header('Access-Control-Allow-Origin', '*')
            res.setHeader("Content-Type", mime_ext.get(fileExt))
            res.send(data)
        }
    })
})

app.use((req, res) => {
    res.sendStatus(404)
})
app.listen(8064)
