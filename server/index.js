const express = require('express')
const next = require('next');
const connectDB = require('./config/db');
const cors = require("cors");
const session = require('express-session')
const AdminRoute = require("./routes/admin")

const ManagerRoute = require("./routes/manager")

connectDB();
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
 
  const server = express()
  server.use(express.json());
  server.use(cors());
  server.set('trust proxy', 1) // trust first proxy
  server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  }
}))
  server.use(ManagerRoute)
  server.use(AdminRoute)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})