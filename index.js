const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const objectId = require("mongodb").ObjectID;
const { ObjectId } = require("bson");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()



const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.apoqz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
  const orderCollection = client.db("swiftDelivery").collection("orders");
  const reviewCollection = client.db("swiftDelivery").collection("reviews");
  const serviceCollection = client.db("swiftDelivery").collection("services");
  const adminCollection = client.db("swiftDelivery").collection("admins");

//   ? from ship
  app.post('/addOrder',(req,res)=>{
      const order = req.body;
      orderCollection.insertOne(order)
    .then(result => {
        res.send(result.insertedCount > 0)
       
    })
  })

  //? To Orderlist 
  app.get('/getOrders',(req,res)=>{  
    orderCollection.find({})
    .toArray((err,result)=>{
      res.send(result)
    })
  })

  //? To Tracking 
  app.get('/getPersonalOrder',(req,res)=>{
    orderCollection.find({email:req.query.email})
    .toArray((err,orders)=>{
      res.send(orders)
    })
  })
  //? To OrderStatus 
  app.get('/getOrderStatus',(req,res)=>{
    orderCollection.find({email:req.query.email})
    .toArray((err,orders)=>{
      res.send(orders)
    })
  })

//  ? from Reviews
  app.post('/addReview',(req,res)=>{
      const review = req.body;
      reviewCollection.insertOne(review)
    .then(result => {
        res.send(result.insertedCount > 0)
       
    })
  })

//   ? to Testimonial
  app.get('/getReview',(req,res)=>{
      reviewCollection.find({})
     .toArray((err,reviews)=>{
         res.send(reviews)
     })
  })

  //? from AddService
  app.post('/addService',(req,res)=>{
    const newService = req.body;
    serviceCollection.insertOne(newService)
    .then(result => {
    res.send(result.insertedCount > 0)
    })
  })

  //   ? to ServiceSection
  app.get('/getService',(req,res)=>{
      serviceCollection.find({})
     .toArray((err,services)=>{
         res.send(services)
     })
  })

  //   ? to ManageService
  app.get('/viewService',(req,res)=>{
      serviceCollection.find({})
     .toArray((err,services)=>{
         res.send(services)
     })
  })

// ? Delete from RemoveService
 app.delete('/deleteService/:id',(req,res)=>{
   serviceCollection
   .deleteOne({_id: ObjectId(req.params.id)})
   .then((result)=>{
     res.send(result.deletedCount > 0)
   })
 })

  //   ? from MakeAdmin
  app.post('/addAdmin',(req,res)=>{
      const admin = req.body;
      adminCollection.insertOne(admin)
    .then(result => {
        res.send(result.insertedCount > 0)
       
    })
  })

 //? To Dashboard 
  app.get('/getAdmin',(req,res)=>{
    adminCollection.find({email:req.query.email})
    .toArray((err,result)=>{
      res.send(result.length > 0);
    })
  })



  app.get('/', (req, res) => {
  res.send('Hello World!56')
})



});









app.listen(process.env.PORT || port)