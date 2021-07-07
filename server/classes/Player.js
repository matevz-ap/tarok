var Deck = require('./Deck.js');
var Hand = require('./Hand.js');

module.exports = class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.hand = new Hand();
        this.pot = new Deck();
        this.score = 0;
    }

    takeTalon(talon) {
        this.hand.takeTalon(talon);
    }

    playCard(cardIndex) {
        return this.hand.playCard(cardIndex);
    }
};