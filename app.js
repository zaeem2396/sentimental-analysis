require('dotenv').config()
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(express.json());

const userRoutes = require('./routes/UserRoutes')
const feedbackRoutes = require('./routes/FeedbackRoutes')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/sentimental-analysis/api/user', userRoutes)
app.use('/sentimental-analysis/api/feedback', feedbackRoutes)
app.get('/', (req, res) => { res.send('Hello World!!') });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));