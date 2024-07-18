const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authenticateToken = require('./middleware/authMiddleware.js');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const rideRoutes = require('./routes/rideRoutes');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();
const cookieParser=require('cookie-parser')
const sessionStore = new SequelizeStore({
  db: sequelize,
});


const app = express();
app.use(session({
  secret: 'your-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000, 
    secure: false, 
    httpOnly: true,
  },
}));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/rides', rideRoutes);

(async ()=>{
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("hi")
})()
// sequelize.sync({ force: false })  
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch(err => {
//     console.error('Unable to create tables:', err);
//   });

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
