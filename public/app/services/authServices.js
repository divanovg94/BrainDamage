angular.module("authServices",[])

.factory("Auth",function($http,AuthToken){
    var authFactory={};


    authFactory.login=function(loginData){
        return $http.post("api/authenticate",loginData).then(function(data){
            AuthToken.setToken(data.data.token);
            return data;
        });
    }
        //if we have the token return true

        authFactory.isLoggedIn=function(){
            if(AuthToken.getToken()){
                return true;
            } else {
                return false;
            }
        
    };
    //get the token from url
    
    authFactory.facebook=function(token){
   AuthToken.setToken(token);
    };

    authFactory.getUser=function(){
        //if we get token from localSTorage and its true
        if(AuthToken.getToken()){
            return $http.post("/api/me");
        } else{
            $q.reject({message:"user has no token"});
        }
    }
    //we wont have token becouse we dont have data.data.token so when go down
    // and check for token we wont have and go in else and remove it
     authFactory.logout=function(){
    AuthToken.setToken();
     };

    return authFactory;

})

.factory("AuthToken",function($window){
 var authTokenFactory={};
 authTokenFactory.setToken=function(token){
     //save token in your localstorage 
     if(token){
     $window.localStorage.setItem("token",token);
     } else {
         $window.localStorage.removeItem("token");
     }
 };

 authTokenFactory.getToken=function(){
     //this function will get the token from localstorage when page load
     return $window.localStorage.getItem("token");
 };
 return authTokenFactory;
})

.factory("AuthInterceptors",function(AuthToken){
    var authInterceptorsFactory={};
    //grab the token if exist
    authInterceptorsFactory.request=function(config){
    var token=AuthToken.getToken();
    //if token exist asain it to the header ..so we can grab it
    if(token) {
        config.headers["x-access-token"]=token;
    }
        return config;
    }
    return authInterceptorsFactory;
});