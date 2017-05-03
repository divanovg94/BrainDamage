angular.module('addQuestionModule', ["questionService"])
.controller('questionController', function ($scope,$http,$location,$timeout,CreateQuestion) {
    var app=this;
    this.addQuestion=function(questionModel){
        //app.errorMsg=false becouse when box appear will ebcome true but  after this will set back to false when reg and the box will disapper
        app.loading=true;
        app.errorMsg=false;

        //pass front-end to back-end 
        //this.(function..) after this request is made pass the data 
        CreateQuestion.create(questionModel).then(function(data){  
            if(data.data.success) {
                app.loading=false;
                //sucess message
            app.successMsg="Your Question has been added";
        $timeout(function(){
                        $location.path("/");
                    },1500)
            } else {
                app.loading=false;
                app.errorMsg="Question already exist or filds are empty";
              
                $timeout(function(){
                        $location.path("/addquestions");
                    },1500)
            }
        });
    }
    
});