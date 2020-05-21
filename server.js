const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 80;
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const Order = require("./models/Order");
const Product = require("./models/Product");
// Connect to the Mongo DB
var mongodb_url = process.env.MONGO_URL || "mongodb://localhost:27017/local";
mongoose.connect( mongodb_url, { useNewUrlParser: true });
var dessert = mongoose.connection;

//test mongooes
dessert.on("error", function(err){
  console.log("mongoose err: " + err);
});
dessert.once("open", function(){
  console.log("Mongoose connection successful.");
});

app.use(cors());
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Define API routes here

//create order API
app.post("/orders/:productId", (req, res) => {
  //console.log(req.params.id);
  console.log(req.body)
  Order.create({
    productId:req.params.productId,
    customerName: req.body.customerName,
    customerId: req.body.customerId,
    quantity: req.body.quantity,
    isChecked: false,
    date: new Date() //constructor
  }).then((data)=>{
    //console.log('order productId data'+data);
    res.json(data);
  });
});

app.get("/orders", (req, res) => {
  console.log(req.orders);
  Order.find().then((data)=>{
    console.log('order data' + data);
    res.json(data);
    });
});

app.get("/my_orders", (req, res) => {
  Order.find({ customerName: req.body.customerName}).then((data)=>{
    console.log('order data' + data);
    res.json(data);
    });
});

app.delete("/orders/:order_id", (req, res)=> {
  Order.findByIdAndRemove(req.params.order_id)
  .then((data)=> {
    res.json(data);
  });
});

app.delete("/products/:product_id", (req, res)=> {
  Product.findByIdAndRemove(req.params.product_id)
  .then((data)=> {
    res.json(data);
  });
});
  
app.get("/products", (req, res) => {
  Product.find().then((data)=>{
    console.log('products data' + data);
    res.json(data);
  });
});


app.post("/products", (req, res)=> {
  Product.create(req.body).then((data)=>{
    console.log('products data' + data);
    res.json(data);
  })
  .catch((err) => {
    res.json(error);
  });
});

app.put("/checked_orders", (req, res)=> {
  Order.updateMany({
    _id: {$in:req.body.orderIds},
    customerName: req.body.customerName,
    isChecked: false
  }, {isChecked:true}).then((data)=>{
    res.json(data)
  });
});

//전체오더 피니쉬
app.put("/finish_order", (req, res)=> {
  console.log(req);
  Order.updateMany({
    customerName: req.body.customerName,
    isChecked: false
  }, {isChecked: true}).then((data)=>{
    res.json(data);
  });
});


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
