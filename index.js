const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const bodyParser = require('body-parser')
const cors = require('cors')
const employeRoutes = require('./src/routes/employe/employeRoutes')
const recruiterRoutes = require('./src/routes/recruiter/recruiterRoutes')
const db = require('./src/config/db_hireapp')

const {
  PORT
} = require("./src/helper/env");

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('get-recruiter', (recruiter) => {
    console.log(recruiter)
    db.query(`SELECT * FROM recruiter WHERE email_recruiter='${recruiter}'`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        const id = result[0].id_recruiter
        db.query(`SELECT * FROM company WHERE id_recruiter='${id}'`, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
          }
        })
      }
    })
  })

  socket.on('join-room', (payload) => {
    socket.join(payload)
  })

  socket.on('private-room', (payload) => {
    socket.join(payload)
  })

  socket.on('send-message', (payload) => {
    const room = payload.receiver

    db.query(`INSERT INTO message (sender, receiver, message) VALUES ('${payload.sender}','${payload.receiver}','${payload.message}')`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        io.to(room).emit('private-message', {
          sender: payload.sender,
          receiver: room,
          message: payload.message
        })
      }
    })
  })

  socket.on('get-history-message', (payload) => {
    db.query(`SELECT * FROM message WHERE (sender='${payload.sender}' AND receiver='${payload.receiver}') OR (sender='${payload.receiver}' AND receiver='${payload.sender}')`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        io.to(payload.sender).emit('send-history-message', result)
      }
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

const path = require('path')
const ejs = require('ejs')

app.use(express.static("src/img"));
app.use(express.static('public/images'))
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


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});