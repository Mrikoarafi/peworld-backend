const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const employeRoutes = require('./src/routes/employe/employeRoutes')
const recruiterRoutes = require('./src/routes/recruiter/recruiterRoutes')
const {
  PORT
} = require("./src/helper/env");

const path = require('path')
const ejs = require('ejs')

app.use(cors());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use('/employe', employeRoutes)
app.use('/hire/recruiter', recruiterRoutes)
app.use(express.static("src/img"));


app.listen(PORT, () => {
  console.log(`run PORT ${PORT}`);
});