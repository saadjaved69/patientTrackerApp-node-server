const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    PatientName : {
        type : String,
        required : true
    },
    Diseas : {
        type : String,
        required : true
    },
    Medication : {
        type : String,
        required : true
    },
    cost : {
        type : String,
        required : true
    },
    DateOFArrival : {
        type : String,
        required : true
    },
})

const Patient = mongoose.model('Patient' , PatientSchema)

module.exports = Patient 
