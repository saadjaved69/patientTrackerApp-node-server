const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const signupSchema = new mongoose.Schema({
    
    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    tokens : [{
        token : {
            type : String ,
            required : true
        }
    }]
} )


signupSchema.pre('remove' , async function(next) {
  const profile = this;

  await PostJob.deleteMany({
     user : profile._id
  })

  next();

});


signupSchema.methods.generateAuthToken = async function (){

    const profile = this
  
    const token = jwt.sign({ _id: profile._id.toString() } , process.env.JWT_SECRET )
  
    profile.tokens = profile.tokens.concat({token})
  
    await profile.save()
    return token
  
  
  }
  

signupSchema.methods.toJSON =  function (){
    
    const profile = this 
    const publicProfileData = profile.toObject()
  
    delete publicProfileData.password
    delete publicProfileData.tokens
    
  
    console.log(publicProfileData)
  
    return publicProfileData
  
  }


  signupSchema.statics.findByCredentials = async (email , password) => {
    const profile = await Register.findOne({email})
  
    if(!profile){
      throw new Error("unable to login")
    }
  
    const isMatch = await bcrypt.compare(password , profile.password )
  
    if(!isMatch){
      throw new Error("unable to login")
    }


    return profile
  
  }


  signupSchema.pre('save' , async function(next) {
    const profile = this;
  
    // console.log(profile.password, "pre password");
  
    if(profile.isModified('password')){
      
      profile.password = await bcrypt.hash(profile.password, 8)
     
    }
  
  
    // console.log(profile.password, "hashed password")
  
    next();
  
  });


  




const Register = mongoose.model('Register' , signupSchema)

module.exports = Register