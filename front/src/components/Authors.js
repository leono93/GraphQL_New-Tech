import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQ = gql`
{
    authors{
        name
        age
    }
}
`

class Authors extends Component {
    showAuthors(){
        var data = this.props.data;
        if(data.loading){
            return(<div>Loading ...</div>);
        }   else {
            return data.authors.map(authors =>{
                return(<li>Author: { authors.name }, age: { authors.age }</li>);
            });
        }
    }
    render() {
        return (
            <div className="authorsComponent">
               { this.showAuthors() }
            </div>
        );
    }
}

export default graphql(getAuthorsQ)(Authors);