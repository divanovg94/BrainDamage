var mongoose=require("mongoose");
var Schema=mongoose.Schema;


var UserSchema=new Schema({
    //validations to be String,lowercase and unique username
    // question:
    username:{type:String,lowercase:true,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,lowercase:true,unique:true}
});

//exports in the server file
module.exports=mongoose.model("User",UserSchema);