
export class Dot {
    _score;
    _value;
  
    constructor(player, score) {
      this._player = player;
      this._score = score;
    }
 
    get score() {
        return this._score;
    }

    set score(s) {
      this._score = s;
    }

    get player() {
        return this._player;
    }
  }

