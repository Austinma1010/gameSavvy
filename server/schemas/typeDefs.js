const typeDefs = `

type game = {
    gameID: string;
   title :string!
}

type User {
    _id: ID!
    username: String!
    email: String
    trackedGame: [game]
  }

  type Auth {
    token: ID!
    user: User
  }

  
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameData: gameInput!): User
    removeGame(gameId: ID!): User
  }
`;

module.exports = typeDefs;