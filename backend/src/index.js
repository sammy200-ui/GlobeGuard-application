const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authController = require('./controllers/authController');
const reportController = require('./controllers/reportController');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
// Auth
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Reports
app.get('/api/reports', reportController.getAllReports);
app.post('/api/reports', reportController.createReport);

app.get('/', (req, res) => {
    res.send('GlobeGuard API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
