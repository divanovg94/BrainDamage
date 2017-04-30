
var User = require("../models/user");
var Question = require("../models/question");
var jwt = require("jsonwebtoken");
var secret = "rokibalboa";

//export the route 
module.exports=function(router){
//return route
//This is the use registration constructor
router.post("/users",function(req,res){
    var user=new User();
    user.username=req.body.username;
    user.password=req.body.password;
    user.email=req.body.email;
//find if there is username password and email entred or they are empty
    if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""){
        res.json({success:false,message:"Enter username,email and password"});
    } else{
    user.save(function(err){
        if(err){
            res.json({success:false,message:"Username alrady exist"});
        
        }else{
            res.json({success:true,message:"Your Account is Created!"});
        }
    });
    }
});

//User Login
router.post("/authenticate",function(req,res){
    console.log("auth")
    console.log(req.body.username)
    console.log(req.body.password)
    //this will search for user with username:req.body.username  (this will take the username is provided in request
    // and search in DB for this use
    User.findOne({username:req.body.username}).select("email username password").exec(function(err,user){
        if(err) {
            throw err;
        }
        
        if(!user){
                   res.json({success:false,message:"Could not authenticate!"});
        } else if(user){
            if(req.body.password) {
                 var validPassword= user.comparePassword(req.body.password);
            } else{ 
           res.json({success:false,message:"No password provided"});
            
         }
         if(!validPassword){
                   res.json({success:false,message:"Cold not authenticate password"})
        } else{  
            res.json({success:true,message:"User authenticated!",token:token});
        }
        }
    });
});

//TODO add validation
router.post("/question",function(req,res){
    var questions = new Question();
    questions.question      = req.body.question;
    questions.firstanswer   = req.body.firstanswer;
    questions.secondanswer  = req.body.secondanswer;
    questions.thirdanswer   = req.body.thirdanswer;
    questions.correctanswer   = req.body.correctanswer;
    questions.save();
    // res.json({success:true,message:"Question has been added"});

//find if there is username password and email entred or they are empty
    // if(req.body.question==null||req.body.question==""||req.body.firstanswer==null||req.body.firstanswer==""||req.body.secondanswer==null||req.body.secondanswer==""
    // ||req.body.thirdanswer==null||req.body.thirdanswer==""){
    //     res.json({success:false,message:"Enter username,email and password"});
    // } else{
    // questions.save(function(err){
    //     if(err){
    //         res.json({success:false,message:"Username alrady exist"});
        
    //     }else{
    //         res.json({success:true,message:"Your Account is Created!"});
    //     }
    // });
});

//TODO add validation
router.get("/questions",function(req,res){
    Question.find({}, function(err, users) {
        if(err){
            res.json({success:false,message:"Error"});
        } 

        // res.json({success:false,data:JSON.stringify(users)})
        res.send(users)
    });
});

//uncryopt the token
router.use(function(req,res,next){
    // we can get the token from:  request   or URL        or        headers
   var token= req.body.token ||req.body.query||req.headers["x-access-token"];
//if there is token .. the  secret here is the  var secret ="rokibalboa" that i validate later in api.js (this) file
   if(token){
      jwt.verify(token,secret,function(err,decoded){
          //it will detect that user have a token but if the token date expire it will go in err here
          if(err){
              res.json({success:false,message:"Invalid Token"});
          } 
          //if token is VALID  
          //decoded mean take the token comabine it with the secret ( that i write) verify it  adn after that send it back decoded
          else{
            req.decoded=decoded;

            //this will let the aplication continue 
            next();
            }
        });
   } else{
       res.json({success:false,message:"No token provided"})
   }
});



//get the current userr
router.post("/me",function(req,res){
    res.send(req.decoded);
})
return router;
}