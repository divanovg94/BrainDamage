angular.module('addQuestionModule', ["questionService"])
.controller('questionController', function ($http,$location,$timeout,CreateQuestion) {
    var app=this;
    this.addQuestion=function(questionModel){
        //app.errorMsg=false becouse when box appear will ebcome true but  after this will set back to false when reg and the box will disapper
        app.loading=true;
        app.errorMsg=false;

        console.log(questionModel);

        //pass front-end to back-end 
        //this.(function..) after this request is made pass the data 
        CreateQuestion.create(app.questionModel).then(function(data){  
            if(data.data.success) {
                app.loading=false;
                //sucess message
                app.successMsg=data.data.message;
            } else {
                app.loading=false;
                app.errorMsg=data.data.message;
            }
        }); 
    }
});