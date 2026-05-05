const mongoose =require('mongoose');

const userschema = new mongoose.schema({
    username:{ type:String, trim :true ,required:true},
    password:{type:String , trim :true ,required:true},

    contactNumber:{type:String,required:true},
    organization:{type:String, trim:true, required:true},
    role:{type:String , trim :true, required:true},
    
});
const User = mongoose.model('User', userschema);

module.exports = User; 