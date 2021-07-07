var Card = require('./Card.js');

module.exports = class Deck {
    constructor() {
        this.cards = []
    }

    takeTalon(talon) {
        this.cards = this.cards.concat(talon);
        this.sort(0);
    }

    drawCard(card) {
        this.cards.push(card);
    }

    playCard(cardIndex) {
        let card = this.cards[cardIndex];
        this.cards.splice(cardIndex, 1);
        return card;
    }

    sort(n) {
        let deck = this.cards;
        if(n == deck.length) return
        
        for(let i = deck.length - 1; i > n; i--) {
            if(deck[i].suit == deck[i-1].suit && deck[i].value < deck[i-1].value) {
                this.swap(i, i-1);
            }
            else if(deck[i].suit < deck[i-1].suit) {
                this.swap(i, i-1);
            }
        }
        return this.sort(n+1);
    }

    swap(a, b) {
        let deck = this.cards;
        let temp = deck[a];
        deck[a] = deck[b];
        deck[b] = temp;
    }
};