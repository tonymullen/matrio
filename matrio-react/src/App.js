import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import { AI } from 'boardgame.io/ai';

import { MatrioBoard } from './components/MatrioBoard'
import { DealerService } from './services/DealerService';
import { Card } from './shared/Card';
import { Dot } from './shared/Dot';


const dealer = new DealerService();

const Matrio = Game({
  setup: () => ({
    dots: dots,
    leftMatrix: leftMatrix,
    topMatrix: topMatrix,
    prodMatrix: Array(9).fill(null),
    playerCards: playerCards,
    players: ['south', 'west', 'north', 'east'],
    canDropCard: canDropCard}),
  moves: {
    placeCard(G, ctx, cardname, row, col, matrix) {
      let playerName = G.players[ctx.currentPlayer];
      //console.log(playerName + " places card");
      //if (playerName === 'south') {
        G.playerCards["south"] = G.playerCards["south"].filter((i) => {
          return i.name !== cardname;
        });
        G[matrix][col][row] = name_card[cardname];
        updateDots(G, playerName);
      //}
    }
  },
  flow: {
    movesPerTurn: 1,
    onTurnEnd: (G, ctx) => {
      console.log("Turn has ended");
    },
    onMove: (G, ctx) => {
      console.log("Move made");
    },
    endGameIf: (G, ctx) => {
      let done = true;
      let totals = {
        "south" : 0,
        "west" : 0,
        "north" : 0,
        "east" : 0,
        "nobody" : 0
      };

      for (let p = 0; p < 4; p++) {
        if (G.playerCards[G.players[p]].length > 0){
          done = false;
        }
        if (done) {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              totals[G.dots[i][j].player] += G.dots[i][j].score;
            }
          }
        } 
      }

      let scoresList = [];

      for (var player in totals) {
        scoresList.push([player, totals[player]]);
      }

      scoresList.sort(function(a, b) {
        return b[1] - a[1];
      });

      if (IsVictory(scoresList)) {
        return { winner: scoresList[0][0] };
      }
      if (IsDraw(scoresList)) {
        return { draw: true };
      }
    },
  },
});

const App = Client({
  game: Matrio,
  board: MatrioBoard,
  ai: AI({
    bot: AI.RandomBot,
    enumerate: (G, ctx) => {
      let playerName = G.players[ctx.currentPlayer];
      let cards = G.playerCards[playerName];
      let moves = [];
      for (let i = 0; i < cards.length; i++) {
        let cardname = cards[i].face + "_" + cards[i].suit
        // add leftMatrix moves
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 4; col++) {
            // canDropCard(G, matrix, i, j, draggedCardName)
            if (canDropCard(G, leftMatrix, row, col, cardname)){
              moves.push({
                move: 'placeCard', args: [cardname, row, col, 'leftMatrix']
              })
            }
          }
        }
        // add topMatrix moves
        // for (let col = 0; col < 3; col++) {
        //   for (let row = 0; row < 4; row++) {

        //   }
        // }

//         if (G.cells[i] === null) {
//           moves.push({
//             // placeCard(G, ctx, player, cardname, row, col, matrix)
//  //           move: 'placeCard', args: [cardname, row, col, matrix]
//           });
//         }
      }
      //return moves.slice(0,2);
      return moves;
    },
  }),
  debug: true,
  numPlayers: 4,
  images: importCardImages()
});

function IsVictory(scoresList) {
  return scoresList[0] > scoresList[1];
}

// Return true if all cells are occupied
function IsDraw(scoresList) {
  // return cells.filter(c => c === null).length === 0;
  return scoresList[0] == scoresList[1];
}

const leftMatrix = [
              [new Card('spade', 'blank'), 
              new Card('spade', 'blank'), 
              new Card('spade', 'blank')],
              [new Card('diamond', 'blank'), 
              new Card('diamond', 'blank'), 
              new Card('diamond', 'blank')],
              [new Card('club', 'blank'), 
              new Card('club', 'blank'), 
              new Card('club', 'blank')],
              [new Card('heart', 'blank'), 
              new Card('heart', 'blank'), 
              new Card('heart', 'blank')]]

const topMatrix = [
              [new Card('spade', 'blank'), 
              new Card('spade', 'blank'), 
              new Card('spade', 'blank')],
              [new Card('diamond', 'blank'), 
              new Card('diamond', 'blank'), 
              new Card('diamond', 'blank')],
              [new Card('club', 'blank'), 
              new Card('club', 'blank'), 
              new Card('club', 'blank')],
              [new Card('heart', 'blank'), 
              new Card('heart', 'blank'), 
              new Card('heart', 'blank')]]


const name_card = {}
dealer.deck.forEach(card => {
  name_card[card.name] = card;
});

const playerCards = {
    "north": dealer.deck.slice(0,13), 
    "south": dealer.deck.slice(13, 26), 
    "east": dealer.deck.slice(26, 39),
    "west": dealer.deck.slice(39, 52)
  }

const dots = [
  [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
  [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
  [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)]
]

function updateDots(G, player) {
  let leftColumn = 0;
  let leftRow = 0;
  let topColumn = 0;
  let topRow  = 0
  for(leftRow = 0; leftRow < 3; leftRow++){
    let filledrows = true;
    for (leftColumn = 0; leftColumn < 3; leftColumn++) {
      if (G.leftMatrix[leftColumn][leftRow].face === 'blank') {
        filledrows = false
      }
    }
    if (filledrows) {
      for(topColumn = 0; topColumn < 3; topColumn++) {
        let filledcolumns = true;
        for (topRow= 0; topRow < 4; topRow++) {
          console.log(G.leftMatrix[topRow][topColumn].face)
          if (G.topMatrix[topRow][topColumn].face === 'blank') {
            filledcolumns = false
          }
        }
        if (filledcolumns) {
          if (G.dots[leftRow][topColumn].player === 'nobody') {
            G.dots[leftRow][topColumn] = new Dot(player, getDotProduct(G, leftRow, topColumn));
          } else {
            G.dots[leftRow][topColumn].score = getDotProduct(G, leftRow, topColumn);
          }
        }
      }
    }
  }
}

function getDotProduct(G, leftRow, topColumn) {
  let dp = 0;
  for (let i = 0; i < 4; i++){
    dp += G.leftMatrix[i][leftRow].value * G.topMatrix[i][topColumn].value;
  }
  return dp;
}

function canDropCard(G, matrix, i, j, draggedCardName) {
  let draggedCardFaceAndSuit = draggedCardName.split('_');
  let draggedFace = draggedCardFaceAndSuit[0]
  let draggedSuit = draggedCardFaceAndSuit[1]
  
  let  matchesBlank = ((matrix[j][i].face === 'blank') && 
                      (matrix[j][i].suit === draggedSuit));
  let notBlank = (matrix[j][i].face !== 'blank')
  let notBlankAndTraysFull = notBlank && suitTraysFull(G, draggedSuit);

  return (draggedFace === 'joker') || matchesBlank || notBlankAndTraysFull;
}

function suitTraysFull(G, suit) {
  let suits = ['spade', 'diamond', 'club', 'heart'];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if(suits[j] === suit) {
        if ((G.leftMatrix[j][i].face === 'blank') 
        ||
          (G.topMatrix[j][i].face === 'blank')) {
            return false;
        }
      }
    }
  }
  return true
}

function importCardImages() {
  let r = require.context('./assets/cards/', false, /\.png$/)
  let images = {};
  r.keys().forEach(item => 
    { 
      images[item.replace('./', '').replace('.png', '')] = r(item)
    });
  return images;
}


export default App;
