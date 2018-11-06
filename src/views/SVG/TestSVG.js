import React, { Component, Children } from 'react';
import SVGElement from './SVGElement'
import SVGLine from './SVGLine'


class SVGTest extends Component {

    SVGTag = {
        'line': <line></line>
    }
    state = {
        radius: 50,
        height: 300,
        ratio: 1,
        isConnecting: false,
        Element: [],
        ChildrenComponent: []
    }

    onWheel = (e) => {
        e.stopPropagation();
        //console.log("e", e);
        //console.log("ex", e.pageX);
        //console.log("ey", e.deltaY);
        //console.log("type", e.type);

        if (e.deltaY < 0) {
            this.state.ratio = this.state.ratio * 1.05;
            this.setState({});
        } else {
            this.state.ratio = this.state.ratio / 1.05;
            this.setState({});
        }
    }

    getSelectedElement = () => {
        return this.selectElement;
    }

    setSelectedElement = (ele) => {
        if (this.selectElement)
            this.selectElement.setState({ toggle: false });
        this.selectElement = ele;
        if (ele)
            this.selectElement.setState({ toggle: true });
    }

    setDragElement = (ele, num) => {
        this.ElementDragged = ele;
        this.ElementDraggedNum = num;
    }
    getDragElement = () => {
        //console.log(this.ElementDragged);
        return [this.ElementDragged, this.ElementDraggedNum];
    }


    allowDrop = (e) => {
        e.preventDefault();
    }

    drag = (e, x, y, ele) => {
        e.dataTransfer.setData("text", e.target);

        const startX = Math.round(e.clientX / 10) * 10;
        const startY = Math.round(e.clientY / 10) * 10;

        this.state.startX = startX - x;
        this.state.startY = startY - y;
        this.state.ele = ele;
    }

    drop = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        //e.target.appendChild(document.getElementById(data));
        // console.log(data);
        // console.log(e);

        // Get the new x and y coordinates
        const x = Math.round(e.clientX / 10) * 10;
        const y = Math.round(e.clientY / 10) * 10;

        // Take the delta where we are minus where we came from.
        const dx = x - this.state.startX;
        const dy = y - this.state.startY;


        // this.drawElement("line", {
        //     x1: dx, y1: dy, x2: dx + 100, y2: dy + 100, style: { stroke: 'rgb(0,0,0)', strokeWidth: 1 }
        // });

        this.drawElement(this.state.ele, {
            getSelectedElement: this.getSelectedElement,
            setSelectedElement: this.setSelectedElement,
            x: dx, y: dy,
        });
    }

    drawElement = (tag, props) => {
        const parentProps = {
            drawElement: this.drawElement,
            setDragElement: this.setDragElement,
            getDragElement: this.getDragElement,
        };
        switch (tag) {
            case "line":
                this.state.Element.push(
                    <SVGLine key={this.state.Element.length + 1}
                        x1={props.x} y1={props.y} x2={props.x + 100} y2={props.y + 100} style={{ stroke: 'rgb(0,0,0)', strokeWidth: 2 }}
                        {...props} ref={(ip) => {
                            this.state.ChildrenComponent.push(ip)
                            //console.log(this.state.ChildrenComponent);

                        }}

                        parentProps={parentProps}
                    />
                );

                break;
            case "SVGElement":
                this.state.Element.splice(0, 0, 
                    <SVGElement key={this.state.Element.length + 1}
                        {...props}
                        parentProps={parentProps}
                        ref={(ip) => {
                            this.state.ChildrenComponent.push(ip)
                        }} />
                );

                break;
        }
        this.setState({});
        return this.state.ChildrenComponent[0]
    }

    componentDidMount() {


    }


    render() {
        return (
            <React.Fragment>
                <div style={{
                    width: (1000 * this.state.ratio) + 'px',
                    background: 'white',
                    marginBottom: '1px'

                }} className="clearfix">
                    <ul className="toolbar">
                        <li><i className="fa fa-wpforms" draggable="true" onDragStart={(e) => {
                            this.drag(e, 10, -40, 'SVGElement');
                        }} ></i></li>
                        <li><i className="fa fa-arrow-right" draggable="true" onDragStart={(e) => {
                            this.drag(e, 50, -30, 'line');
                        }} ></i></li>
                        <li><i className="fa fa-trash"></i></li>
                        <li><i className="fa fa-save"></i></li>
                        <li><i className="fa fa-cogs"></i></li>
                    </ul>
                </div>


                <div
                    className="svgBackground"
                    onClick={() => {
                        //this.setSelectedElement(undefined);
                    }}
                    onDrop={this.drop} onDragOver={this.allowDrop}
                    style={{
                        width: (1000 * this.state.ratio) + 'px', height: (700 * this.state.ratio) + 'px',
                    }}>

                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minHeight: "100%" }} >

                        {this.state.Element}


                    </svg>

                </div>
            </React.Fragment>
        );
    }
}

export default SVGTest;

