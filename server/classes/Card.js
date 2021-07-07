module.exports = class Card {
    constructor(val, suit) {
        this.value = val;
        this.suit = suit;
    }
    show() {
        console.log("{} of {}".format(this.value, this.suit))
    }
}