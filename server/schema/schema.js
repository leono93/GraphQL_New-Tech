const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;
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

var authors = [
    { name: 'George R.R. Martin', age: '71', id: '1'}
]
// Dummy book data instead of database

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // Retrieving data from Database or other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, { id: args.id });
            }
        }
    }
});
// Defining the requested data in the query

module.exports = new GraphQLSchema({
    query: RootQuery
});