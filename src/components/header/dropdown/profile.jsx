import React from 'react';
import { Redirect } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownProfile extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
			logOutCheck : false
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
	logout(){
		localStorage.setItem("login",false);
		this.setState({logOutCheck : true})
	}
  
	render() {
		const {logOutCheck} = this.state;
		if(logOutCheck === true)
		{
			return <Redirect to = '/login'/>
		}
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown navbar-user" tag="li">
				<DropdownToggle tag="a">
					<div className="image image-icon bg-black text-grey-darker">
						<i className="fa fa-user"></i>
					</div>
					<span className="d-none d-md-inline">M. Junaid</span> <b className="caret"></b>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu dropdown-menu-right" tag="ul">
					<DropdownItem>Edit Profile</DropdownItem>
					<DropdownItem><span className="badge badge-danger pull-right">0</span> Inbox</DropdownItem>
					<DropdownItem>Calendar</DropdownItem>
					<DropdownItem>Setting</DropdownItem>
					<div className="dropdown-divider"></div>
					<DropdownItem onClick={this.logout.bind(this)}>Log Out</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}
};

export default DropdownProfile;
