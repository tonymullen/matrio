
import importAll from 'import-all.macro'

const images = importCardImages();

export class Card {
    _value;
    _suit;
    _face;
    _flip;
  
    constructor(suit, face) {
      this._suit = suit;
      this._face = face;
      this._flip = false;

      this._image = images[this._face + "_" + this._suit]
      this._flipImage = images['back-navy']
    }
  
    get suit() {
      return this._suit;
    }
  
    get face() {
      return this._face;
    }

    get name() {
      return this._face + "_" + this._suit;
    }
  
    get value() {
      if (this.face === 'blank') {
        return null;
      }
      let v = 0
      if (this.face === 'queen' && this.suit === 'spade') {
        v = 13;
      } else if (this.face === 'king'  || 
          this.face === 'queen' || 
          this.face === 'jack') {
              v = 10;
          } else if (this.face === 'joker') {
              v = 0;
          } else {
              v = Number(this.face) ;
          }
      if (this.suit === 'heart' ||
          this.suit === 'diamond') {
            v *= -1;
          }
      return v;
    }

    get image() {
        return this.flip ?  this._flipImage : this._image;
    }

    get flip(){
      return this._flip;
    }
  
    set flip(f) {
      this._flip = f;
    }
  }


function importCardImages() {
  let r = require.context('../assets/cards/', false, /\.png$/)
  let images = {};
  r.keys().forEach(item => 
    { 
      images[item.replace('./', '').replace('.png', '')] = r(item)
    });
  return images;
}

