
import React, { Component, Children } from 'react';

class SVGLine extends Component {

    constructor(props) {
        super(props);

        this.connectedElements = [];
    }

    state = {
        x1: this.props.x1,
        y1: this.props.y1,
        x2: this.props.x2,
        y2: this.props.y2,

        dragging: false,
    }


    onDragStart = (e, num) => {
        this.props.parentProps.setDragElement(this, num);
        const startX = Math.round(e.clientX / 10) * 10;
        const startY = Math.round(e.clientY / 10) * 10;

        const state = {
            dragging: true,
            startX,
            startY,
            num: num
            // x1: this.props.cx,
            // y1: this.props.cy,
            // x2: this.props.cx,
            // y2: this.props.cy,
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

    }


    pan = (dx, dy, num) => {
        this.state.x += dx;
        this.state.y += dy;

        if(num){

            this.state[`x${num}`] += dx;
            this.state[`y${num}`] += dy;
        } else {
            
        this.state[`x${this.state.num}`] += dx;
        this.state[`y${this.state.num}`] += dy;
        }

        this.setState({});
    }

    onDragEnd = (e) => {

        if (this.state.x < 0)
            this.state.x = 0;
        if (this.state.y < 0)
            this.state.y = 0;
        // this.props.setConnectState(false);
        this.props.parentProps.setDragElement(undefined);
        var outSideIndex = -1;
        this.connectedElements.forEach((element, index)=>{
            if(!element[0].checkConnectionPoint()){
                outSideIndex = index;
                return false;
            }
        });
        if(outSideIndex != -1){
            this.connectedElements.splice(outSideIndex);
        }
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

        // const { setConnectState, getConnectState, parentProps, ...rest } = this.props;
        
        const { setSelectedElement, getSelectedElement, parentProps, ...rest } = this.props;
        const connectObj = { setSelectedElement, getSelectedElement, parentProps, connectedElements: this.connectedElements };
        return (
            <React.Fragment>
                <line {...rest}
                    x1={this.state.x1} y1={this.state.y1}
                    x2={this.state.x2} y2={this.state.y2}
                    markerEnd="url(#arrow)"
                ></line>
                <circle cx={this.state.x1} cy={this.state.y1}
                    r="5" fill="#0f0"

                    style={{ cursor: 'default' }}
                    onMouseDown={(e)=>{
                        this.onDragStart(e, 1);
                    }}

                    onMouseMove={() => {
                        //console.log("this.onDragMove");
                        // if (getConnectState()) {
                        //     // alert("Connected");

                        //     //console.log("Connected");
                        // }
                    }}
                ></circle>

                <circle cx={this.state.x2} cy={this.state.y2}
                    r="5" fill="#0f0"
                    style={{ cursor: 'default' }}
                    onMouseDown={(e)=>{
                        this.onDragStart(e, 2);
                    }}

                    onMouseMove={() => {
                        //console.log("this.onDragMove");
                        // if (getConnectState()) {
                        //     // alert("Connected");

                        //     //console.log("Connected");
                        // }
                    }}
                ></circle>


                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#f00"/>
                </marker> 


            </React.Fragment>
        );
    }
}

export default SVGLine;

