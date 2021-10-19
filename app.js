const bodyParser = require("body-parser");
const express = require("express");
const nodemon = require("nodemon");
const request = require("request");
const https = require("https");
const { Http2ServerRequest } = require("http2");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
// API Key
// 72fa2ceb2ecb87579fb3d7faea041a02-us5

// Audience/List Id
// 43751ec06a
app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);

    const data = {
        members: [
            {
                "email_address": email,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": firstName,
                    "LNAME": lastName
                }

            }
        ]
    };

    const dataJSON = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/43751ec06a";
    const options = {
        method: "POST",
        auth: "manish:72fa2ceb2ecb87579fb3d7faea041a02-us5"
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            // console.log(response.statusCode);
            if (response.statusCode === 200) {
                // res.send("Successfully subscribed!!");
                res.sendFile(__dirname + "/success.html");
            } else {
                // res.send("There is a problem, Please try again");
                res.sendFile(__dirname + "/failure.html");
            }
            // console.log(JSON.parse(data));
        })
    });

    request.write(dataJSON);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");  
});

app.listen(3000, function () {
    console.log("Server Started!!\nListening to port: http://localhost:3000/")
});