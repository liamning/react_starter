import React, { Component, Children } from 'react';


class SVGTest extends Component {

    state = {
        radius: 50,
        height: 300,
        ratio: 1,
    }

    render() {
 
        const { standardProps, isAfterSave, onSubmit, getFormData, ...restProps } = this.props;


        return (
<div style={{width: '100px', height: '100px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            // preserveAspectRatio="none" viewBox="0 0 5 3" 
            preserveAspectRatio="xMidYMid meet"
            // width="100%" height="500"
            viewBox="0 0 100 100"
            onWheel = {(e) => 
            {
                e.stopPropagation();
                console.log("e", e);
                console.log("ex", e.pageX);
                console.log("ey", e.deltaY );
                console.log("type", e.type);

                if(e.deltaY < 0){
                    this.state.ratio = this.state.ratio * 1.05; 
                    this.setState({});
                } else {
                    this.state.ratio = this.state.ratio / 1.05; 
                    this.setState({});
                }
            }
            } >
            {/* <symbol id="potofgold" > */} 
                {/* <circle cx={this.state.radius * this.state.ratio + 1} cy={this.state.radius * this.state.ratio + 1} r={this.state.radius * this.state.ratio} stroke="rgb(125,125,255)" strokeWidth="0" fill="blue" onClick={() => {
                
                }} /> */}
                {/* <rect x={2} y={this.state.radius * this.state.ratio * 2 + 23} width={this.state.ratio * 300} height={this.state.ratio*100} style={{ fill: 'rgb(255,255,255)', strokeWidth: 3, stroke: 'rgb(0,0,0)' }} /> */}

                {/* <circle cx="50px" cy="50px" 
                r="50px" stroke="rgb(125,125,255)" strokeWidth="0" fill="blue"  /> */}
  <rect  width={this.state.ratio * 300} height={this.state.ratio*100} style={{ fill: 'rgb(255,255,255)', strokeWidth: 3, stroke: 'rgb(0,0,0)' }} /> 

     

            </svg>
 
            </div>
        );
    }
}

export default SVGTest;

