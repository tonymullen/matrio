import React from 'react';
import { Dot } from '../components/Dot'


class MatrixProd extends React.Component {  
    render() {
        
        const tableStyle = {
            backgroundColor: 'white'
            };
  
        const cellStyle = {
            border: '1px solid #555',
            width: '100px',
            height: '100px',
            lineHeight: '50px',
            textAlign: 'center',
        };
  
      let tbody = [];
      for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
          const id = 3 * i + j;
          cells.push(
            <td key={j}>
              <div style={cellStyle}>
              <Dot dot={this.props.G.dots[i][j]} />
               </div>
            </td>
          );
        }
        tbody.push(<tr key={i}>{cells}</tr>)
      }
  
      return (
        <div>
          <table style={tableStyle} id="board">
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    }
  }

export { MatrixProd }