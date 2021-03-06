
import React, { Component, Children } from 'react';

class SVGPoint extends Component {

    state = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0, 

        matrix: [1, 0, 0, 1, 0, 0],
        x: 0,
        y: 0,
        dragging: false,  
    }


    state = {
    }

    onDragStart = (e) => { 
        const startX = Math.round(e.clientX / 10) * 10;
        const startY = Math.round(e.clientY / 10) * 10;
 
        const state = {
            dragging: true,
            startX,
            startY,
            x1: this.props.cx,
            y1: this.props.cy,
            x2: this.props.cx,
            y2: this.props.cy,
        };

        

        this.setState(state);
    }
    onDragMove = (e) => {
        
        if (!this.state.dragging) {
            return;
        }


        // Get the new x and y coordinates
        const x = Math.round(e.clientX / 10) * 10;
        const y = Math.round(e.clientY / 10) * 10;

        // Take the delta where we are minus where we came from.
        const dx = x - this.state.startX;
        const dy = y - this.state.startY;

        
        this.state.startX += x;
        this.state.startY += y;

        this.setState({
            startX: x,
            startY: y,
        });

        // Pan using the deltas
        this.pan(dx, dy);

        // Update the new startX and startY position
        // because a drag is likely a continuous movement
 
    }


    pan = (dx, dy) => {
        this.state.x += dx;
        this.state.y += dy;

        
        this.state.x2 += dx;
        this.state.y2 += dy;

        this.setState({});
    }

    onDragEnd = (e) => {

        if (this.state.x < 0)
            this.state.x = 0;
        if (this.state.y < 0)
            this.state.y = 0;

        this.setState({ dragging: false });
    }

    
    componentDidUpdate (props, state) {
        if (this.state.dragging && !state.dragging) {
          document.addEventListener('mousemove', this.onDragMove)
          document.addEventListener('mouseup', this.onDragEnd)
        } else if (!this.state.dragging && state.dragging) {
          document.removeEventListener('mousemove', this.onDragMove)
          document.removeEventListener('mouseup', this.onDragEnd)
        }
      }


    render() {


        return (
            <React.Fragment>
                <circle {...this.props} 
                
                onClick={e => {
                    console.log(e);
                    this.setState({
                        x: this.props.cx,
                        y: this.props.cy,
                    });


                }}></circle>

                
               { this.state.x && <circle {...this.props} 

draggable="true"

style={{ cursor: 'default' }}
onMouseDown={this.onDragStart}  
cx={this.state.x}
cy={this.state.y}
fill="#00FF00"
r="6"
                ></circle>}

                {this.state.x1 &&
                    <line x1={this.state.x1} y1={this.state.y1} x2={this.state.x2} y2={this.state.y2} style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} />
                }

            </React.Fragment>
        );
    }
}

export default SVGPoint;

