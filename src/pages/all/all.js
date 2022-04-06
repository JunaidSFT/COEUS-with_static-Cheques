import React from 'react';
import TableAll from './table-data';
import {Card, CardBody, CardHeader, CardText} from 'reactstrap';

import './index.scss'


const SidebarUI = ({ isOpen, ...rest }) => {
    const classes = [
      'Sidebar',
      isOpen ? 'is-open' : '',
    ]
  
    return (
      <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />
    )
  }
  
  SidebarUI.Overlay = props => <div className="SidebarOverlay" {...props} />
  
  SidebarUI.Content = ({ width = '30rem', isLeft = false, ...rest }) => {
    const classes = [
      'SidebarContent',
      isLeft ? 'is-left' : '',
    ]
    const style = {
      width,
      height: '100%',
      top: 0,
      left: isLeft ? `-${width}` : 'auto',
      right: !isLeft ? `-${width}` : 'auto',
    }
    
    return (
      <div
        className={classes.join(' ')}
        style={style}
        {...rest}
       />
    )
  }
  
  
  class Sidebar extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        isOpen: props.isOpen,
        selected: null,
        originalData: '',
      }
      
      this.openSidebar = this.openSidebar.bind(this)
    }
    
    openSidebar(isOpen = true) {
      this.setState({ isOpen })
    }

    handleCallback = (childData) =>{
        if (childData !== null && childData !== undefined ) {
            this.setState({isOpen : true});
            this.setState({originalData: childData.original},()=> console.log(this.state.originalData))
        }
    }
  
    render() {
      const { isOpen } = this.state
      const { hasOverlay, isLeft } = this.props
      return (
        <SidebarUI isOpen={isOpen}>
          
          <TableAll parentCallback = {this.handleCallback}/>
          <SidebarUI.Content isright={isLeft}>
          <div style = {{marginTop: '80px'}}>
				<div className = "row media media-sm media-list" style = {{paddingLeft: '10px', margin: '5px'}}>
					<div  className=" media-left">
						<img src="/assets/img/user/user-13.jpg" alt="" className="media-object rounded-corner" />
					</div>
				<div className="media-body p-t-10">
					<h5 className="media-heading">{this.state.originalData.title_rec}</h5>
                    <h6>ID # 239982</h6>
				</div>
			</div>
            <div className = "m-20">
			<Card className="border-1">
							<CardHeader className="f-w-600">
								Customer Information
							</CardHeader>
                            <CardBody>
                                <CardText>
                                     <span style = {{display: 'flex', padding: '5px'}}><i class="fas fa-mars fa-2x text-blue" style = {{marginRight: '10px'}}></i><h4 className = "m-b-0 m-t-3" style = {{color: '#737475', fontSize: '16px'}}>Male</h4></span>
                                     <span style = {{display: 'flex', padding: '5px'}}><i class="fas fa-birthday-cake fa-2x text-blue" style = {{marginRight: '10px'}}></i><h4 className = "m-b-0 m-t-3" style = {{color: '#737475', fontSize: '16px'}}>05/09/1996</h4></span>
                                     <span style = {{display: 'flex', padding: '5px'}}><i class="fas fa-phone-alt fa-2x text-blue" style = {{marginRight: '10px'}}></i><h4 className = "m-b-0 m-t-3" style = {{color: '#737475', fontSize: '16px'}}>0321-9876543</h4></span>
                                     <span style = {{display: 'flex', padding: '5px'}}><i class="fas fa-address-card fa-2x text-blue" style = {{marginRight: '10px'}}></i><h4 className = "m-b-0 m-t-3" style = {{color: '#737475', fontSize: '16px'}}>61901-1234567-1</h4></span>
                                     <span style = {{display: 'flex', padding: '5px'}}><i class="fas fa-envelope fa-2x text-blue" style = {{marginRight: '10px'}}></i><h4 className = "m-b-0 m-t-3" style = {{color: '#737475', fontSize: '16px'}}>Ahmed@gmail.com</h4></span>
                                </CardText>

                            </CardBody>
						</Card>
			</div>
            <div className = "m-20">
			<Card className="border-1">
							<CardHeader className="f-w-600">
								Cheque Deposit History
							</CardHeader>
                            <CardBody>
                                <CardText>
								<div className="table-responsive">
									<table className="table m-b-0">
										<thead>
											<tr>
												<th>S.no</th>
												<th>Cheque No.</th>
												<th>Date</th>
                                                <th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>2434</td>
												<td>25/09/2021</td>
                                                <td>Processed</td>
											</tr>
											<tr>
                                                <td>2</td>
												<td>4353</td>
												<td>25/09/2021</td>
                                                <td>Unprocessed</td>
											</tr>
											<tr>
                                                <td>3</td>
												<td>5646</td>
												<td>25/09/2021</td>
                                                <td>Processed</td>
											</tr>
                                            <tr>
                                                <td>4</td>
												<td>5345</td>
												<td>25/09/2021</td>
                                                <td>Unprocessed</td>
											</tr>
										</tbody>
									</table>
								</div>

                                </CardText>

                            </CardBody>
						</Card>
			</div>
			
		            </div>
          </SidebarUI.Content>
          {hasOverlay ? <SidebarUI.Overlay onClick={() => this.openSidebar(false)} /> : false}
      </SidebarUI>
      )
    }
  }
  
  const All = () => (
    <div>
      <Sidebar hasOverlay />
    </div>
  )
  
  
export default All;


