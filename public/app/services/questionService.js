//factory for all custom service like reg
angular.module("questionService",[])

.factory("CreateQuestion",function($http){
    questionFactory={};

    questionFactory.create=function(questionData){
        return $http.post("api/question",questionData);
    }
    return questionFactory;
})

.factory("LoadQuestions",function($http){
    questionFactory={};

    questionFactory.create=function(questionData){
        return $http.post("api/question",questionData);
    }
    return questionFactory;
});