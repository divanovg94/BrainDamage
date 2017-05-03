angular.module("appRoutes",["ngRoute"])
.config(function($routeProvider,$locationProvider){
    //when the user type "/"
    $routeProvider
    
    .when("/",{
        //our default route
        templateUrl:"app/views/pages/home.html"
    })

    .when("/about",{
        templateUrl:"app/views/pages/about.html"
    })//if user type other url redirect him to hoem page
  

    .when("/register",{
        templateUrl:"app/views/pages/users/register.html",
        controller:"regCtrl",
        controllerAs:"register",
        authenticated:false
    })

    .when("/game",{
        templateUrl:"app/views/pages/game.html",
        controller:"gameController",
        controllerAs:"game",
        authenticated:true
    })

    .when("/login",{
        templateUrl:"app/views/pages/users/login.html",
        authenticated:false
    })

    .when("/logout",{
        templateUrl:"app/views/pages/users/logout.html"
    })
    .when("/profile",{
        templateUrl:"app/views/pages/users/profile.html",
        authenticated:true
    })
    .when("/facebook/:token",{
        templateUrl:"app/views/pages/users/social/social.html",
        controller:"facebookCtrl",
        controllerAs:"facebook",
        authenticated:false
    })
    .when("/facebookerror",{
        templateUrl:"app/views/pages/users/login.html",
        controller:"facebookCtrl",
        controllerAs:"facebook",
        authenticated:false

    })

    .when("/addquestions",{
        templateUrl:"app/views/pages/addquestion.html",
        controller:"questionController",
        controllerAs:"addquestion",
        authenticated:true
    })
    
    .otherwise({redirectTo:"/"});

    $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
    });
});
