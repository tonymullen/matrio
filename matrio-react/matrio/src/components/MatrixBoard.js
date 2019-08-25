import React from 'react';
import { MatrixA } from './MatrixA'
import { MatrixB } from './MatrixB'
import { MatrixProd } from './MatrixProd'

import logo from '../assets/logo-angle.png'

class MatrixBoard extends React.Component {

    render() {
        // console.log(this.props);
        // console.log(this.props.G);
        const tableStyle = {
            marginLeft: 'auto',
            marginRight: 'auto',
            borderSpacing : '0'
            };
        return (
            <div>
            <table style={tableStyle}>
            <tbody>
            <tr>
                <td>
                    <img src={logo} width='300px'></img>
                </td>
                <td>
                <MatrixB G={this.props.G} placeCard={this.props.placeCard} dragging={this.props.dragging}/>
                </td>
            </tr>
            <tr>
                <td>
                <MatrixA end={this.props.end} next={this.props.next} G={this.props.G} placeCard={this.props.placeCard} dragging={this.props.dragging} step={this.props.step}/>
                </td>
                <td>
                <MatrixProd G={this.props.G} />
                </td>
            </tr>
            </tbody>
            </table>
        </div>
        );
        }
  }

  export { MatrixBoard };