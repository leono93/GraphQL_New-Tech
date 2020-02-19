const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
// Different properties grabbed from the GraphQL Package

var books = [
    { name: 'A Game of Thrones', genre: 'Epic fantasy', id: '1' },
    { name: 'A Clash of Kings', genre: 'Epic fantasy', id: '2' },
    { name: 'A Storm of Swords', genre: 'Epic fantasy', id: '3' },
    { name: 'A Feast for Crows', genre: 'Epic fantasy', id: '4' },
    { name: 'A Dance with Dragons', genre: 'Epic fantasy', id: '5' },
    { name: 'The Winds of Winter', genre: 'Epic fantasy', id: '6' },
    { name: 'A Dream of Spring', genre: 'Epic fantasy', id: '7' }
];
// Dummy book data instead of database

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                // Retrieving data from Database or other source
                return _.find(books, { id: args.id });
            }
        }
    }
});
// Defining the requested data in the query

module.exports = new GraphQLSchema({
    query: RootQuery
});