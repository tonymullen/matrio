import React from 'react';

export class Card extends React.Component {
    
    isActive(id) {
      if (!this.props.isActive) return false;
      if (this.props.G.prodMatrix[id] !== null) return false;
      return true;
    }
    
    onDragStart = (ev, card) => {
      this.props.drag(card)
      ev.dataTransfer.setData("text/plain", card.name);
      localStorage.setItem("cardname", card.name);
    }

    onDragEnd = (ev) => {
      localStorage.setItem("cardname", null);
    }

    render() {  
      return (
        <div
            key={this.props.card.name}
            onDragStart={(e)=>this.onDragStart(e, this.props.card)}
            draggable
            className="draggable" >
        <img width={this.props.size} src={this.props.card.image} />
        </div>
      );
    }
  }

