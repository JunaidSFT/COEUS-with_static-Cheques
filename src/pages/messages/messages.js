import React from 'react';
import {Card, CardBody, CardHeader, CardText} from 'reactstrap';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';


import TableMessages from './message-table.js';

class Messages extends React.Component {
	constructor(props) {
		super(props);

		var randomScalingFactor = function() { 
			return Math.round(Math.random()*100)
		};
		
		this.lineChart = {
			data: {
				labels: ['January', 'February', 'March'],
				datasets: [{
						label: 'Dataset 1',
						borderColor: '#348fe2',
						pointBackgroundColor: '#348fe2',
						pointRadius: 2,
						borderWidth: 2,
						backgroundColor: 'rgba(52, 143, 226, 0.3)',
						data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
				}]
			},
			options: {
				responsive: true, 
				maintainAspectRatio: false,
				hover: {
					mode: 'nearest',
					intersect: true
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true,
							max: 100
						}
					}]
				}
			}
		};

	}
	render() {
		return (
			<div className = "row">
			<div className = "col-8" style = {{padding: '20px 30px', marginTop: '100px'}}>
            <Card className="border-1">
							<CardHeader className="f-w-600" style = {{backgroundColor: '#F5F8FF'}}>
								Messages
							</CardHeader>
							<CardBody>
								
								<CardText>
                                <TableMessages />
								</CardText>
								
							</CardBody>
						</Card>
				
						
					
			</div>
			<div className = "col-4" style = {{backgroundColor: '#F5F8FF'}}>
				<div className = "row media media-sm media-list" style = {{paddingLeft: '10px', margin: '20px'}}>
					<div  className=" media-left">
						<img src="/assets/img/user/user-13.jpg" alt="" className="media-object rounded-corner" />
					</div>
				<div className="media-body">
					<h4 className="media-heading">Ahmed Shah</h4>
                    <h5>Bank Emplyee Code</h5>
					<p>239982</p>
				</div>
			</div>
            <div className = "m-20">
			<Card className="border-1">
							<CardHeader className="f-w-600">
								Employee Information
							</CardHeader>
						</Card>
			</div>
			<div className='widget-chat widget-chat-rounded m-20 '>
							<div className="widget-chat-header">
								<div className="widget-chat-header-icon">
									<i className="fas fa-envelope width-30 height-30 f-s-20 text-inverse text-center rounded-corner" style={{lineHeight: '30px', backgroundColor:'#F5F8FF'}}></i>
								</div>
								<div className="widget-chat-header-content">
									<h4 className="widget-chat-header-title">Messages</h4>
								</div>
							</div>
							<PerfectScrollbar className="widget-chat-body" style={{height: '235px'}} options={{suppressScrollX: true}}>
								<div className="widget-chat-item with-media left">
									<div className="widget-chat-media">
										<img alt="" src="/assets/img/user/user-13.jpg" />
									</div>
									<div className="widget-chat-info">
										<div className="widget-chat-info-container">
											<div className="widget-chat-name text-indigo">Ahmed Shah</div>
											<div className="widget-chat-message">Hello,

                                                I hope you're doing well. 
                                                I have noticed some discrepancies in the latest cheque deposits at your end.
                                                </div>              
											<div className="widget-chat-time">6:00PM</div>
										</div>
									</div>
								</div>
								
							</PerfectScrollbar>
							<div className="widget-input widget-input-rounded">
								<form action="" method="POST" name="">
									<div className="widget-input-container">
										<div className="widget-input-icon"><Link to="/messages" className="text-grey"><i className="fa fa-camera"></i></Link></div>
										<div className="widget-input-box">
											<input type="text" className="form-control form-control-sm" placeholder="Write a message..." />
										</div>
										<div className="widget-input-icon"><Link to="/messages" className="text-grey"><i className="fa fa-smile"></i></Link></div>
										<div className="widget-input-divider"></div>
										<div className="widget-input-icon"><Link to="/messages" className="text-grey"><i className="fa fa-microphone"></i></Link></div>
									</div>
								</form>
							</div>
						</div>
		</div>
	</div>
		)
	}
}

export default Messages;