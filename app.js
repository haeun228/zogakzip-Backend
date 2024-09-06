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

// 기본 CORS 설정
app.use(cors());

// 특정 도메인만 허용하려면 이렇게 설정할 수 있습니다.
app.use(cors({
    origin: 'https://project-zogakzip-fe.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

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
