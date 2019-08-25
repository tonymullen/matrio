# MatriO

MatriO is a game based on matrix multiplication played to be played by 4 people using a standard deck of playing cards (mini sized is recommended) and a special board. 

<img src="/images/photo-fixed.png" alt="board" width="550"/>

## The object of the game

Players take turns placing their cards on the board to determine the placement of their dot markers and their scores. The player with the highest total score when all cards have been played is the winner.

## The board

The board is laid out as shown:

<img src="/images/matrio_board.png" alt="board" width="450"/>

A total of six trays for each suit are laid out in colums (lower left) and rows (upper right). A 3 by 3 grid (lower right) is where player's *dot markers* are placed to calculate scores. 

## Playing the game

Discard the 4 of clubs and the 10 of diamonds. Keep both jokers. Shuffle the cards and deal 13 cards to each player. 

The player with the 2 of clubs plays first. 

### Card placement

Players play by placing a card in one of the trays according to the following rules:

* If one or more trays of a particular suit are empty, cards of that suit may only be played in an empty tray of the corresponding suit. 
* Only a card of a corresponding suit may be played in an empty tray. 
* Once all trays of a given suit have at least one card in them, cards of that suit may be played in any non-empty tray on the board.
* Jokers may be played in any tray (including empty trays) at any time.

### Dot marker placement

When a player places a card that completes a row-colum combination, that player may place a dot marker on the cell in the 3 by 3 grid taht corresponds to the intersection of the row-column combination that they just completed. 

In the image below, the purple player places the ten of clubs in the clubs tray in the rightmost column, completing a row-column combination of the rightmost column and bottommost row. Having placed the last card in this combination, the purple player places their dot marker on the corresponding cell (lower right) and the dot score calculated on that marker becomes part of purple's total score.

![Board](/images/dot_placement.png)


It is possible to complete more than one row-column combinations at once, with the placement of a single card. In this case, the player puts a dot marker on each of the cells that correspond to an intersection of a completed row-column combination (up to 3 in a single move). 

### Calculating scores

Dot scores are calculated based on the values of the visible cards in the corresponding row and column. Each of the suits' tray values are multiplied between row and column, and the sum of the four suits' tray value products is the dot score. 

That is, the card value in the row spades tray is multiplied by the card value in the column spades tray, the value in the row diamonds tray is multiplied by the value in the column diamonds tray, the value in the row clubs tray multiplied by the value in the column clubs tray, and the value in the row hearts tray is multiplied by the value in the column hearts tray. The four products are added together for the dot score.

Black cards represent positive values. Red cards represent negative values. The specific card values are as follows:

* The Queen of Spades is worth 13
* All other black face cards are worth 10
* All red face cards are worth -10
* All black number cards are worth their numerical value
* All red number cards are worth their numerical value in negative
* Black aces are worth 1
* Red aces are worth -1
* Jokers are worth 0

The calculation of a dot score given a row and column of cards is shown in the following illustration:

<img src="/images/dot_score.png" alt="score" width="400"/>

Note that as play advances cards of any suit may be placed in a given suit tray, so the product between same-suit trays may be negative due to a red card in one tray and a black card in the other tray.

### Updating scores

Dot scores should be re-calculated and updated after each card placement that alters the dot scores. Any time an erroneously calculated score is noticed, it should be corrected immediately.

### Example of a finished game

The game shown below is completed, and yellow has won with 84 points. 

![Board](/images/photo-fixed.png)

## What you need to play the game

A board can be drawn on any large piece of paper, or the .svg file in the `resources` directory can be printed in dimensions of 17"x17".

In this case, it is recommended to use colored post-it notes or acrylic disks as dot markers and dry erase pens to keep track of dot scores.

3D printable models can be found in the .blend file in the `resources` directory if you want to print a fancier board. You will need to glue the trays onto a 17"x17" surface. Dot markers should be assembled with 2" diameter white acrylic disks (these can be obtained, for example, [here](http://www.delviesplastics.com/p/Colored_Acrylic_Discs.html))

The 17"x17" board dimensions assume that [mini (2.5" by 1.8") playing cards](https://bicyclecards.com/product/bicycle-mini-playing-cards/) are used. 


&copy; 2019 Tony Mullen

<img src="/images/640px-Cc-by-nc_icon.svg.png" alt="cc" width="250"/>
