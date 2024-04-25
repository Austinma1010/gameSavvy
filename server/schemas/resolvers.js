const {user} = require('../models')


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await user.findOne({ _id: context.user._id }).select('-__v -password');
    
            return userData;
          }
    
          throw AuthenticationError;
        },
      },
      
    Mutation: {
      login: async (parent, { email, password }, context) => {
        // Logic to handle user login and return an Auth object
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
        return { token, user };
      },
      addUser: async (parent, args) => {
        // Logic to add a new user and return an Auth object
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      saveGame: async (parent, { gameData }, context) => {
        // Logic to save a game for the user
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { gameSchema: gameData } },
              { new: true }
            );
    
            return updatedUser;
          }
    
          throw AuthenticationError;
      },
      removeGame: async (parent, { gameId }, context) => {
        // Logic to remove a game from the user's tracked games
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { gameSchema: { gameId } } },
              { new: true }
            );
    
            return updatedUser;
          }
    
          throw AuthenticationError;
      }
    }
  };

  module.exports = resolvers;