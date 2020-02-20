const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const password = process.env.PASSWORD;

app.use(cors());
// Cors is used for cross server communication

mongoose.connect('mongodb+srv://leono93:'+password+'@cluster0-zhxma.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connection successful');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
// Binding Express and GraphQL

app.listen(4000, () => {
    console.log('Listening on 4000');
});