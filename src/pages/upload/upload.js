import React from 'react';
import Dropzone from "react-dropzone";
import axios from 'axios';
import ReactLoading from "react-loading";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Upload extends React.Component {
	constructor(props) {
		super(props);
        this.upload = this.upload.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            Img_Data : null,
            selectedFile: null,
            dataURL : "",
            image : null,
            base64 : null,
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],
	        loading : false

        };
        this.addNotification = this.addNotification.bind(this);
		
    };

    addNotification(
        notificationType,
        notificationTitle,
        notificationMessage,
        notificationPosition,
        notificationContent
      ) {
        if (notificationContent) {
          notificationContent = (
            <div className="widget-list widget-list-rounded inverse-mode w-100">
              <div className="widget-list-item">
                <div className="widget-list-media">
                  <img
                    src="../assets/img/user/user-12.jpg"
                    alt=""
                    className="rounded"
                  />
                </div>
                <div className="widget-list-content">
                  <h4 className="widget-list-title">Christopher Struth</h4>
                  <p className="widget-list-desc">Bank Transfer</p>
                </div>
              </div>
            </div>
          );
        }
        store.addNotification({
          title: notificationTitle,
          message: notificationMessage,
          type: notificationType,
          insert: "top",
          container: notificationPosition,
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true },
          content: notificationContent,
        });
      }


    componentDidMount() {
        // UploadService.getFiles().then((response) => {
        //   this.setState({
        //     fileInfos: response.data,
        //   });
        // });
      }
    upload() {
        let currentFile = this.state.selectedFiles[0];
    
        this.setState({
          progress: 0,
          currentFile: currentFile,
        });
        console.log(currentFile)
        this.setState({loading:true})
        var reader = new FileReader();
        reader.readAsDataURL(currentFile);
        reader.onload = () => {
            let a = reader.result.toString().split(',')
            console.log(a[1])
            this.setState({ base64 : a[1]})
            axios({
                method: "POST",
                url: `http://34.125.195.139:8090/api/post/cheque`,
                data: {
                    img_str: this.state.base64,
                    recieving_time: Date().toLocaleString(),
                    cheque_status: "processed"
                }
            }).then((res) =>{
                this.setState({loading : false})
                this.addNotification(
                    "success",
                    "Success",
                    "All your data has been successfully updated",
                    "bottom-center"
                  )
                console.log(res)
                this.state.fileInfos.push(currentFile.name)
            })
        }
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        console.log(this.state.base64)
        this.setState({
          selectedFiles: undefined,
        });
    }
    onDrop(files) {
        if (files.length > 0) {
            this.setState({ selectedFiles: files });
        }
    }
    render() {
        const { selectedFiles, currentFile, progress, message } = this.state;
        const {loading} = this.state;
		return (
            
			<div className = "row" style = {{margin: '200px 30px 30px 50px', justifyContent: 'center'}}>
                {loading ?
                <div style = {{ margin: '100px 20spx 30px 200px'}}>  
                <ReactLoading width={100} type={"spinningBubbles"} color="#000" />
                </div> :
                <div>
                    <ReactNotification />
                    {currentFile && (
                    <div className="progress mb-3">
                        <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                        >
                        {progress}%
                        </div>
                    </div>
                    )}

                    <Dropzone onDrop={this.onDrop} multiple={false}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            {selectedFiles && selectedFiles[0].name ? (
                            <div className="selected-file">
                                {selectedFiles && selectedFiles[0].name}
                            </div>
                            ) : (
                                <span >
                                    <b>Drag and drop file here, or click to select file</b>
                                </span>
                            )}
                        </div>
                        <aside className="selected-file-wrapper">
                            <button
                            className="btn btn-success"
                            disabled={!selectedFiles}
                            onClick={this.upload}
                            >
                            Upload
                            </button>
                        </aside>
                        </section>
                    )}
                    </Dropzone>

                    <div className="alert alert-light" role="alert">
                    {message}
                    </div>
                </div>}
            </div>
            
        )
    }
}

export default Upload;