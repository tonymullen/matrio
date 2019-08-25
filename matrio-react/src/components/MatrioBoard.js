import React from 'react';
import { MatrixBoard } from '../components/MatrixBoard'
import { Hand } from '../components/Hand'

export class MatrioBoard extends React.Component {
    constructor() {
      super()
      this.state={dragging: 'null_null'}
      this.setDragging = this.setDragging.bind(this)
    }

    setDragging(card) {
      this.setState({dragging: card.name});
    };

    render() {
      // console.log(this.props);
      // console.log(this.props.G);
      const nextPlayerGo = () => {
        console.log("Next player go after " +  this.props.ctx.currentPlayer)
        if (this.props.ctx.currentPlayer != 3) {
          this.props.step();
        }
      }

      let winner = '';
      if (this.props.ctx.gameover) {
        winner = 
          this.props.ctx.gameover.winner !== undefined ? (
            <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
          ) : (
            <div id="winner">Draw!</div>
          );
      }
  
      const cellStyle = {
        width: '50px',
        height: '50px',
        paddingLeft: "10px",
        paddingRight: "10px",
        textAlign: 'center',
      };
      const tableStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderSpacing : '0'
        };
      const headerStyle ={
          height: '50px'
      };
      return (
        <div>
        <div style={headerStyle}></div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td></td>
              <td style={cellStyle}>     
                    <Hand cards={this.props.G.playerCards["north"]} player='north' />
                </td>
              <td></td>
            </tr>
            <tr>
              <td style={cellStyle}>
              <div style={{
                      width: "80px",
                      height: "650px",
                  }} >
                    <div style={{
                        transform: `rotate(90deg)`
                    }} >
                    <Hand cards={this.props.G.playerCards["west"]} player='west' />
                    </div>
                </div>
                </td>
              <td>
              <MatrixBoard
                step={this.props.step}
                images={this.props.ctx.images} 
                G = {this.props.G}
                placeCard={this.props.moves.placeCard}
                dragging = {this.state.dragging}
                next={nextPlayerGo}
                end={this.props.events.endTurn}
                />
              </td>
              <td style={cellStyle}>
                <div style={{
                      width: "80px",
                      height: "650px",
                  }} >
                    <div style={{
                        transformOrigin: 'center',
                        transform: `rotate(90deg)`
                    }} >
                    <Hand cards={this.props.G.playerCards["east"]} player='east' />
                    </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <Hand G={this.props.G} cards={this.props.G.playerCards["south"]} player='player' drag={this.setDragging} />
        </div>
      );
    }
  
    // onClick(id) {
    //   this.props.moves.clickCell(id);
    //   if (this.isActive(id)) {
    //     this.props.moves.clickCell(id);
    //     this.props.events.endTurn();
    //   }
    // }
  
    // placeCard(card) {
    //   this.props.moves.placeCard(card);
    // }

    // isActive(id) {
    //   if (!this.props.isActive) return false;
    //   if (this.props.G.prodMatrix[id] !== null) return false;
    //   return true;
    // }


    // render() {
    //   let winner = '';
    //   if (this.props.ctx.gameover) {
    //     winner = 
    //       this.props.ctx.gameover.winner !== undefined ? (
    //         <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
    //       ) : (
    //         <div id="winner">Draw!</div>
    //       );
    //   }
  
    //   const cellStyle = {
    //     border: '1px solid #555',
    //     width: '50px',
    //     height: '50px',
    //     lineHeight: '50px',
    //     textAlign: 'center',
    //   };
  
    //   let tbody = [];
    //   for (let i = 0; i < 3; i++) {
    //     let cells = [];
    //     for (let j = 0; j < 3; j++) {
    //       const id = 3 * i + j;
    //       cells.push(
    //         <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
    //           <img  width={90} src={images['queen_club']}
    //            alt="card"></img>
    //           {this.props.G.prodMatrix[id]}
    //         </td>
    //       );
    //     }
    //     tbody.push(<tr key={i}>{cells}</tr>)
    //   }
  
    //   return (
    //     <div>
    //       <table id="board">
    //         <tbody>{tbody}</tbody>
    //       </table>
    //       {winner}
    //     </div>
    //   );
    // }
  }