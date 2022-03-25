# First GraphQL
A simple Node.js GraphQL API

From tutorial: https://graphql.org/graphql-js/

# Running the API
## Start API:
```bash
yarn install
yarn start
```
## Or hot-reload:
```bash
yarn install
yarn dev
```

# Using the API
To interact with the API you can go to the GraphiQL interface: http://localhost:4000/graphql

## Queries:
### Roll a single, six-sided die
```graphql
{
  rollDice(numDice: 1, numSides: 6)
}
```
### Roll two d20's
```graphql
{
  rollDice(numDice: 2, numSides: 20)
}
```
### Role 3 dice
defaults to six sides (numDice is required, numSides is optional)
```graphql
{
  rollDice(numDice: 1)
}
```
### Get a 'random' quote
(There are only two quotes)
```graphql
{
  quoteOfTheDay
}
```