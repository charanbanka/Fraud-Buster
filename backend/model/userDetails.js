import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    country:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    postoffice:{type:String,required:true},
    pincode:{type:Number,required:true},
    dob:{type:Date,required:true},
    adharno:{type:Number,required:true},
    profileimage:{type:String,required:true},
    address:{type:Array,required:true}

},{
    timestamps:true
})

export default mongoose.model('userDetails',userSchema)