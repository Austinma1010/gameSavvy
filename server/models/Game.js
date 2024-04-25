const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        }, 
        gameId: {
            type: String
        },
    },
);

const Game = model('Game', gameSchema);

module.exports = Game;