var mongoose=require("mongoose");
var Schema=mongoose.Schema;


var QuestionSchema = new Schema({
    // question:
    question:{type:String,required:true,unique:true},
    firstanswer:{type:String,required:true},
    secondanswer:{type:String,required:true},
    thirdanswer:{type:String,required:true},
    correctanswer:{type:String,required:true}
});


//exports in the server file
module.exports=mongoose.model("Question", QuestionSchema);
