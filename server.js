require("./api/database/mongoose");

const express = require("express");
const app = express();
const profileRoutes = require('./api/Routes/userRoute')
const patientRoutes = require('./api/Routes/patientRoute')
const cors = require('cors')

// app.use((req , res , next) => {
//     res.status(503).send("site is currently down. check back soon ")
// })


app.use(cors());
app.use(express.json());
app.use('/user' , profileRoutes)
app.use(patientRoutes)
// app.use(wishListRoutes)



const port = process.env.PORT 

app.listen(port, () => console.log("server is up and runnig on port " + port));
