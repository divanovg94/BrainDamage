angular.module("mainController",["authServices"])

.controller("mainCtrl",function(Auth,$timeout,$location,$rootScope,$window){
    var app=this;
    //app.load :  hide the html until loadme become true ..while loadme become true we will already have all the data from the user
    //in index.html at body :ng-show="main.loadme" ng-cloak
    app.loadme=false;
    //ahytime a new route is change is going to invoke everything inside
    $rootScope.$on("$routeChangeStart",function(){
 
    //if user is logged in
    if(Auth.isLoggedIn()){
        app.isLoggedIn=true;
        Auth.getUser().then(function(data){
            console.log(data);
            console.log(data.data);

            app.username=data.data.username;
            app.useremail=data.data.email;
            app.loadme=true;
        })
    } else{
        app.username="";
        app.isLoggedIn=false;
        app.loadme=true;
    }
//remove the _=_ in the url
if($location.hash()=="_=_") $location.hash(null);
  });
  this.facebook=function(){
    //   //$window.location.host give me localhost:8000  
    // console.log($window.location.host);
    // // $window.location.protocol give mehttp:
    // console.log($window.location.protocol);
  
    $window.location=$window.location.protocol+"//"+$window.location.host+"/auth/facebook";
  
    console.log("++++" + $window.location);
  };
//if user is logged in

    this.doLogin=function(loginData){
     //app.errorMsg=false becouse when box appear will ebcome true but  after this will set back to false when reg and the box will disapper
  
     app.loading=true;
       app.errorMsg=false;
     //pass front-end to back-end 
     //this.(function..) after this request is made pass the data 
          Auth.login(app.loginData).then(function(data){  
        if(data.data.success) {
            app.loading=false;
            //sucess message
            app.successMsg=data.data.message;
            //Location.path is angular function recirect to the path in ""
            $timeout(function() {
                $location.path("/about");
                
            },2000);
        } else {
            app.loading=false;
            app.errorMsg=data.data.message;    
        }
    });

};

this.easy=function() {
    setTimeout(function() {
        //send broadcast on event game:easy
        $rootScope.$broadcast('game:easy', '');
    }, 800);
}
this.normal=function() {
    setTimeout(function() {
        //send broadcast on event game:normal
        $rootScope.$broadcast('game:normal', '');
    }, 800);
}
this.hard=function() {
    setTimeout(function() {
        //send broadcast on event game:hard
        $rootScope.$broadcast('game:hard', '');
    }, 800);
}

this.logout=function(){
    Auth.logout();
    //recirect the user when logout
    $location.path("/logout");
    $timeout(function(){
        $location.path("/");
    },2000)
};
});