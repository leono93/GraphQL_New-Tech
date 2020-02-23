import React from 'react';
import Books from './components/Books';
import Authors from './components/Authors';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="Main">
      <h1>GraphQL Library</h1>
      <div>
        <h3>List of Books:</h3> <Books/>
      </div>
      <div>
        <h3>List of Authors:</h3> <Authors/>
      </div>
    </div>
    </ApolloProvider>
  );
}

export default App;
