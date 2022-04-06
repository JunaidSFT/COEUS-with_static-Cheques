import React from 'react';
import {Card, CardBody, CardHeader, CardText, Button} from 'reactstrap';
import Annotation from 'react-image-annotation';
import axios from 'axios';
import ReactLoading from "react-loading";
import TablePendingCheques from './pendingCheques-table';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './index.css';
import { Redirect } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

import chequeImg from './../../assets/img/1a.jpg';


axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
class Verification extends React.Component {
     
    componentDidMount() {
         this.getLatestData();
      }

	constructor(props) {
		super(props);
        this.state = {
            graph: null,
            checkedArr: [false, false, false],
            annotations: [],
            annotation: {},
            chequeImage : {},
            signImage :{},
            matchPercent :'',
            chequeNo : '',
            loading: false,
            annotationCheck: true,
            black1: true,
            black2: true,
            black3: true,
            black4: true,
            black5: true,
            pendingChequeData : [],
            decline_Reason : [],
            showPopUp : false,
            redirect: false,
            renderToHome: false,
            loggedIn: localStorage.getItem("login"),
            chequeAmountWords : '',
            chequeAmountNumeric : '',
            customerName : '',
            UID : '',
        };

    };
    arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele !== value; 
        });
    }
    handleCallback = (childData) =>{
        if (childData !== null && childData !== undefined ) {
            console.log(childData.original)
            this.setState({
                chequeAmountNumeric: childData.original.numeric_amount,
                chequeAmountWords : childData.original.cheque_amount,
                customerName : childData.original.title_rec
            })
            localStorage.setItem("ID", childData.original._id);
            this.setState({loading:true})
            this.fetchImageData();
        }
    }
    getLatestData(){
        axios({
          method: "GET",
          url: `http://34.125.195.139:8090/api/get/latest`,
        }).then((response) => {
            console.log(response.data);
            var result = response.data.status;
            toast(result);
            const id = response.data[0]._id;
            const chequeid = response.data[0].cheque_no;
            const name = response.data[0].title_rec;
            const amount = response.data[0].numeric_amount;
            const words = response.data[0].cheque_amount;
            localStorage.setItem("ID", id);
            localStorage.setItem("chequeId", chequeid);
            localStorage.setItem("customerName", name);
            localStorage.setItem("customerAmount", amount);
            localStorage.setItem("customerAmountWords", words);
            this.setState({chequeNo:chequeid, chequeAmountWords: words, chequeAmountNumeric : amount, customerName: name, UID: id}, ()=> {this.fetchImageData()})
          })
          .catch((error) => {
            console.log(error);
          });
    }
    fetchImageData() {
        const userId = localStorage.getItem("ID");
        axios({
          method: "POST",
          url: `http://34.125.195.139:8090/api/get/single`,
          data: {
              _id : userId
          },
        }).then((res) => {
            if(res.data.length>0)
            {
               this.setState({ chequeImage: res.data[0].cheque_img_text, signImage: res.data[0].sig_img_text, matchPercent: res.data[0].match_perc,chequeNo:res.data[0].cheque_no, loading: false}, () => console.log(res.data));
            }
            else{
                console.log(res)
                toast('No Data')
            }
        //    console.log(res)
        });
      };
    onChange = (annotation) => {
        this.setState({ annotation })
    }
    updateInputValue1(evt) {
        const val = evt.target.value;
        // ...
        this.setState({
            chequeAmountWords: val
        });
    }
    updateInputValue2(evt) {
		const val = evt.target.value;
		// ...
		this.setState({
		    chequeAmountNumeric: val
		});
	}
    updateInputValue3(evt) {
        const val = evt.target.value;
        // ...
        this.setState({
            customerName: val
        });
    }
      onSubmit = (annotation) => {
        const { geometry, data } = annotation
     
        this.setState({
          annotation: {},
          annotations: this.state.annotations.concat({
            geometry,
            data: {
              ...data,
              id: Math.random()
            }
          })
        }, () => console.log(this.state.annotations))        
      };

    changeColor1(){
        this.setState({black1: !this.state.black1})
        if(this.state.black1 === true)
        {
            this.state.decline_Reason.push("balance")
            console.log(this.state.decline_Reason)
        }
        else if(this.state.black1 === false && this.state.decline_Reason.includes("balance"))
        {
            var arr = [...this.state.decline_Reason]
            var array = this.arrayRemove(arr, "balance");
            this.setState({decline_Reason: array},()=> console.log(this.state.decline_Reason))
        }
        
    };
    changeColor2(){
        this.setState({black2: !this.state.black2})
        if(this.state.black2 === true)
        {
            this.state.decline_Reason.push("signature")
            console.log(this.state.decline_Reason)
        }
        else if(this.state.black2 === false && this.state.decline_Reason.includes("signature"))
        {
            var arr = [...this.state.decline_Reason]
            var array = this.arrayRemove(arr, "signature");
            this.setState({decline_Reason: array},()=> console.log(this.state.decline_Reason))
        }
        
    };
    changeColor3(){
        this.setState({black3: !this.state.black3})
        if(this.state.black3 === true)
        {
            this.state.decline_Reason.push("amount")
            console.log(this.state.decline_Reason)
        }
        else if(this.state.black3 === false && this.state.decline_Reason.includes("amount"))
        {
            var arr = [...this.state.decline_Reason]
            var array = this.arrayRemove(arr, "amount");
            this.setState({decline_Reason: array},()=> console.log(this.state.decline_Reason))
        }
        
    };
    changeColor4(){
        this.setState({black4: !this.state.black4})
        if(this.state.black4 === true)
        {
            this.state.decline_Reason.push("date")
            console.log(this.state.decline_Reason)
        }
        else if(this.state.black4 === false && this.state.decline_Reason.includes("date"))
        {
            var arr = [...this.state.decline_Reason]
            var array = this.arrayRemove(arr, "date");
            this.setState({decline_Reason: array},()=> console.log(this.state.decline_Reason))
        }
        
    };
    changeColor5(){
        this.setState({black5: !this.state.black5})
        if(this.state.black5 === true)
        {
            this.state.decline_Reason.push("image")
            console.log(this.state.decline_Reason)
        }
        else if(this.state.black5 === false && this.state.decline_Reason.includes("image"))
        {
            var arr = [...this.state.decline_Reason]
            var array = this.arrayRemove(arr, "image");
            this.setState({decline_Reason: array},()=> console.log(this.state.decline_Reason))
        }
        
    };
    
    SubmitAnnotations(){
            console.log(this.state.annotations);
            axios({
                method: "POST",
                url: `http://34.125.195.139:8090/api/post/annotation`,
                data:{
                    _id : this.state.UID, cheque_no : this.state.chequeNo, 
                    img_data : this.state.chequeImage, annotations : this.state.annotations
                }
            }).then((res) =>{
                console.log(res)
                toast('Annotations Submitted')
            })
    }
    Approve(){
        if(this.state.decline_Reason.length === 0)
        {   console.log(this.state.UID)
            axios({
                method: "POST",
                url: `http://34.125.195.139:8090/api/post/status`,
                data: {
                  cheque_no: parseInt(this.state.chequeNo), cheque_status: "approved", cheque_amount : this.state.chequeAmountWords, 
                  numeric_amount : this.state.chequeAmountNumeric, title_rec : this.state.customerName,
                  _id : this.state.UID
                },
            }).then((res) =>{
                console.log(res)
                toast('Approved')
                this.setState({ loading : true}, ()=> this.getLatestData());
            })
        }
        else{
            toast('Unselect all Reasons to Approve')
        }
        
    };
    Decline(){
        let decline_data = this.state.decline_Reason.join("/")
        console.log(decline_data)
        if(this.state.decline_Reason.length > 0)
        {
            axios({
                method: "POST",
                url: `http://34.125.195.139:8090/api/post/status`,
                data: {
                    cheque_no: parseInt(this.state.chequeNo), cheque_status: "decline", cheque_amount : this.state.chequeAmountWords, 
                    numeric_amount : this.state.chequeAmountNumeric, title_rec : this.state.customerName,
                    _id : this.state.UID, decline_reason : this.state.decline_Reason
                },
            }).then((res) =>{
                toast('Declined')
                console.log(res)
                
                if(this.state.black1 === false)
                {
                    this.setState({black1: !this.state.black1})
                }
                if(this.state.black2 === false)
                {
                    this.setState({black2: !this.state.black2})
                }
                if(this.state.black3 === false)
                {
                    this.setState({black3: !this.state.black3})
                }
                if(this.state.black4 === false)
                {
                    this.setState({black4: !this.state.black4})
                }
                if(this.state.black5 === false)
                {
                    this.setState({black5: !this.state.black5})
                }
                console.log(this.state.decline_Reason)
                this.setState({ loading : true}, ()=> this.getLatestData());

            })
        }
        else{
            toast('Please Select any Reason to Decline')
        }
        
    };
    Hold(){
        if(this.state.decline_Reason.length>0)
        {
            axios({
                method: "POST",
                url: `http://34.125.195.139:8090/api/post/status`,
                data: {
                    cheque_no: parseInt(this.state.chequeNo), cheque_status: "hold", cheque_amount : this.state.chequeAmountWords, 
                    numeric_amount : this.state.chequeAmountNumeric, title_rec : this.state.customerName,
                    _id : this.state.UID, decline_reason : this.state.decline_Reason
                },
            }).then((res) =>{
                toast('Hold')
                console.log(res)
                
                if(this.state.black1 === false)
                {
                    this.setState({black1: !this.state.black1})
                }
                if(this.state.black2 === false)
                {
                    this.setState({black2: !this.state.black2})
                }
                if(this.state.black3 === false)
                {
                    this.setState({black3: !this.state.black3})
                }
                if(this.state.black4 === false)
                {
                    this.setState({black4: !this.state.black4})
                }
                if(this.state.black5 === false)
                {
                    this.setState({black5: !this.state.black5})
                }
                console.log(this.state.decline_Reason)
                this.setState({ loading : true}, ()=> this.getLatestData());

            })
        }
        else
        {
            toast('Please Select any Reason to Hold')
        }
        let decline_data = this.state.decline_Reason.join("/")
        console.log(decline_data)
       
    }
    render () {
        let btn_class1 = this.state.black1 ? "blackButton" : "whiteButton";
        let btn_class2 = this.state.black2 ? "blackButton" : "whiteButton";
        let btn_class3 = this.state.black3 ? "blackButton" : "whiteButton";
        let btn_class4 = this.state.black4 ? "blackButton" : "whiteButton";
        let btn_class5 = this.state.black5 ? "blackButton" : "whiteButton";
        const {renderToHome} = this.state;
        const {loggedIn} = this.state;
        if (renderToHome)
        {
            return <Redirect to='/verification'/>
        }
        else if (loggedIn === false)
        {
            return <Redirect to='/login'/>
        }
        else{
        return (
            <div>
                {this.state.loading ?
			<div style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>  
			<ReactLoading width={100} type={"spinningBubbles"} color="#0083ca" />
			</div> :
                <div className = "row" style = {{margin: '100px 30px 30px 30px'}}>
                    <div className = "col-6">
                    <ToastContainer position='top-center'/>
                            <div className = "m-10">
                    <Card className="border-1">
                                    <CardHeader className="f-w-600" style = {{backgroundColor: '#F5F8FF'}}>
                                        Cheque Image 
                                        <button 
                                        className = "float-right button-annotation" 
                                        
                                        onClick = {this.SubmitAnnotations.bind(this)}
                                        >
                                           Submit Annotations </button>
                                        
                                        <button 
                                        className = "float-right button-annotation" 
                                        
                                        onClick = {()=> {this.setState({annotationCheck: false})}}
                                        >
                                         Annotate  </button>
                                         <span className = "float-right" onClick = {()=> this.setState({annotations: []})}>
                                             <i className="fas fa-redo-alt fa-2x icon-annotation"></i></span>
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>
                                            {this.state.annotationCheck ? 
                                            <div>
                                            <img 
                                            style = {{width:'100%', maxHeight:'350px', objectFit: 'cover'}}
                                            src = {chequeImg}
                                            // src={"data:image/png;base64," +  this.state.chequeImage}
                                            alt="..."
                                        /></div>:
                                        <div>
                                        <Annotation 
                                                // src={"data:image/png;base64," +  this.state.chequeImage}
                                                src = {chequeImg}
                                                alt='Two pebbles anthropomorphized holding hands'
                                                style = {{color: 'black'}}
                                                annotations={this.state.annotations}
                                    
                                                type={this.state.type}
                                                value={this.state.annotation}
                                                onChange={this.onChange}
                                                onSubmit={this.onSubmit}
                                            />
                                            </div>
                                        }
                                        </CardText>
                                    </CardBody>
                                </Card>
                         </div>
                         <div className = "m-10">
                    <Card className="border-1">
                                    <CardHeader className="f-w-600" style = {{backgroundColor: '#F5F8FF'}}>
                                        Pending Cheques
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>
                                        <TablePendingCheques parentCallback = {this.handleCallback}/>
                                        </CardText>
                                        
                                    </CardBody>
                                </Card>
                         </div>   
                    </div>
                    <div className = "col-6">
                            <div className = "m-10">
                    <Card className="border-1">
                                    <CardHeader className="f-w-600" style = {{backgroundColor: '#F5F8FF'}}>
                                        Digitized Cheque Information
                                    </CardHeader>
                                    <CardBody style={{height:'300px'}}>
                                        <CardText>
                                            <div className = "row" style = {{display:'flex', marginRight: '50px'}}>
                                                 <h5 style = {{marginLeft: 'auto',marginRight: '0px'}}>Cheque No. </h5>&nbsp;&nbsp;
                                                 <EditText 
                                                    name="cheque" 
                                                    type="number" 
                                                    style={{width: '100px', padding: '0px', margin: '0px'}} 
                                                    defaultValue="00000018"
                                                    // defaultValue={this.state.chequeNo} inline
                                                    />
                                                 
                                            </div>
                                                {/* <div className = "row" style = {{marginRight: '90px'}}>
                                                    <h5 style = {{marginLeft: 'auto',marginRight: '0px'}}>Date: </h5>&nbsp;&nbsp;
                                                    <p>{localStorage.getItem("customerDate")}</p>
                                                </div> */}
                                            <div style = {{backgroundColor: '#FFF6F6', padding: '5px', height:'250px'}}>
                                            <div className = "row" style = {{marginLeft: 'auto', marginTop: 50}}>
                                                 <h5>Pay </h5>&nbsp;&nbsp;
                                                 <div style= {{width: '350px', height: '25px', border: '1px solid #b4b4b4'}}>
                                                 <input
                                                    name="textbox1"
                                                    style = {{width: '350px', backgroundColor: '#FFF6F6', padding: '0px', margin: '0px'}}
                                                    defaultValue="Izmah Israr"
                                                    // defaultValue={this.state.customerName}
                                                    onChange={evt => this.updateInputValue3(evt)}
                                                    />
                                                 </div>
                                                 <h5>&nbsp;&nbsp; or bearer </h5>
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <div className = "row" style = {{marginLeft: 'auto', marginRight: 0, marginTop: '5px'}}>
                                                 <h5>Rupees </h5>&nbsp;&nbsp;
                                                 <div style= {{width: '400px', height: '50px', border: '1px solid #b4b4b4'}}>
                                                 <input
                                                    name="textbox2"
                                                    style = {{ width:'100%', backgroundColor: '#FFF6F6',  padding: '0px', margin: '0px', height: '50px'}} 
                                                    defaultValue="One Crore Rupees Only"
                                                    // defaultValue={this.state.chequeAmountWords}
                                                    onChange={evt => this.updateInputValue1(evt)}
                                                    />
                                                 
                                                 </div>
                                                 <h5>&nbsp;&nbsp; PKR &nbsp;&nbsp;</h5>
                                                 <input 
                                                    name="age" 
                                                    style={{width: '100px', backgroundColor: '#FFF6F6', padding: '0px', margin: '0px'}} 
                                                    defaultValue="1,00,00,000" 
                                                    // defaultValue={this.state.chequeAmountNumeric}
                                                    onChange={evt => this.updateInputValue2(evt)} inline
                                                    />
                                                 
                                            </div>
                                            </div>
                                        </CardText>
                                    </CardBody>
                                </Card>
                         </div> 
                         <div className = "m-10">
                                <Card className="border-1">
                                                <CardHeader className="f-w-600" style = {{backgroundColor: '#F5F8FF'}}>
                                                Signature Status
                                                </CardHeader>
                                                <CardBody>
                                                    <CardText>
                         <div className = "row">
                                    <div className = "col-4">
                                        <div style = {{border: '1px solid #b4b4b4'}}>
                                        
                                    <img style = {{width:'100%', maxHeight:'70px', objectFit: 'cover'}}
                                                            //src={"data:image/png;base64," +  this.state.signImage}
                                                            src = "./assets/img/cheques/1b.jpg"
                                                            alt="..."
                                                        /> 
                                                        <h5 className = "text-center">Signature on System</h5>
                                                        
                                        </div>
                                        
                                    </div>
                                    <div className = "col-1">
                                    <i class="fas fa-arrow-right fa-3x" style ={{paddingTop: '30px'}}></i>
                                    </div>
                                    <div className = "col-2 text-center" style = {{width: '150px', height: '100px', backgroundColor: '#69C86D', padding: '5px'}}>
                                            <h5 style = {{marginTop: '10px', color: 'white'}}>Signature Match</h5>
                                            <h1 style = {{color: 'white'}}>100%</h1>
                                    </div>
                                    <div className = "col-1">
                                        <i class="fas fa-arrow-left fa-3x" style ={{paddingTop: '30px'}}></i>
                                       </div>
                                    <div className = "col-4">
                                    <div className = "" style = {{border: '1px solid #b4b4b4'}}>
                                   
                                    <img style = {{width:'100%', maxHeight:'70px', objectFit: 'cover'}}
                                                            //src={"data:image/png;base64," +  this.state.signImage}
                                                            src = "./assets/img/cheques/1c.jpg"
                                                            alt="..."
                                                        />
                                                        <h5 className = "text-center">Signature on Cheque</h5>
                                        </div>
                                    </div>
                                </div>
                                </CardText>
                                </CardBody>
                                </Card>
                                </div>
                         {/* <div className = "row" style = {{marginTop: '20px', marginLeft: '8px'}}>
                                    <div>
                                        <div style = {{border: '1px solid #b4b4b4', padding : '5px'}}>
                                    <img style = {{width:'auto', maxHeight:'80px', marginTop: '5px'}}
                                                            src={"data:image/png;base64," +  this.state.signImage}
                                                            alt="..."
                                                        />
                                                        <h5 className = "text-center">Signature on System</h5>
                                                        
                                        </div>
                                        
                                    </div>
                                    <i class="fas fa-arrow-right fa-3x" style ={{margin: '50px 10px 10px'}}></i>
                                    <div className = "text-center" style = {{width: '200px', height: '100px', backgroundColor: '#69C86D', padding: '5px', marginTop: '10px'}}>
                                            <h5 style = {{marginTop: '10px', color: 'white'}}>Signature Match</h5>
                                            <h1 style = {{color: 'white'}}>{this.state.matchPercent}</h1>
                                    </div>
                                       <span style ={{margin: '50px 10px 10px'}}> <i class="fas fa-arrow-left fa-3x"></i></span>
                                    <div>
                                    <div className = "" style = {{border: '1px solid #b4b4b4', padding : '5px'}}>
                                    <img style = {{width:'auto', maxHeight:'80px', marginTop: '5px'}}
                                                            src={"data:image/png;base64," +  this.state.signImage}
                                                            alt="..."
                                                        />
                                                        <h5 className = "text-center">Signature on Cheque</h5>
                                        </div>
                                    </div>
                                </div> */}
                         <div className = "m-10">
                                <Card className="border-1">
                                                <CardHeader className="f-w-600" style = {{backgroundColor: '#F5F8FF'}}>
                                                Decline Reason(s)
                                                </CardHeader>
                                                <CardBody>
                                                    <CardText>
                                                       <div className = "text-center">
                                                           <button className = {`${btn_class1} col-2 button-reason`} onClick={this.changeColor1.bind(this)}>
                                                               Balance
                                                           </button>
                                                           <button className = {`${btn_class2} col-2 button-reason`} onClick={this.changeColor2.bind(this)}>
                                                               Signature
                                                           </button>
                                                           <button className = {`${btn_class3} col-2 button-reason`} onClick={this.changeColor3.bind(this)}>
                                                               Amount
                                                           </button>
                                                           <button className = {`${btn_class4} col-2 button-reason`} onClick={this.changeColor4.bind(this)}>
                                                               Date
                                                           </button>
                                                           <button className = {`${btn_class5} col-2 button-reason`} onClick={this.changeColor5.bind(this)}>
                                                               Image
                                                           </button>
                                                       </div>
                                                    </CardText>
                                                    
                                                </CardBody>
                                            </Card>
                                </div> 
                                <div className = "row float-right" style = {{marginRight: '10px'}}>
                                <Button color="secondary" size="lg" style = {{marginRight: '5px'}} onClick={this.Hold.bind(this)}>Hold</Button>
                                <Button color="danger" size="lg" style = {{marginRight: '5px'}} onClick={this.Decline.bind(this)}>Decline</Button>
                                <Button color="success" size="lg" style = {{marginRight: '5px'}} onClick={this.Approve.bind(this)}>Approve</Button>
                                </div>
                     </div>

                </div>}
                </div>
        )
    }
    }

}

export default Verification;
