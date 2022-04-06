import React from 'react';
import { withRouter } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';

// ReactSession.setStoreType("localStorage");

class Login extends React.Component {
	static contextType = PageSettings;

	constructor(props) {
		super(props);
		this.state ={
			username : "",
			password : ""
		}

		
    this.handleSubmit = this.handleSubmit.bind(this);
	}
	updateInputValue1(evt) {
		const val = evt.target.value;
		
		this.setState({
		  username: val
		});
	}
	updateInputValue2(evt) {
		const val = evt.target.value;
		
		this.setState({
		  password: val
		});
	}
	componentDidMount() {
		localStorage.setItem("login",false)
		console.log(localStorage.getItem("login"))
		this.context.handleSetPageTopMenu(false);
		this.context.handleSetPageHeader(false);
	}

	componentWillUnmount() {
		this.context.handleSetPageTopMenu(true);
		this.context.handleSetPageHeader(true);
	}
	
	handleSubmit(event) {

		if(this.state.username === "ubl" && this.state.password === "123")
		{
			event.preventDefault();
    		this.props.history.push('/verification');
			localStorage.setItem("login",true);
		}
  	}
  
	render() {
		return (
			<React.Fragment>
				
		
				<div className="login login-v2" >
					
					<div className="login-content" style = {{border: '1px solid', boxShadow: '10px 5px 5px #b4b4b4'}}>
                    <div className="login-header">
						<div className="brand">
							<span><i class="fas fa-leaf" style = {{color: '#F26B6E'}}></i></span> <b style = {{color:'#737475'}}>Login</b>
							
						</div>
						
					</div>
						<form className="margin-bottom-0" onSubmit={this.handleSubmit}>
							<div className="form-group m-b-20">
                                <div>Username</div>
								<input value={this.state.username}   onChange={evt => this.updateInputValue1(evt)} type="text" className="form-control form-control-lg" style= {{border: '1px solid #9E9E9E'}} placeholder="Username" required />
							</div>
							<div className="form-group m-b-20">
                                <div>Password</div>
								<input value={this.state.password}  onChange={evt => this.updateInputValue2(evt)} type="password" className="form-control form-control-lg" style= {{border: '1px solid #9E9E9E'}} placeholder="Password" required />
							</div>
					
							<div className="login-buttons">
								<button type="submit" className="btn btn-success btn-block btn-lg" style= {{backgroundColor: '#8CC1FC'}}>Sign me in</button>
							</div>
							<div className="m-t-20">
								Forgot Password?
							</div>
						</form>
					</div>
				</div>
			
		
			</React.Fragment>
		)
	}
}

export default withRouter(Login);
