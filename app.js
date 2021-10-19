const bodyParser = require("body-parser");
const express = require("express");
const nodemon = require("nodemon");
const request = require("request");

const app = express();
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})
app.listen(3000, function () {
    console.log("Server Started!!\nListening to port: http://localhost:3000/")
});