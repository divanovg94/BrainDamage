var express=require("express");
var app=express();
var port=process.env.PORT||8000;
var morgan=require("morgan");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var router=express.Router();

mongoose.Promise = Promise;

//call the route fail
var appRoutes=require("./app/routes/api")(router);

var path=require("path");
var passport=require("passport");
//app from express  up and passport 
var social=require("./app/passport/passport")(app,passport);

//application runnign before the code
app.use(morgan("dev"));
//parsing the data need to be before routes ebcouse need to parse 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//front end has access in this folder (public)
app.use(express.static(__dirname+"/public"));
//useing the routes
app.use("/api",appRoutes);


mongoose.connect("mongodb://localhost:27017/usersdb",function(err){
    if(err){
        console.log("Not connected to the database. :"+err);
    } else{
        console.log("Connected to MONGODB!");
    }
});
//include index.html in public/app/views the * is not matter what client write move them to :
app.get("*",function(req,res){
    //take the path and send the fail not matter what user write get file in this directory and send to user
    res.sendFile(path.join(__dirname +"/public/app/views/index.html"))
});

//USE server 8080 but if u run other like HEROKU then process.env.PORT
app.listen(port, function(){
    console.log("Server START on port:"+port);
});
