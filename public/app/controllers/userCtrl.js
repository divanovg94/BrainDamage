angular.module("userControllers",["userServices"])
.controller("regCtrl",function($http,$location,$timeout,User){
    //this in if(data.data.success) wont work in if so need to write it here adn then use in if below app.successMsg=data.data.message
    var app=this;
    this.regUser=function(regData){
        //app.errorMsg=false becouse when box appear will ebcome true but  after this will set back to false when reg and the box will disapper
        app.loading=true;
        app.errorMsg=false;

        //pass front-end to back-end 
        //this.(function..) after this request is made pass the data 
            User.create(app.regData).then(function(data){  
            if(data.data.success){
                app.loading=false;
                //sucess message
                app.successMsg=data.data.message;
                //Location.path is angular function recirect to the path in ""
                $timeout(function(){
                    $location.path("/");
                },2000)
            }else{
                app.loading=false;
                app.errorMsg=data.data.message;
            }
        }); 
    };
})

.controller("facebookCtrl",function($routeParams,Auth,$location,$window){
    var app=this; 
    if($window.location.pathname=="/facebookerror"){
        app.errorMsg="Facebook e-mail not found .";
    } else{
        Auth.facebook($routeParams.token);
        $location.path("/"); 
    }
    
});
