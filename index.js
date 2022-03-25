// Setup following: https://graphql.org/graphql-js/running-an-express-graphql-server/

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

/*
Query with:
// role Dice is name of query, numDice is name of variable, 4 is the value
{
  rollDice(numDice: 4)
}
OR
{
  rollDice(numDice: 1, numSides: 20)
}
Returns:
// always returns data, then name of query, and data
{
  "data": {
    "rollDice": [
      1,
      1,
      3,
      2
    ]
  }
}
OR
{
  "data": {
    "rollDice": [
      15
    ]
  }
}
 */

// Construct a schema, using GraphQL schema language
// rollDice is name of query, numDice is name of variable,
// int is type of variable, bang means variable is non-nullable
// without bang, variable can be null or not provided
// int is the return type, square brackets means it is an array of ints
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
    quoteOfTheDay: String
  }
`);

// The root provides a resolver function for each API endpoint (mapped to schema)
var root = {
  // rollDice is name of query, mapped to schema
  // numDice is destructured from args
  // numSides is destructed from args, defaults to 6 since it is nullable
  // results gets put into data format
  rollDice: ({numDice, numSides = 6}) => {
    const results = [];
    for(let i = 0; i < numDice; i += 1){
      results.push(1 + Math.floor(Math.random() * numSides))
    }
    return results
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');