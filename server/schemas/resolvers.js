const {User} = require('../models')
const { signToken, authenticate } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, { token }, context) => {
          userToken = await authenticate(token);
          if (userToken) {
            
            const userData = await User.findOne({ _id: userToken });

            if (!userData) {
              return console.log("couldn't find user");
            }
    
            return userData;
          }
    
          
        },
      },
      
    Mutation: {
      login: async (parent, { email, password }, context) => {
        // Logic to handle user login and return an Auth object
        const user = await User.findOne({ email });

        if (!user) {
          console.log('User not found');
          return;
        }
  console.log(password);
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          console.log('Incorrect PW');
          return;
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
      saveGame: async (parent, { title, token}, context) => {
        
        userToken = await authenticate(token);
        console.log(userToken);
        
        // Logic to save a game for the user
        if (userToken) {
          console.log('about to update');
            const updatedUser = await User.findByIdAndUpdate(
              { _id: userToken },
              { $push: { trackedGames: {title} } },
              { new: true }
            );
    
            return updatedUser;
          }
    
          console.log("something went wrong");
      },
      removeGame: async (parent, { title }, context) => {
        // Logic to remove a game from the user's tracked games
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { trackedGames: { title } } },
              { new: true }
            );
    
            return updatedUser;
          }
    
          throw AuthenticationError;
      }
    }
  };

  module.exports = resolvers;