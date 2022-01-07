const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;
const mongoose = require("mongoose") ;

const app = express() ;
app.set("view engine" , "ejs") ;

app.use(bodyParser.urlencoded({extended : true})) ;

app.use(express.static("public")) ;





mongoose.connect("mongodb://localhost:27017/RestFul" ,{useNewUrlParser : true}) ;

const productSchema ={
  ProductName : String ,
 QtyPerUnit : String ,
 UnitPrice : String ,
 UnitInStock : String ,
 Discontinued : String ,
 CategoryId : String
} ;

const Product = mongoose.model("Product" , productSchema) ;

app.route("/products")

.get(function(req ,res){
  Product.find(function(err , foundProducts){
    if(!err) {
      res.send(foundProducts)
    } else {
      res.send(err)
    }
    console.log(foundProducts);

  }) ;
})

.post(function(req ,res) {

 // console.log(req.body.ProductName);
 // console.log(req.body.QtyPerUnit);
 // console.log(req.body.UnitPrice);
 // console.log(req.body.UnitInStock);
 // console.log(req.body.Discontinued);
 // console.log(req.body.CategoryId);

 const newProduct = new Product({
   ProductName : req.body.ProductName ,
   QtyPerUnit : req.body.QtyPerUnit ,
   UnitPrice : req.body.UnitPrice ,
   UnitInStock : req.body.UnitInStock ,
   Discontinued : req.body.Discontinued ,
   CategoryId : req.body.CategoryId
}) ;

newProduct.save(function(err){
  if (!err){
    res.send("Successfully added a new article") ;
  } else {
    res.send(err) ;
  }
}) ;

})


.delete(function(req , res){
  Product.deleteMany(function(err){
    if(err){
      res.send("Successfully delete all products")
    } else {
      res.send(err) ;
    }
  }) ;
}) ;

//////request targeting specific route////

app.route("/products/:ProductName")

.get(function(req, res){
  Product.findOne({ProductName :req.params.ProductName}, function(err , foundProduct){
    if(foundProduct){
      res.send(foundProduct);
    } else{
      res.send("No product matching") ;
    }
  }) ;
})

.put(function(req, res){
  Product.update(
    {ProductName : req.params.ProductName} ,
    {ProductName : req.body.ProductName , QtyPerUnit : req.body.QtyPerUnit} ,
    {overwrite : true} ,
    function(err){
      if(!err){
        res.send("successfully updated product")
      }
    }
  ) ;
})

.patch (function(req , res){
  Product.update(
    {ProductName:req.params.ProductName} ,
    {$set : req.body} ,
    function(err){
      if(!err){
        res.send("Successfully updated productName")
      } else {
        res.send(err) ;
      }
    }
  ) ;
})

. delete(function(req, res){
  Product.deleteOne(
    {ProductName : req.params.ProductName} ,
    function(err) {
      if(!err) {
        res.send("Successfully deleted product")
      }else {
        res.send(err)
      }
    }
  ) ;
}) ; 





app.listen(3000 , function(){
  console.log("Server Started on port 3000");
}) ;
