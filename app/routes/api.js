
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


    //find if there is username password and email entred or they are empty
        if(req.body.question==null || req.body.question==""
            || req.body.firstanswer==null || req.body.firstanswer==""
            || req.body.secondanswer==null || req.body.secondanswer==""
            || req.body.thirdanswer==null || req.body.thirdanswer==""
            || req.body.correctanswer==null || req.body.correctanswer==""){
            res.json({success:false,message:"Fields must not be empty"});
        } else {
            var question = new Question();
            question.question      = req.body.question;
            question.firstanswer   = req.body.firstanswer;
            question.secondanswer  = req.body.secondanswer;
            question.thirdanswer   = req.body.thirdanswer;
            question.correctanswer   = req.body.correctanswer;
            question.save(function(err){
                if(err) {
                    res.json({success:false,message:"Question alrady exist"});
                } else {
                    res.json({success:true,message:"Question has been added"});
                }
            });
        }

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

// initDefaultQuestions();

function initDefaultQuestions(){
    var q1 = new Question();
    q1.question      = 'Inside which HTML element do we put the JavaScript?';
    q1.firstanswer   = '<script>';
    q1.secondanswer  = '<javascript>';
    q1.thirdanswer   = '<js>';
    q1.correctanswer = '<script>';
    q1.save();

    var q2 = new Question();
    q2.question      = 'What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>';
    q2.firstanswer   = 'document.getElement("p").innerHTML = "Hello World!";';
    q2.secondanswer  = 'document.getElementById("demo").innerHTML = "Hello World!";';
    q2.thirdanswer   = '#demo.innerHTML = "Hello World!";';
    q2.correctanswer = 'document.getElementById("demo").innerHTML = "Hello World!";';
    q2.save();

    // var q3 = new Question(
    //     'Where is the correct place to insert a JavaScript?',
    //     'The <body> section',
    //     'The <head> section',
    //     'Both the <head> section and the <body> section are correct',
    //     'Both the <head> section and the <body> section are correct'
    // );
    // var q4 = new Question(
    //     'What is the correct syntax for referring to an external script called "xxx.js"?',
    //     '<script src="xxx.js">',
    //     '<script href="xxx.js">',
    //     '<script name="xxx.js">',
    //     '<script src="xxx.js">'
    // );
    // var q5 = new Question(
    //     'The external JavaScript file must contain the <script> tag.',
    //     'True',
    //     'False',
    //     'Both, Ha-ha! :)',
    //     'False'
    // );

    // var q6 = new Question(
    //     'How do you write "Hello World" in an alert box?',
    //     'msgBox("Hello World");',
    //     'msg("Hello World");',
    //     'alert("Hello World");',
    //     'alert("Hello World");'
    // );
    // var q7 = new Question(
    //     'How do you create a function in JavaScript?',
    //     'function = myFunction()',
    //     'function myFunction()',
    //     'function:myFunction()',
    //     'function = myFunction()'
    // );

    // var q8 = new Question(
    //     'How do you call a function named "myFunction"?',
    //     'call myFunction()',
    //     'myFunction()',
    //     'call function myFunction()',
    //     'myFunction()'
    // );

    // var q9 = new Question(
    //     'How to write an IF statement in JavaScript?',
    //     'if i = 5 then',
    //     'if (i == 5)',
    //     'if i == 5 then',
    //     'if (i == 5)'
    // );
    // var q10 = new Question(
    //     'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    //     ' if (i != 5)',
    //     ' if i <> 5',
    //     ' if (i <> 5)',
    //     ' if (i != 5)'
    // );
}