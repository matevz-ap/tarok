var Card = require('./Card.js');

module.exports = class Deck {
    constructor() {
        this.cards = []
    }

    build() {
        let suits = ["S", "C", "D", "H"];
        suits.forEach(s => {
            for (let i = 1; i < 9; i++) {
                this.cards.push(new Card(i, s));
            }
        });
        for (let i = 1; i < 23; i++) {
            this.cards.push(new Card(i, "T"));
        }
    }

    take(pot) {
        for(const card of pot) {
            this.cards.push(card);
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard() {
        return this.cards.pop();
    }

    count() {
        let res = 0;
        let strongCards = 0;
        for(let i = 0; i < this.cards.length - 2; i+=3) {
            let cards = this.cards.splice(i, 3);
            console.log(cards);
            for(const card of cards) {
                if(card.suit == "T") {
                    if([1, 21, 22].indexOf(card.value) > -1) {
                        res += 5;
                        strongCards += 1;
                    }
                }
                else if([5, 6, 7, 8].indexOf(card.value) > -1) {
                    res += card.value - 3;
                    strongCards += 1;
                }
                if(strongCards > 1) res -= strongCards - 1;
                else if(strongCards == 0) res = 1;
            }
        }
        return res
    }
};