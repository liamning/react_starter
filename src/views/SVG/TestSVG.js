import React, { Component, Children } from 'react';
import SVGElement from './SVGElement'


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
        console.log("e", e);
        console.log("ex", e.pageX);
        console.log("ey", e.deltaY);
        console.log("type", e.type);

        if (e.deltaY < 0) {
            this.state.ratio = this.state.ratio * 1.05;
            this.setState({});
        } else {
            this.state.ratio = this.state.ratio / 1.05;
            this.setState({});
        }
    }

    getConnectState = () => {
        return this.state.isConnecting;
    }

    setConnectState = (value) => {
        this.state.isConnecting = value;
    }

    drawElement = (tag, props) => {

        switch (tag) {
            case "line":
                this.state.Element.push(
                    <line key={this.state.Element.length + 1} {...props}   ref={(ip) => { 
                        this.state.ChildrenComponent.push(ip)
                        console.log(this.state.ChildrenComponent);
                    }}/>
                );

                break;
            case "SVGElement":
                this.state.Element.push(
                    <SVGElement key={this.state.Element.length + 1} 
                    {...props} 
                    drawElement={this.drawElement} 
                    ref={(ip) => { 
                        this.state.ChildrenComponent.push(ip)
                        console.log(this.state.ChildrenComponent); 
                    }}/>
                );

                break;
        }
        this.setState({});
    }

    componentDidMount() {

        this.drawElement("SVGElement", {
            getConnectState: this.getConnectState,
            setConnectState: this.setConnectState
        });
        // this.drawElement("line", {
        //     x1: 1, y1: 1, x2: 100, y2: 100, style: { stroke: 'rgb(0,0,0)', strokeWidth: 1 }
        // });
 
    }


    render() {
        return (
            <div
                className="svgBackground"
                style={{
                    width: (1000 * this.state.ratio) + 'px', height: (800 * this.state.ratio) + 'px',
                }}>

                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minHeight: "100%" }} >

                    {this.state.Element}

                </svg>

            </div>
        );
    }
}

export default SVGTest;

