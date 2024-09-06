const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
require('./schedulers/scheduler');
const errorHandler = require('./middlewares/errorHandler');

const groupRoutes = require('./routes/groupRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

const cors = require('cors');

const allowedOrigins = [
  'https://zogakzip7.netlify.app',
  'http://localhost:3000' // 개발 서버
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/groups', groupRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/image', imageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
