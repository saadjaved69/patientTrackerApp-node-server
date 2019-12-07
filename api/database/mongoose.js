const mongoose = require('mongoose')

mongoose.connect(process.env.mongoURI , {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
})


const db = mongoose.connection
db.once('open' , () => console.log('Database Connected'))

module.exports = mongoose