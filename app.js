const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;
const app = express();
const mongoose = require("mongoose");



app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin-mank:mankMongo@cluster0.5sulplv.mongodb.net/loginDB", {useNewUrlParser: true});

//Creation of schema
const logSchema = {
    email: String,
    password : String,
}

//Creation of model
const log = mongoose.model("log", logSchema);


//Get to the singnup page
app.get("/", function (requ, resp) {
    resp.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var email_form = req.body.emailindex;
    var pwd = req.body.password;
    let name = req.body.person_name;


    res.render("success",{emailId : email_form, namePerson: name});
    //console.log(name+ " - "+ email_form+ " - "+pwd);
    
    //console.log("Entering the data in database");

    const obj_data = new log({
        email: String(email_form),
        password: String(pwd)
    });

    obj_data.save();
})


app.listen(port, function(){
    console.log("Server is runing on port 3000");
})