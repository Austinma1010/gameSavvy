const typeDefs = `

type game {
    gameID: String
   title: String!
}

type User {
    _id: ID!
    username: String!
    email: String
    trackedGames: [game]
  }

  type Auth {
    token: ID!
    user: User
  }

  
  type Query {
    me(token: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(title: String!, gameID: String, token: String): User
    removeGame(title: String!): User
  }
`;

module.exports = typeDefs;