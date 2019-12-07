const express = require('express')
const route = express.Router()
const Register = require('../model/userModel')
const auth = require('../middleware/auth')

route.get('/users' , async (req , res) => {
     const Data = await Register.find({})
     res.send(Data)
})



route.post('/signup' ,  async (req , res) => {
  try {
    const profile = await new Register(req.body).save()
     const token = await profile.generateAuthToken()
     
     res.status(201).send({profile , token})
     
  } catch(error){
     console.error(error) 
  }
})

route.post('/login'  , async (req , res) => {
   try{
     const profile = await Register.findByCredentials(req.body.email , req.body.password)
     const token = await profile.generateAuthToken()
     res.status(200).send({ profile , token})
    }catch(error){
      console.log(error)   
   }

})


route.post('/logout' , auth , async (req , res) => {

    try {
     
     const { profile , token } = req
 
     profile.tokens = profile.tokens.filter((t ) => t.token !== token )
     await profile.save()
     res.send()
 
    }catch (e){
       res.status(400).send()
    } 
 
  })
  

route.delete('/delete-user/:id' , async (req , res) => {
     const _id = req.params.id 
     const user = await Register.findByIdAndDelete(_id)
     res.send(user) 
})  


route.get("/profiles/myprofile", auth , async (req, res) => {
    // const id = req.params.id;
  
    try {

      // const profile = await Profiles.findById(id);
    
      
      const profile = req.profile



      // if (profile._id.toString() !== id) {
      //   res.status(404).send();
      // }
  
      res.send(profile);
    } catch (e) {
      res.status(500);
    }
  });


route.get('/user/:id' , async (req , res) => {
     
    const _id = req.params.id
    
    const user = await Register.findById(_id)
    
    res.send(user)
     

})

route.post('/logout' , auth , async (req , res) => {

  try {
   
   const { profile , token } = req

   profile.tokens = profile.tokens.filter((t ) => t.token !== token )
   await profile.save()
   res.send()

  }catch (e){
     res.status(400).send()
  } 

})




module.exports = route