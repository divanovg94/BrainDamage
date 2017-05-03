var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var bcrypt=require("bcrypt-nodejs");

var UserSchema=new Schema({
    //validations to be String,lowercase and unique username
    username:{type:String,lowercase:true,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,lowercase:true,unique:true}
});
//change and save crypted password.
UserSchema.pre("save",function(next){
    var user=this;
    console.log("dsada");
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password=hash;
        next();
    });
  
});
 //comapre the cryped password with the password that user entar and this function comapreSync take 
    // two parametres  bacon with is the cyrped password and  the password of user 
    //then uncyrpt the password and comapre them
UserSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password, this.password);
}
//exports in the server file
module.exports=mongoose.model("User",UserSchema);