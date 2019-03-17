import React, { Component } from 'react';
import * as d3 from "d3";


class BarChart extends Component {
  componentDidMount() {
    const w = document.getElementById(this.props.id).clientWidth;
    this.drawChart(w);
  }

  shouldComponentUpdate() {

    return false;
  }

  drawChart(w) {
    const data = [16, 5, 6, 6, 9, 10];
    const margin = { left: 50, top: 10, right: 50, bottom: 30 } 
    const h = w / 2; 
    var width = w;
    var height = h;
 
    console.log(d3.scale);

    this.svg = d3.select(`div#${this.props.id}`)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      ;

    var barWidth = (w - 100) / 6;
    var start = 50;

    this.bar1 = this.svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => start + i * barWidth)
      .attr("y", (d, i) => h - 10 * d - 40)
      .attr("width", Math.trunc(barWidth * 0.8))
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")


    this.bar2 = this.svg.selectAll("rect2")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => start + i * barWidth)
      .attr("y", (d, i) => h - 13 * d - 40)
      .attr("width", Math.trunc(barWidth * 0.8))
      .attr("height", (d, i) => d * 10)
      .attr("fill", "red")

    //rectArray.attr('fill', 'yellow');

 

    this.barLabel = this.svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => start + i * barWidth + barWidth * 0.8 / 2)
      .attr("y", (d, i) => h - (10 * d) - 83)
      .attr("text-anchor", "middle")

    // Create scale

    this.xscale = d3.scaleLinear()
      .domain([0, 6])
      .range([0, width - 100]);

    this.yscale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - 50, 0]);

    this.x_axis = d3.axisBottom()
      .scale(this.xscale)
      .ticks(6)
      .tickFormat(d => (d + '-Test'))

    this.y_axis = d3.axisLeft()
      .scale(this.yscale);

    this.gy_axis = this.svg.append("g")
      .attr("transform", "translate(50, 10)")
      .call(this.y_axis);

    var xAxisTranslate = height - 40;

    this.gx_axis = this.svg.append("g")
      .attr("transform", "translate(50, " + xAxisTranslate + ")")
      .call(this.x_axis)


    d3.select(window).on('resize', this.resize);

  }
  resize = () => {
     var w = document.getElementById(this.props.id).clientWidth; 
    const h = w / 2; 
    var width = w;
    var height = h;
   
    var barWidth = (w - 100) / 6;
    var start = 50;

    this.svg 
    .attr("width", w)
    .attr("height", h)

   
    this.bar1 
      .attr("x", (d, i) => start + i * barWidth)
      .attr("y", (d, i) => h - 10 * d - 40)
      .attr("width", Math.trunc(barWidth * 0.8))
      .attr("height", (d, i) => d * 10) 


    this.bar2  
      .attr("x", (d, i) => start + i * barWidth)
      .attr("y", (d, i) => h - 13 * d - 40)
      .attr("width", Math.trunc(barWidth * 0.8))
      .attr("height", (d, i) => d * 10)  

 

    this.barLabel  
      .attr("x", (d, i) => start + i * barWidth + barWidth * 0.8 / 2)
      .attr("y", (d, i) => h - (10 * d) - 83) 

    // Create scale

    this.xscale  
      .range([0, width - 100]);

    this.yscale 
      .range([height - 50, 0]);

    this.x_axis  
      .scale(this.xscale) 

    this.y_axis 
      .scale(this.yscale);

    this.gy_axis 
      .attr("transform", "translate(50, 10)")
      .call(this.y_axis);

    var xAxisTranslate = height - 40;

    this.gx_axis  
      .attr("transform", "translate(50, " + xAxisTranslate + ")")
      .call(this.x_axis)
  }


  render() {
    return <div id={this.props.id}>

    </div>
  }
}

export default BarChart;