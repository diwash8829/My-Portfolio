const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");

const Contact = require("./model/Contact");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://admin:admin123@cluster0-zgb80.mongodb.net/test?retryWrites=true", { useNewUrlParser: true } )
.then(()=>{
    console.log("Connected...")
})
.catch(err => console.log(err))

app.use(express.static("public"));
app.use('/images', express.static(__dirname + '/Images'));

app.get("/index", (req, res) => {
    res.redirect("index.html");
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/home.html'));
})

app.post("/contact", (req, res) => {
    console.log(req.body)
    const contact = new Contact(req.body);
    contact.save().then(result=> {
        res.status(200).json({message: "Successfully sent"})
    }).catch(err => {
        res.redirect("/")
    })

})

app.listen(PORT, () => {
    console.log("App running on server " + PORT);
});