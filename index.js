const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const api = require('./routes/api');
const { sequelize } = require('./database/models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch((err) => console.log(err));

app.use('/uploads', express.static('./uploads'));

app.use('/api', api);

app.listen(port, () => {
  const dir = './uploads';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log(`Listening on port ${port}`);
});
