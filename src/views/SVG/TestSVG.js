import React, { Component, Children } from 'react';
import SVGElement from './SVGElement'


class SVGTest extends Component {

    state = {
        radius: 50,
        height: 300,
        ratio: 1,
        isConnecting: false,
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


    render() {
        return (
            <div
                className="svgBackground"
                style={{
                    width: (1000 * this.state.ratio) + 'px', height: (800 * this.state.ratio) + 'px',
                }}>

                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minHeight: "100%" }} >

                    <SVGElement 
                    tag='rect'
                    getConnectState={this.getConnectState}
                    setConnectState={this.setConnectState}>

                    </SVGElement>

                    <SVGElement 
                    tag='rect'
                    getConnectState={this.getConnectState}
                    setConnectState={this.setConnectState}>

                    </SVGElement>

                </svg>

            </div>
        );
    }
}

export default SVGTest;

