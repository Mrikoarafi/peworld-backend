const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const employeRoutes = require('./src/routes/pekerja/pekerjaRoutes')
const recruiterRoutes = require('./src/routes/perekrut/perekrutRoutes')
const {
  PORT
} = require("./src/helper/env");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use('/employe', employeRoutes)
app.use('/hire/recruiter', recruiterRoutes)
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("src/img"));


app.listen(PORT, () => {
  console.log(`run PORT ${PORT}`);
});