const mongoose=require("mongoose")
const Designation=require("./models/user")
//use your own key to access link
var url = "mongodb+srv://test:XnRBQDxhn9pus4Lj@cluster0.q8acrts.mongodb.net/test";
const express = require("express")
const app = express()
const bodyparser = require('body-parser')
const cors = require("cors")

let PORT = process.env.port || 2407

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(cors())

mongoose.connect(
    url,
    {
        useNewUrlParser: true,

        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.post('/createData', async (req, res) => {
    console.log(req.body)
    try {
        let data = {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        }

        console.log(data)

        let adddata = await Designation.create(data)

        return res.send({ message: "data added successfully!", adddata })
    } catch (error) {
        return error
    }
})

app.get('/findData', async (req, res) => {
    try {

        let adddata = await Designation.find()

        return res.send({ message: "", adddata })
    } catch (error) {
        return error
    }
})

app.get('/findDataById/:id', async (req, res) => {
    try {

        let id = req.params.id

        let adddata = await Designation.findById({_id:id})

        return res.send({ message: "", adddata })
    } catch (error) {
        return error
    }
})


app.delete('/deleteData/:id', async (req, res) => {
    let user = req.params.id;

    console.log(user)
    try {

        let adddata = await Designation.findByIdAndDelete({_id:user})

        return res.send({ message: "", adddata })
    } catch (error) {
        return error
    }
})

app.put('/updateData/:id', async (req, res) => {
    let user = req.params.id;
    let tabledata=req.body

    console.log(user)
    try {

        let adddata = await Designation.findByIdAndUpdate(req.params.id,{firstname:req.body.firstname,lastname:req.body.lastname,password:req.body.password,email:req.body.email,phone:req.body.phone})

        return res.send({ message: "", adddata })
    } catch (error) {
        return error
    }
})

app.post('/insertData', async (req, res) => {
    try {

        let adddata = await Designation.insertMany([{firstname:req.body.firstname,lastname:req.body.lastname,password:req.body.password,email:req.body.email,phone:req.body.phone}])

        return res.send({ message: "", adddata })
    } catch (error) {
        return error
    }
})


app.listen(PORT, function (error) {
    if (error) throw error
    console.log("Server created Successfully on PORT", PORT)
})
