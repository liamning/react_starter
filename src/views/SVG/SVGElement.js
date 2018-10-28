import React, { Component, Children } from 'react';
import SVGPoint from './SVGPoint';


class SVGElement extends Component {

    state = {
        ratio: 1,

        matrix: [1, 0, 0, 1, 0, 0],
        x: 100,
        y: 100,
        dragging: false,
    }

    onDragStart = (e) => {
        const startX = Math.round(e.clientX / 10) * 10;
        const startY = Math.round(e.clientY / 10) * 10;

        const state = {
            dragging: true,
            startX,
            startY,
        };

        this.setState(state);


        e.stopPropagation()
        e.preventDefault()
    }
    onDragMove = (e) => {

        if (!this.state.dragging) {
            return;
        }


        // Get the new x and y coordinates
        const x = Math.round(e.clientX / 10) * 10;
        const y = Math.round(e.clientY / 10) * 10;
        // const x = e.clientX;
        // const y = e.clientY;

        // Take the delta where we are minus where we came from.
        const dx = x - this.state.startX;
        const dy = y - this.state.startY;

        // Pan using the deltas
        this.pan(dx, dy);

        // Update the new startX and startY position
        // because a drag is likely a continuous movement
        this.setState({
            startX: x,
            startY: y,
        });


        e.stopPropagation()
        e.preventDefault()
    }


    pan = (dx, dy) => {
        this.state.x += dx;
        this.state.y += dy;

        this.setState({});
    }

    onDragEnd = (e) => {

        if (this.state.x < 0)
            this.state.x = 0;
        if (this.state.y < 0)
            this.state.y = 0;

        this.setState({ dragging: false });


        e.stopPropagation()
        e.preventDefault()
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

        // const Element = SVGAElement[this.props.tag]

        return (
            <React.Fragment>
                <g style={{ cursor: 'move' }}
                    onMouseDown={this.onDragStart}
                    onMouseMove={()=>{
                        console.log("this.onDragMove");
                    }}
                    // onMouseUp={this.onDragEnd}
                // onMouseOut={this.onDragEnd} 
                >
                    <rect
                        x={this.state.x} y={this.state.y} width={this.state.ratio * 200} height={this.state.ratio * 80} style={{ fillOpacity: "0.0", strokeOpacity: "0.5", fill: 'rgb(0,0,0)', strokeDasharray: "10 5", strokeWidth: 2, stroke: '#20a8d8' }} />


                </g>
                <g>

                    <SVGPoint style={{ cursor: 'pointer' }} cx={this.state.x + this.state.ratio * 100} cy={this.state.y} r="5" fill="#20a8d8"></SVGPoint>
                    <SVGPoint style={{ cursor: 'pointer' }} cx={this.state.x + this.state.ratio * 200} cy={this.state.y + this.state.ratio * 40} r="5" fill="#20a8d8"></SVGPoint>
                    <SVGPoint style={{ cursor: 'pointer' }} cx={this.state.x + this.state.ratio * 100} cy={this.state.y + this.state.ratio * 80} r="5" fill="#20a8d8"></SVGPoint>
                    <SVGPoint style={{ cursor: 'pointer' }} cx={this.state.x} cy={this.state.y + this.state.ratio * 40} r="5" fill="#20a8d8"></SVGPoint>
                </g></React.Fragment>

        );
    }
}

export default SVGElement;

