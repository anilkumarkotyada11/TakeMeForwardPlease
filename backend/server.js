const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const bannerRoutes = require('./routes/bannerRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/api/banner',bannerRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
