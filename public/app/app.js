angular.module("userApp",["appRoutes","userControllers","userServices","mainController","authServices","gameModule","addQuestionModule","questionService"])
//config the application to intercept all http request with this factory  (this factory asain the token to the header)
.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
})
//,"addQuestionModule","questionService"

