import { Bar, Line } from 'react-chartjs-2';
import React from "react";


var data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [{
        label: '# of Votes',
        fill: false,
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        // borderWidth: 1
    }]
};

var options = {
    // scales: {
    //     yAxes: [{
    //         ticks: {
    //             beginAtZero:true
    //         }
    //     }]
    // }
};

export default class ClientMaster extends React.Component {
    render() {
        return (

            <div className="animated fadeIn" style={{ minHeight: '50vh' }}>

                {/* <Bar
                    data={data}
                    width={40}
                    height={50}
                    options={{
                        showLines: false,
                        maintainAspectRatio: false
                    }}
                /> */}
                <div style={{ width: '200px', height: '100px' }}>

                    <Line
                        data={data}
                        width={100}
                        height={100}
                        options={{
                            legend: {
                                display: false
                            },tooltips:{
                               enabled: false,
                            },
                            showLines: true,
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        color: "rgba(0, 0, 0, 0)",
                                    },

                                    ticks: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        color: "rgba(0, 0, 0, 0)"
                                    },

                                    ticks: {
                                        display: false
                                    }
                                }
                                ]
                            }
                        }}
                    />

                </div>
            </div>);
    }

}
