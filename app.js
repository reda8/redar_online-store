const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");


const app = express ();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 


const products = [
    {
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
      },
      {
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
      },
      {
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
      },
      {
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
      },
      {
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
      },
      {
        "title": "Solid Gold Petite Micropave ",
        "price": 168,
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
      },
      {
        "title": "White Gold Plated Princess",
        "price": 9.99,
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
      },
      {
        "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
        "price": 10.99,
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
      }
]
app.get("/", function(req, res){
    res.render("signup");

});
app.post("/", function (req,res){

    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;

    let data = {
        members: [
            {
            email_address: email,
            status: "subscribed", // look at mailchimp APIs for that.
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }

        ]
    };
    
//Firstaname cap
let firstAlphabet = firstName.slice(0,1);
let capFirst = firstAlphabet.toUpperCase();
let otherAlphbets = firstName.slice(1,firstName.length);
let otherChar = otherAlphbets.toLowerCase();
let truefirstName = capFirst + otherChar;

    let jsonData = JSON.stringify(data); // convert js object to json
    
    let options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/efd9f12eaa",
        method: "POST",
        headers: {
            "Authorization": "Reda df05af38a64077e98dca00d947336e30-us10", // Authorization for any APIs
        },
        body: jsonData
    }

    request(options, function(error, response, body){

        if(error){
            res.render("home");
        }else{
        if(response.statusCode === 200){
            res.render("success", {fname: truefirstName});
        }
        else{
            res.redirect("home");
        }
    }
    });
});

app.post("/failure", function (req, res){
    res.redirect("/");
});

app.get("/home", function(req,res){
    res.render("home", {products: products});
});

app.get("/store", function(req,res){
  res.render("store");
});

app.post("/store", function(req,res){

  let store = {
    title: req.body.title,
    price: req.body.price,
    store: req.body.store,
    image: req.body.image,
    // category: req.body.category
  }

  products.push(store);
  // console.log(store);
  res.redirect("home")
});

app.get("/category/men", function(req,res){

//   let categoryName = req.params.name;
// console.log(categoryName);  
  res.render("category-men", {products: products});

});
app.get("/category/jewelery", function(req,res){
  
  // let categoryName = req.params.name;
  // console.log(categoryName); 
  res.render("category-jewelery", {products: products});
});



app.listen(3000, function (){
    console.log("Serves is Running on port 3000...");
});


