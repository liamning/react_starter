import React, { Component, Children } from 'react';
import SVGPoint from './SVGPoint';


class SVGElement extends Component {


    constructor(props) {
        super(props);

        this.connectedElements = [];
    }

    state = {
        ratio: 1,

        matrix: [1, 0, 0, 1, 0, 0],
        x: this.props.x || 10,
        y: this.props.y || 10,
        dragging: false,
        toggle: false,
        opacity: 0,
    }

    test = (element) => {
        // alert('test'); 
        if (element === this) {
            //console.log('testsdfsdfsdf');
        }
    }

    onDragStart = (e) => {
        
        this.props.setSelectedElement(this);

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

        this.connectedElements.forEach(eleDetails => {
            eleDetails[0].pan(dx, dy, eleDetails[1]);
        });

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

    checkConnectionPoint = () => {
        var targetIndex = -1;
        this.setState({
            opacity: 0
        });
        this.connectedElements.forEach((element, index) => {
            console.log(element[0].state);
            console.log(this.state);
            if (
                10 > element[0].state[`x${element[1]}`] - this.state.x
                || 80 < element[0].state[`x${element[1]}`] - this.state.x
                || 10 > element[0].state[`y${element[1]}`] - this.state.y
                || 80 < element[0].state[`y${element[1]}`] - this.state.y
            ) {
                targetIndex = index;

                // console.log(element[0].state);
                // console.log(this.state);
                console.log("NNNNNNNNNNNNNNNNNNNNNNNNNN");
            }
        });
        if (targetIndex != -1) {

            this.connectedElements.splice(targetIndex, 1);
            return false;
        }
        return true;
    }

    componentDidUpdate(props, state) {
        const toggleclick = () => {
            this.state.toggle = false;
        }
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onDragMove)
            document.addEventListener('mouseup', this.onDragEnd)
            // document.addEventListener('click', toggleclick)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onDragMove)
            document.removeEventListener('mouseup', this.onDragEnd)
            // document.removeEventListener('click', toggleclick)
        }
    }


    render() {

        // const Element = SVGAElement[this.props.tag]

        const { setSelectedElement, getSelectedElement, parentProps, ...rest } = this.props;
        const connectObj = { setSelectedElement, getSelectedElement, parentProps, connectedElements: this.connectedElements };

        return (
            <React.Fragment>
                <g style={{ cursor: 'move' }}

                    onClick={(e) => {

                        e.stopPropagation()
                        e.preventDefault()
                    }}

                    onMouseDown={this.onDragStart}
                    onMouseMove={() => {
                        //console.log("this.onDragMove");
                        var eleDetails = this.props.parentProps.getDragElement();
                        if (eleDetails[0]) {
                            let existing = false;
                            this.connectedElements.forEach(element => {
                                if (Object.is(element[0], eleDetails[0])) {
                                    existing = true;
                                    element[1] = eleDetails[1];
                                    return false;
                                }
                            });
                            if (!existing) {
                                this.connectedElements.push(eleDetails);
                                eleDetails[0].connectedElements.push([this, eleDetails[1]]);
                                console.log("YYYYYYYYYYYYYYYYYYY");
                            } else {
                                console.log("existing existing existing existing");
                            }
                            this.setState({
                                opacity: 0.3
                            });
                            //console.log(eleDetails[0].connectedElements);

                        }
                    }}
                >
                    <rect


                        x={this.state.x} y={this.state.y}
                        width={this.state.ratio * 80}
                        height={this.state.ratio * 80}
                        style={{ fillOpacity: this.state.opacity, strokeOpacity: "0.0", fill: 'rgb(0,0,0)', strokeDasharray: "4 2", strokeWidth: 1, stroke: '#20a8d8' }} />
                    <g
                        // onClick={(e) => {
                        //     e.stopPropagation()
                        //     e.preventDefault()
                        // }} 
                         >
                        <svg x={this.state.x + 10} y={this.state.y + 10} xmlns="http://www.w3.org/2000/svg" width={this.state.ratio * 60} height={this.state.ratio * 60} viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z" /></svg>
                    </g>


                    {/* <text style={{ pointerEvents: 'none' }} x={this.state.x} y={this.state.y + 90} >Approval Step</text> */}
                    {this.state.toggle && <g>
                        <rect

                            x={this.state.x + 10} y={this.state.y + 10} width={this.state.ratio * 60} height={this.state.ratio * 60} style={{ fillOpacity: "0.0", strokeOpacity: "0.5", fill: 'rgb(0,0,0)', strokeDasharray: "4 2", strokeWidth: 2, stroke: '#20a8d8' }} />

                        <SVGPoint  {...connectObj} style={{ cursor: 'pointer' }} cx={this.state.x + this.state.ratio * 30 + 10} cy={this.state.y + 10} r="5" fill="#20a8d8"></SVGPoint>
                        <SVGPoint {...connectObj} style={{ cursor: 'pointer' }} cx={this.state.x + this.state.ratio * 60 + 10} cy={this.state.y + this.state.ratio * 30 + 10} r="5" fill="#20a8d8"></SVGPoint>
                        <SVGPoint {...connectObj} style={{ cursor: 'pointer' }} cx={this.state.x + this.state.ratio * 30 + 10} cy={this.state.y + this.state.ratio * 60 + 10} r="5" fill="#20a8d8"></SVGPoint>
                        <SVGPoint {...connectObj} style={{ cursor: 'pointer' }} cx={this.state.x + 10} cy={this.state.y + this.state.ratio * 30 + 10} r="5" fill="#20a8d8"></SVGPoint>
                    </g>}

                </g>
            </React.Fragment>

        );
    }
}

export default SVGElement;

