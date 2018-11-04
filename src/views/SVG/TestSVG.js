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
        if(this.selectElement)
            this.selectElement.setState({toggle: false});
        this.selectElement = ele;
        if(ele)
            this.selectElement.setState({toggle: true});
    }

    setDragElement = (ele, num) => {
        this.ElementDragged = ele;
        this.ElementDraggedNum = num;
    }
    getDragElement = () => {
        //console.log(this.ElementDragged);
        return [this.ElementDragged, this.ElementDraggedNum];
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
                    <SVGLine key={this.state.Element.length + 1} {...props} ref={(ip) => {
                        this.state.ChildrenComponent.push(ip)
                        //console.log(this.state.ChildrenComponent);
                    }}

                        parentProps={parentProps}
                    />
                );

                break;
            case "SVGElement":
                this.state.Element.push(
                    <SVGElement key={this.state.Element.length + 1}
                        {...props}
                        parentProps={parentProps}
                        ref={(ip) => {
                            this.state.ChildrenComponent.push(ip)
                            //console.log(this.state.ChildrenComponent);
                        }} />
                );

                break;
        }
        this.setState({});
        return this.state.ChildrenComponent[0]
    }

    componentDidMount() {

        this.drawElement("SVGElement", {
            getSelectedElement: this.getSelectedElement,
            setSelectedElement: this.setSelectedElement
        });
        this.drawElement("SVGElement", {
            getSelectedElement: this.getSelectedElement,
            setSelectedElement: this.setSelectedElement
        });
        this.drawElement("SVGElement", {
            getSelectedElement: this.getSelectedElement,
            setSelectedElement: this.setSelectedElement
        });
        // this.drawElement("line", {
        //     x1: 1, y1: 1, x2: 100, y2: 100, style: { stroke: 'rgb(0,0,0)', strokeWidth: 1 }
        // });

    }


    render() {
        return (
            <React.Fragment>
                <div style={{
                    width: (1000 * this.state.ratio) + 'px',
                    background:'white', 
                    marginBottom: '1px'
                     
                }} className="clearfix">
                    <ul className="toolbar">
                        <li><i className="fa fa-plus"></i></li>
                        <li><i className="fa fa-trash"></i></li>
                        <li><i className="fa fa-save"></i></li>
                        <li><i className="fa fa-cogs"></i></li>
                    </ul>
                </div>
                <div
                    className="svgBackground"
                    onClick={()=>{
                        //this.setSelectedElement(undefined);
                    }}
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

