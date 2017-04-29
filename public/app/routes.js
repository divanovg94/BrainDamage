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
        controllerAs:"register"
    })

    .when("/test",{
        templateUrl:"app/views/pages/test.html",
        controller:"testControler",
        controllerAs:"test"
    })

    .when("/game",{
        templateUrl:"app/views/pages/game.html",
        controller:"gameController",
        controllerAs:"game"
    })

    .when("/login",{
        templateUrl:"app/views/pages/users/login.html"
    })

    .when("/logout",{
        templateUrl:"app/views/pages/users/logout.html"
    })
    .when("/profile",{
        templateUrl:"app/views/pages/users/profile.html"
    })
    .when("/facebook/:token",{
        templateUrl:"app/views/pages/users/social/social.html",
        controller:"facebookCtrl",
        controllerAs:"facebook"
    })
    .when("/facebookerror",{
        templateUrl:"app/views/pages/users/login.html",
        controller:"facebookCtrl",
        controllerAs:"facebook"

    })
    .otherwise({redirectTo:"/"});

    $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
    });
});
