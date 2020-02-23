import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQ = gql`
{
    books{
        name
        genre
        id
    }
}
`

class Books extends Component {
    showBooks(){
        var data = this.props.data;
        if(data.loading){
            return(<div>Loading ...</div>);
        }   else {
            return data.books.map(book =>{
                return(<li>Book name: { book.name } | genre: { book.genre } | <b>Book Identifier:</b> { book.id }</li>);
            });
        }
    }
    render() {
        return (
            <div className="booksComponent">
               { this.showBooks() }
            </div>
        );
    }
}

export default graphql(getBooksQ)(Books);