import { Card } from '../shared/Card';

export class DealerService {
    constructor() {
        this.suits = ['heart', 'diamond', 'spade', 'club'];
        this.faces = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        this.jokers = [new Card('red', 'joker'), new Card('black', 'joker')]

        this.deck = this.shuffle(
            // Generate deck from suits and faces
               this.suits.map(s => 
                this.faces.map(f => 
                  new Card(s, f)
                )
              ).reduce((accumulator, list) =>
                accumulator.concat(list)
              ).concat(this.jokers)
            );
    }

    shuffle(array)  {
        let currentInd = array.length, temp, randInd;
        while (0 !== currentInd) {
          randInd = Math.floor(Math.random() * currentInd);
          currentInd--;
          temp = array[currentInd];
          array[currentInd] = array[randInd];
          array[randInd] = temp;
        }
        return array;
      }
}