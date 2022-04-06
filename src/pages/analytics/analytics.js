import React from 'react';
import Chart from 'react-apexcharts';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import ReactLoading from "react-loading";
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class Analytics extends React.Component {
	componentDidMount() {
			this.fetchChartData();
		}
	constructor(props) {
		super(props);
		this.fetchChartData = this.fetchChartData.bind(this)
		// this.chartReference = React.createRef(); 
        this.state = {
	        loading : true,
			pending : 0,
			approved : 0,
			declined : 0,
			chart : null,
			doughnatChartData : [],
			columnChart: {
				options: {
					chart: {
						height: 350,
						width : 100,
						type: 'bar'
					},
					title: {
						text: 'Number of Cheques per Month',
						align: 'center'
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: '55%',
							endingShape: 'rounded'	
						},
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						show: true,
						width: 2,
						colors: ['transparent']
					},
					colors: ['#47E1BC', '#4DFFDF', '#888888'],
					xaxis: {
						categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
						axisBorder: {
							show: true,
							color: 'rgba(182, 194, 201, 0.5)',
							height: 1,
							width: '100%',
							offsetX: 0,
							offsetY: -1
						},
						axisTicks: {
							show: true,
							borderType: 'solid',
							color: '#b6c2c9',
							height: 6,
							offsetX: 0,
							offsetY: 0
						}
					},
					yaxis: {
						title: {
							text: 'Number of Cheques'
						}
					},
					fill: {
						opacity: 1
					},
					tooltip: {
						y: {
							formatter: function (val) {
								return "$ " + val + " thousands"
							}
						}
					}
				},
				series: [{
					name: 'Approved',
					data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
				}, {
					name: 'Hold',
					data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
				}, {
					name: 'Declined',
					data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
				}]
			},
            columnChart2: {
				options: {
					chart: {
						height: 350,
						type: 'bar'
					},
					title: {
						text: 'Cheque Quantity',
						align: 'center'
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: '55%',
							endingShape: 'rounded'	
						},
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						show: true,
						width: 2,
						colors: ['transparent']
					},
					colors: ['#FFBABA', '#9FCDFF'],
					xaxis: {
						categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
						axisBorder: {
							show: true,
							color: 'rgba(182, 194, 201, 0.5)',
							height: 1,
							width: '100%',
							offsetX: 0,
							offsetY: -1
						},
						axisTicks: {
							show: true,
							borderType: 'solid',
							color: '#b6c2c9',
							height: 6,
							offsetX: 0,
							offsetY: 0
						}
					},
					yaxis: {
						title: {
							text: 'Number of Cheques'
						}
					},
					fill: {
						opacity: 1
					},
					tooltip: {
						y: {
							formatter: function (val) {
								return "$ " + val + " thousands"
							}
						}
					}
				},
				series: [{
					name: 'Interbank',
					data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
				}, {
					name: 'Intrabank',
					data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
				}]
			},
			
        }
		this.doughnutChart = {
			data: {
				labels: ['Approved', 'Declined', 'Hold'],
				datasets: [{
					data: [this.state.approved,this.state.declined,this.state.pending],
					backgroundColor: ['rgba(185, 255, 242, 0.7)', 'rgba(52, 181, 58, 0.7)', 'rgba(251, 241, 153, 0.7)'],
					borderColor: ['#B9FFF2', '#34B53A', '#FBF199'],
					borderWidth: 2,
					label: 'My dataset'
				}]
			},
			options: {
				responsive: true, 
				maintainAspectRatio: false
			}
		}
    }
	fetchChartData() {
        axios({
          method: "GET",
          url: `http://34.125.195.139:8090/api/get/analytics`,
        }).then((res) => {
			console.log(res)
			
			this.setState({approved: res.data["approved_cheques"]})
			this.setState({declined: res.data["declined_cheques"]})
			this.setState({pending: res.data["pending_cheques"]})
			// this.state.chart = this.chartReference.current.chartInstance;
			this.doughnutChart.data.datasets[0].data[0] = this.state.approved;
			this.doughnutChart.data.datasets[0].data[1] = this.state.declined;
			this.doughnutChart.data.datasets[0].data[2] = this.state.pending;
			this.setState({loading : false})
			// console.log(this.state.chart.data.datasets[0].data);
			// this.state.chart.update();
        });
      };
    render() {
		const {loading} = this.state;
		return (
			<div>
				{loading ?
				<div style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>  
                <ReactLoading width={100} type={"spinningBubbles"} color="#0083ca"/>
                </div> :
					<div className = "row" style = {{margin: '100px 30px 30px 30px', justifyContent: 'center'}}>
						<div className = "col-4" style = {{border: '1px solid #b4b4b4', margin: '10px'}}>
							<Chart type="bar" options={this.state.columnChart.options} series={this.state.columnChart.series} />
						</div>
						<div className = "col-4" style = {{border: '1px solid #b4b4b4',margin: '10px'}}>
							<Chart type="bar" options={this.state.columnChart2.options} series={this.state.columnChart2.series} />
						</div>
						<div className = "col-3" style = {{border: '1px solid #b4b4b4', margin: '10px'}}>
							<Doughnut id='doughnatChart' data={this.doughnutChart.data} options={this.doughnutChart.options} />
						</div>
					</div>}
            </div>
        )

    }
}

export default Analytics;