import React from 'react';

class MatrixB extends React.Component {

    onDragOver = (ev) => {
      ev.preventDefault();
    }

    onDrop = (ev, row, col) => {
      ev.preventDefault();
      let cardname = ev.dataTransfer.getData("text");
      this.props.placeCard(cardname, row, col, "topMatrix");
    }

    render() {
      const cellStyle = {
        border: '1px solid #555',
        width: '100px',
        height: '70px',
        lineHeight: '70px',
        textAlign: 'center',
      };
  
      let tbody = [];
      let suits = ['spade', 'diamond', 'club', 'heart']
      for (let i = 0; i < 4; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
          const id = 3 * i + j;
          cells.push(
            <td  key={id}>
              <div style={cellStyle}className="droppable" 
              onDragOver={(e)=>this.onDragOver(e)} 
              onDrop={this.props.G.canDropCard(this.props.G, this.props.G.topMatrix, j, i, this.props.dragging) ? (e)=>{ this.onDrop(e, j, i)} : null}>

              <img  width='67%' src={this.props.G.topMatrix[i][j].image} style={
                {transform: `translateY(-15px)rotate(-90deg)`}
              }
               alt="card"></img>
               </div>
            </td>
          );
        }
        tbody.push(<tr key={i}>{cells}</tr>)
      }
      const tableStyle = {
        backgroundColor: 'white'
        };

      return (
        <div>
          <table style={tableStyle}  id="board">
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    }
  }

  export { MatrixB };