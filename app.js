// API Key 
// 7bd40e277d96e1724458a41101b003ed-us17

// List Id
// 16159a709a


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("node:https");



app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // console.log(firstName + "\n" + lastName+ "\n" +email);

    const data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jasonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/16159a709a";
    const options = {
        method: "POST",
        auth: "mukesh1:7bd40e277d96e1724458a41101b003ed-us17"
    }

   const requests = https.request(url, options, function(response){

    if (response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html")
    }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    requests.write(jasonData);
    requests.end();

})


// Failure response

app.post("/failure", function(req, res){ //
    res.redirect("/");                  //
})                                     //
////////////////////////////////////////

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on Port 3000");
})
