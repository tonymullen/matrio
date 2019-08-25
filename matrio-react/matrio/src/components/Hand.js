import React from 'react';
import { Card } from '../components/Card'
import { tableStyle } from "../styles/HandComponentStyles";

export class Hand extends React.Component {
  
    isActive(id) {
      if (!this.props.isActive) return false;
      if (this.props.G.prodMatrix[id] !== null) return false;
      return true;
    }
  
    render() {
      const cellStyle = {
        border: '1px solid #555',
        width: '70px',
        height: '100px',
        lineHeight: '50px',
        textAlign: 'center',
      };
  
      let tbody = [];
      let cardSize = this.props.player === 'player' ? '70px' : '45px'
      let cardFlip = this.props.player === 'player' ? false : true

      for (let i = 0; i < this.props.cards.length; i++) {
        this.props.cards[i].flip = cardFlip;
        tbody.push(<td width='50px' key={i}>
          <Card size={cardSize} card={this.props.cards[i]} drag={this.props.drag} />
        </td>)
      }

      return (
        <div >
          <table style={tableStyle(this.props.player)}>
            <tbody>
            <tr>
            {tbody}
            </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
