const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLList, 
        GraphQLNonNull } = graphql;
// Different properties grabbed from the GraphQL Package

const Book = require('../models/book');
const Author = require('../models/author');

/** var books = [
    { name: 'A Game of Thrones', genre: 'Epic Fantasy', id: '1', authorId: '1' },
    { name: 'A Clash of Kings', genre: 'Epic Fantasy', id: '2', authorId: '1' },
    { name: 'A Storm of Swords', genre: 'Epic Fantasy', id: '3', authorId: '1' },
    { name: 'A Feast for Crows', genre: 'Epic Fantasy', id: '4', authorId: '1' },
    { name: 'A Dance with Dragons', genre: 'Epic Fantasy', id: '5', authorId: '1' },
    { name: 'The Winds of Winter', genre: 'Epic Fantasy', id: '6', authorId: '1' },
    { name: 'A Dream of Spring', genre: 'Epic Fantasy', id: '7', authorId: '1' },
    { name: 'The Hunger Games', genre: 'Dystopian, Sci-Fi', id: '8', authorId: '2'},
    { name: 'Catching Fire', genre: 'Dystopian, Sci-Fi', id: '8', authorId: '2'},
    { name: 'Mockingjay', genre: 'Dystopian, Sci-Fi', id: '8', authorId: '2'}
];

var authors = [
    { name: 'George R.R. Martin', age: '71', id: '1'},
    { name: 'Suzanne Collins', age: '57', id: '2'}
]
// Dummy book data instead of database **/

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                //return _.find(authors, { id: parent.authorId });
                return Author.findById(parent.authorId);
            }
            // Telling GraphQL which author corresponds with the requested book
            // Fields is wrapped in a function as for example BookType and AuthorType are called before being defined -> No need to order code accordingly
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType), 
            resolve(parent, args){
                //return _.filter(books, { authorId: parent.id })
                return Book.find({ authorId: parent.id });
            }
        }
        // Finding which books correspond to which author
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
                //return _.find(books, { id: args.id });
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books
                return Book.find({});
            }
        },
        // Ability to return all the books
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors
                return Author.find({});
            }
        }
        // Ability to return all the authors
    }
});
// Defining the requested data in the query

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
            return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});