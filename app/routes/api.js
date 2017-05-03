
var User = require("../models/user");
var Question = require("../models/question");
var jwt = require("jsonwebtoken");
var secret = "rokibalboa";


//export the route 
module.exports = function (router) {
    //return route
    //This is the use registration constructor
    //rqgister web servise
    router.post("/users", function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        //find if there is username password and email entred or they are empty
        if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "") {
            res.json({ success: false, message: "Enter username,email and password" });
        } else {
            var pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$";

            function isEmailAddress(str) {

                str = "azamsharp@gmail.com";

                return str.match(pattern);

            }
            user.save(function (err) {
                if (err) {
                    res.json({ success: false, message: "Username alrady exist" });

                }
                else if (req.body.username.length <= 5) {
                    res.json({ success: false, message: "Your Username is too short!" });
                }
                else if (req.body.password.length <= 5) {
                    res.json({ success: false, message: "Your Password is too short!" });

                } else if (isEmailAddress(req.body.email)) {
                    res.json({ success: false, message: "Your email is too short!" });
                }
                else {
                    res.json({ success: true, message: "Your Account is Created!" });
                }
            });
        }
    });

    //User Login
    router.post("/authenticate", function (req, res) {
        //this will search for user with username:req.body.username  (this will take the username is provided in request
        // and search in DB for this use
        User.findOne({ username: req.body.username }).select("email username password").exec(function (err, user) {
            if (err) {
                throw err;
            }
            var validPassword = false;
            if (!user) {
                res.json({ success: false, message: "Could not authenticate!" });
            } else if (user) {
                if (req.body.password) {
                    validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: "No password provided" });
                }
                if (validPassword) {
                    var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: "5h" });
                    res.json({ success: true, message: "User authenticated!", token: token });
                } else {
                    res.json({ success: false, message: "Could not authenticate password" })
                }
            }
        });
    });

    //TODO add validation
    router.post("/question", function (req, res) {


        //find if there is username password and email entred or they are empty
        if (req.body.question == null || req.body.question == ""
            || req.body.firstanswer == null || req.body.firstanswer == ""
            || req.body.secondanswer == null || req.body.secondanswer == ""
            || req.body.thirdanswer == null || req.body.thirdanswer == ""
            || req.body.correctanswer == null || req.body.correctanswer == "") {
            res.json({ success: false, message: "Fields must not be empty" });
        } else {
            var question = new Question();
            question.question = req.body.question;
            question.firstanswer = req.body.firstanswer;
            question.secondanswer = req.body.secondanswer;
            question.thirdanswer = req.body.thirdanswer;
            question.correctanswer = req.body.correctanswer;
            question.save(function (err) {
                if (err) {
                    res.json({ success: false, message: "Question alrady exist" });
                } else {
                    res.json({ success: true, message: "Question has been added" });
                }
            });
        }

    });

    //TODO add validation
    router.get("/questions", function (req, res) {
        Question.find({}, function (err, users) {
            if (err) {
                res.json({ success: false, message: "Error" });
            }

            // res.json({success:false,data:JSON.stringify(users)})
            res.send(users)
        });
    });

    //uncryopt the token
    router.use(function (req, res, next) {
        // we can get the token from:  request   or URL        or        headers
        var token = req.body.token || req.body.query || req.headers["x-access-token"];
        //if there is token .. the  secret here is the  var secret ="rokibalboa" that i validate later in api.js (this) file
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                //it will detect that user have a token but if the token date expire it will go in err here
                if (err) {
                    res.json({ success: false, message: "Invalid Token" });
                }
                //if token is VALID  
                //decoded mean take the token comabine it with the secret ( that i write) verify it  adn after that send it back decoded
                else {
                    req.decoded = decoded;

                    //this will let the aplication continue 
                    next();
                }
            });
        } else {
            res.json({ success: false, message: "No token provided" })
        }
    });



    //get the current userr
    router.post("/me", function (req, res) {
        res.send(req.decoded);
    })
    return router;
}

// initDefaultQuestions();

function initDefaultQuestions() {
    var q1 = new Question();
    q1.question = 'Inside which HTML element do we put the JavaScript?';
    q1.firstanswer = '<script>';
    q1.secondanswer = '<javascript>';
    q1.thirdanswer = '<js>';
    q1.correctanswer = '<script>';
    q1.save();

    var q2 = new Question();
    q2.question = 'What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>';
    q2.firstanswer = 'document.getElement("p").innerHTML = "Hello World!";';
    q2.secondanswer = 'document.getElementById("demo").innerHTML = "Hello World!";';
    q2.thirdanswer = '#demo.innerHTML = "Hello World!";';
    q2.correctanswer = 'document.getElementById("demo").innerHTML = "Hello World!";';
    q2.save();

    var q3 = new Question();
    q3.question = 'Where is the correct place to insert a JavaScript?';
    q3.firstanswer = 'The <body> section';
    q3.secondanswer = 'The <head> section';
    q3.thirdanswer = 'Both the <head> section and the <body> section are correct';
    q3.correctanswer = 'Both the <head> section and the <body> section are correct';
    q3.save();

    var q4 = new Question();
    q4.question = 'What is the correct syntax for referring to an external script called "xxx.js"?';
    q4.firstanswer = '<script src="xxx.js">';
    q4.secondanswer = '<script href="xxx.js">';
    q4.thirdanswer = '<script name="xxx.js">';
    q4.correctanswer = '<script name="xxx.js">';
    q4.save();

    var q5 = new Question();
    q5.question = 'The external JavaScript file must contain the <script> tag.';
    q5.firstanswer = 'True';
    q5.secondanswer = 'False';
    q5.thirdanswer = 'Both, Ha-ha! :)';
    q5.correctanswer = 'False';
    q5.save();

    var q6 = new Question();
    q6.question = 'How do you write "Hello World" in an alert box?';
    q6.firstanswer = 'msgBox("Hello World");';
    q6.secondanswer = 'msg("Hello World");';
    q6.thirdanswer = 'alert("Hello World");';
    q6.correctanswer = 'alert("Hello World");';
    q6.save();
    var q7 = new Question();
    q7.question = 'How do you create a function in JavaScript?';
    q7.firstanswer = 'function = myFunction()';
    q7.secondanswer = 'function myFunction()';
    q7.thirdanswer = 'function:myFunction()';
    q7.correctanswer = 'function = myFunction()';
    q7.save();

    var q8 = new Question();
    q8.question = 'How do you call a function named "myFunction"?';
    q8.firstanswer = 'call myFunction()';
    q8.secondanswer = 'myFunction()';
    q8.thirdanswer = 'call function myFunction()';
    q8.correctanswer = 'myFunction()';
    q8.save();

    var q9 = new Question();
    q9.question = 'How to write an IF statement in JavaScript?';
    q9.firstanswer = 'if i = 5 then';
    q9.secondanswer = 'if (i == 5)';
    q9.thirdanswer = 'if i == 5 then';
    q9.correctanswer = 'if (i == 5)';
    q9.save();
    var q10 = new Question();
    q10.question = 'How to write an IF statement for executing some code if "i" is NOT equal to 5?';
    q10.firstanswer = ' if (i != 5)';
    q10.secondanswer = ' if i <> 5';
    q10.thirdanswer = ' if (i <> 5)';
    q10.correctanswer = ' if (i != 5)';
    q10.save();
}