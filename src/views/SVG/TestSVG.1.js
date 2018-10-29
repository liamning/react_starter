import React, { Component, Children } from 'react';
import SVGElement from './SVGElement'


class SVGTest extends Component {

    state = {
        radius: 50,
        height: 300,
        ratio: 1,
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

    render() {
        const children = [];
        const MyDiv = (props) => (<div {...props}>{props.children}</div>);
        var ComponentName = "MyDiv";
        for (var i = 0; i < 3; i += 1) {
            children.push(<MyDiv key={i} number={i}>test</MyDiv>);
        };

        const { standardProps, isAfterSave, onSubmit, getFormData, ...restProps } = this.props;


        return (
            <div
                className="svgBackground"
                style={{
                    width: (1000 * this.state.ratio) + 'px', height: (800 * this.state.ratio) + 'px',
                }}>

                <svg xmlns="http://www.w3.org/2000/svg"
                    // preserveAspectRatio="none"  
                    // viewBox="0 0 100 100"
                    // width="100%" minHeight="500px"
                    style={{ width: "100%", minHeight: "100%" }}
                    onWheel={this.onWheel} >

                    <SVGElement tag='rect'>
                      
                      </SVGElement>
                    <SVGElement tag='rect'>
                      
                    </SVGElement>

                    {/* <rect x={100} y={100} width={this.state.ratio * 300} height={this.state.ratio * 100} style={{ fill: 'rgb(255,255,255)', strokeWidth: 3, stroke: 'rgb(0,0,0)' }} /> */}

                    {/* <g style={{ visibility: 'visible', cursor: 'move' }}>
                    
                    <rect x="843.5" y="1062.25" width="210" height="105" fill="#ffffff" stroke="#000000" strokeWidth="1.75"
                        pointer-events="all"></rect></g> */}

                    {/* <foreignObject className="node" x="46" y={this.state.radius * this.state.ratio * 2 + 150} width="100" height="100">

                        <div style={{ border: '1px green solid' }}>I'm a div inside a SVG.</div>
                        {children}
                    </foreignObject> */}
                </svg>

            </div>
        );
    }
}

export default SVGTest;

