
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
        // //this.props.setSelectedElement(true);
        // const startX = Math.round(e.clientX / 10) * 10;
        // const startY = Math.round(e.clientY / 10) * 10;

        // const state = {
        //     dragging: true,
        //     startX,
        //     startY,
        //     x1: this.props.cx,
        //     y1: this.props.cy,
        //     x2: this.props.cx,
        //     y2: this.props.cy,
        // };



        // this.props.parentProps.drawElement("line", {
        //     x1: this.props.cx, y1: this.props.cy, x2: this.props.cx + 50, y2: this.props.cy, style: { stroke: 'rgb(0,0,0)', strokeWidth: 2 }
        // })


        // this.setState(state);
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
        //this.props.setSelectedElement(false);
        this.setState({ dragging: false });
    }


    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onDragMove)
            document.addEventListener('mouseup', this.onDragEnd)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onDragMove)
            document.removeEventListener('mouseup', this.onDragEnd)
        }
    }


    render() {

        const { setSelectedElement, getSelectedElement, parentProps, connectedElements, ...rest } = this.props;
        return (
            <React.Fragment>
                <circle {...rest}

                    style={{ cursor: 'default' }}
                    onMouseDown={this.onDragStart}

                    onMouseMove={() => {
                        //console.log("this.onDragMove");
                        if (getSelectedElement()) {
                            // alert("Connected");

                            //console.log("Connected");
                        }
                    }}
                    onClick={(e) => { 
                        e.stopPropagation()
                        e.preventDefault()
                    }} 

                ></circle>

            </React.Fragment>
        );
    }
}

export default SVGPoint;

