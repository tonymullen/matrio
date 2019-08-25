import React from 'react';

export class Dot extends React.Component {

    render() {
        let color = '#bbb'
        if (this.props.dot.player === 'south') {
            color = "blue"
        } else if (this.props.dot.player === 'east') {
            color = "orange"
        } else if (this.props.dot.player === 'north') {
            color = "yellow"
        } else if (this.props.dot.player === 'west') {
            color = "purple"
        }
        
        const dotStyle  =   {
            boxSizing: "border-box",
            height: "100px",
            width: "100px",
            backgroundColor: color,
            borderRadius: "50%",
            display: "table-cell",
            borderStyle: "solid",
            borderColor: "gray",
            borderWidth: "thin",
            verticalAlign: "middle"
         }
         const innerStyle  =   {
            boxSizing: "border-box",
            height: "80px",
            width: "80px",
            backgroundColor: "white",
            borderRadius: "50%",
            display: "inline-flex",
            borderStyle: "solid",
            borderColor: "gray",
            borderWidth: "thin",
            verticalAlign: "middle",
            fontFamily: 'Nanum Pen Script',
            fontSize: '3em'
         }

         const textDivStyle = {
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '50%',
            marginTop: '15%'
         }

         if (this.props.dot.player === 'nobody') {
             return (
                 <div></div>
             )
         } else {
            return (
                <div style={dotStyle}>
                    <div style={innerStyle}>
                        <div style={textDivStyle}>
                        {this.props.dot.score}
                        </div>
                    </div>
                </div>
            );
         }
    }
  }

