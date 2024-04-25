const typeDefs = `

type game {
    gameID: String
   title: String!
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
    saveGame(title: String!, gameID: String): User
    removeGame(gameId: ID!): User
  }
`;

module.exports = typeDefs;