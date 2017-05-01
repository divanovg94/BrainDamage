var FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../models/user");
var session = require("express-session");
var jwt = require("jsonwebtoken");
var secret = "rokibalboa";

module.exports = function (app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: true, cookie: { secure: false } }));

    passport.serializeUser(function (user, done) {
        token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: "5h" });
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: "216112175556738",
        clientSecret: "66c6b4f9ba597e6fb507590cea00809a",
        callbackURL: "http://localhost:8000/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"]
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile)
            User.findOne({ email: profile._json.email }).select("username password email").exec(function (err, user) {
                //there is user
                if (err) {
                    done(err);
                }
                //verify email
                if (user && user != null) {
                    done(null, user);
                } else {
                    var userNew = new User();
                    userNew.username = profile.displayName;
                    userNew.password = "a";
                    userNew.email = profile.emails[0].value;
                    userNew.save();
                    done(null, userNew);
                }
            });

        }
    ));
    app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/facebookerror" }), function (req, res) {
        res.redirect("/facebook/" + token);
    });
    app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));

    return passport;
}