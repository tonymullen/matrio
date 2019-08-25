import React from 'react';

class MatrixA extends React.Component {

    onDragOver = (ev) => {
      ev.preventDefault();
    }

    onDrop = (ev, row, col) => {
      ev.preventDefault();
      this.cardname = ev.dataTransfer.getData("text");
      this.props.placeCard(this.cardname, row, col, "leftMatrix");
      console.log("Dropped")
      //this.props.next();
      this.props.end();
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
      let suits = ['spade', 'diamond', 'club', 'heart']
      for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 4; j++) {
          const id = 3 * i + j;
          cells.push(
            <td key={id}>
              <div style={cellStyle} className="droppable"
              onDragOver={(e)=>this.onDragOver(e)} 
              onDrop={this.props.G.canDropCard(this.props.G, this.props.G.leftMatrix, i, j, this.props.dragging) ? (e)=>{ this.onDrop(e, i, j)} : null}>
                
              <img  height='100%' src={this.props.G.leftMatrix[j][i].image}
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
          <table style={tableStyle} id="board">
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    }
  }

export { MatrixA };