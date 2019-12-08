const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')
const Patient = require('../model/patient.model')

route.post('/patientData' , async (req , res) => {
     try{
       const patient = await new Patient(req.body).save()
       res.status(201).send(patient)
     }catch(error){
        res.status(500).json({error})
     }
})

route.get('/patientData' , async (req , res) => {
  try{
    const patient = await Patient.find({})
    res.status(200).send(patient)
  }catch(error){
     res.status(500).json({error})
  }
})

route.get('/patientDetail/:id' , async (req , res) => {
  try{
    const _id = req.params.id  
    const patient = await Patient.findOne({ _id })
    res.status(200).send(patient)
  }catch(error){
     res.status(500).json({error})
  }
})

route.delete('/patientData/:id' , async (req , res) => {
  try{
    const _id = req.params.id

    const patient = await Patient.findOneAndDelete({ _id })
      res.status(200).send(patient)
  }catch(error){
     res.status(500).json({error})
  }
})


module.exports = route