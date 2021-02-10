const express = require('express');
const mongoose = require('mongoose');


const bodyParser = require('body-parser');

const sauceRoutes = require('./routes/sauce');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb+srv://PiliPili:wF2UFS88v4@cluster0.cicb5.mongodb.net/Piquante?retryWrites=true&w=majority', //On se connecte à mangoDB via le plugin mangoose
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((request, response, next) => { //On contrôle les autorisations CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(bodyParser.json());

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;