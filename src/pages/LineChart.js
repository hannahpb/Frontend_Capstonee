import React, {useState, useRef, useEffect } from 'react';
import axios from "axios";
import * as d3 from 'd3';
function LineChart(){
    const [data, setData] = useState([""]);
    const svgRef = useRef();

    useEffect(() => {
        
        axios.get(`/api/count`).then((res) => {
            if (res.status === 200) {
              setData(res.data.all);
            }
          });
    },[]);

    const w = 400
        const h = 100
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('background', '#17A2B8')
            .style('margin-top', '15')
            .style('margin-left', '50')
            .style('overflow', 'visible');

        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, w]);

        const yScale = d3.scaleLinear()
            .domain([0, h])
            .range([h, 0])
        const generateScaledLine = d3.line()
            .x((d,i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal);

        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(i => i + 1);
        const yAxis = d3.axisLeft(yScale)
            .ticks(5);
        
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)

        svg.append('g')
            .call(yAxis);
        

        svg.selectAll('.line')
            .data([data])
            .join('path')
            .attr('d', d => generateScaledLine(d))
            .attr('fill', 'none')
            .attr('stroke', 'black')


    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}
export default LineChart;