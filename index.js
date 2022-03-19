const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const api = require('./routes/api');
const { sequelize } = require('./database/models');
const cors = require('cors');

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch((err) => console.log(err));

app.use('/api', api);

app.listen(port, () => console.log(`Listening on port ${port}`));
