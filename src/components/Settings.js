import React, { useContext, useEffect, useRef, useState } from 'react'
import { DispatchContext, StateContext } from '../contexts/AppContextProvider'
import { uploadImage } from '../contexts/AuthContext/AuthActions';
import { useNavigate } from "react-router-dom"
import { Alert } from 'react-bootstrap';
import Sidebar from './Sidebar'
import ReactModal from 'react-modal';
export default function Settings() {
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);
    const [authenticated, setAuthenticated] = useState(authState.authenticated)
    const [userData, setUserData] = useState(authState.user_data)
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    useEffect(()=>{
      setAuthenticated(authState.authenticated)
      setUserData(authState.user_data)
    }, [authState])
  
    useEffect(()=>{
      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])
    // useEffect(()=>{
  
    // }, [authState])
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [changePicture, setChangePicture] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();
  
    const handleClose = () => setChangePicture(!changePicture); // also add getting rid of picture
  
    const handlePictureChange = (e) =>{
    console.log("this is hitting");
      e.preventDefault();
      setChangePicture(!changePicture)
    }

    const handleChooseFile = (e) =>{
        inputRef.current?.click()
    }
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      uploadImage(dispatch, selectedPicture, navigate);
    }
    const handleUploadPicture = (e) =>{
      if (e.target.files && e.target.files[0]){
        let img = e.target.files[0];
        const formData = new FormData();
        
        formData.append('file', img);
        formData.append('fileName', img.name);
        formData.append('fileType', img.type);
        formData.append('entityName', img.name);
        const all_data ={
          form_data: formData,
          img: URL.createObjectURL(img)
        }
        setSelectedPicture(all_data) // todo get rid of old image so we dont destroy the local memory

        let saveChangesBtn = document.getElementById('saveChangesBtn');

        saveChangesBtn.classList.remove('disable-btn');
        saveChangesBtn.classList.add('upload-btn');
      }
    }

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(()=>{
        console.log(modalOpen);
    }, [modalOpen])

    const handleModalOpen = (e) =>{
        e.preventDefault();
        setModalOpen(true);
    }
    const handleModalClose = (e) =>{
        e.preventDefault();
        setModalOpen(false);
    }



  return (
    <div>
        <Sidebar active={"settings"}/>
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Settings</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="box-info" style={{display: "none"}}>
                    <li>
                        <i className='bx bxs-user' id="editUser"></i>
                        <span className="text">
                            <h3>Name: {userData?.full_name}</h3>
                            <button className="user-edit-btn" id="showUploadBtn">Upload Photo</button> {/** we do the change to upload pictures here */}
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-group' ></i>
                        <span className="text">
                            <h3>Sam Nguyen</h3>
                            <div className="buttons">
                                <button className="user-edit-btn" type="submit">Edit Profile</button>
                                <button className="subUser-remove-btn" type="submit">Remove Profile</button>
                            </div>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-add-to-queue' ></i>
                        <span className="text">
                            <h3>New User</h3>
                            <button className="user-edit-btn" type="submit" >Add a Profile</button>
                        </span>
                    </li>
			    </ul>
                <div className="table-data">
				<div className="order" id="order">
					<div className="picture-upload">
                        {/* <img src="img\user.png" className="img-container" id="chosenImage" style={{marginBottom: "1%"}}/><br/> */}
                        {userData?.image ? 
                            <>
                            <img src={userData?.image} className="img-container" id="chosenImage" style={{marginBottom: "1%"}}/><br/>
                            </>
                        :
                        <>
                            <img src="img\user.png" className="img-container" id="chosenImage" style={{marginBottom: "1%"}}/><br/> 
                        </>
                        }
                        
                        <figcaption id="fileName"></figcaption>
                        <span className="text">
                            <h3 style={{marginBottom: "1%", marginTop: ".5%"}}>{userData?.full_name}</h3>
                        </span>
                        <button className="btn upload-btn" type="submit" onClick={handleModalOpen}><i className='bx bxs-camera-plus' style={{fontSize: "large", verticalAlign: "middle"}}></i> Upload Photo</button>
                        <input id="uploadBtn" style={{display: "none"}} type="file" accept="image/png, image/jpg"/>
                    </div>
					<div className="video-feature" id="videoFeature">
					</div>
				</div>
			</div>
            </main>
        </section>
        <ReactModal
            isOpen={modalOpen}
            contentLabel={"Minimal Modal Example"}
            className="Modal"
            ariaHideApp={false}
            style={{
                overlay:{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // backgroundColor: 'black'
                },
                content: {
                    position: 'absolute',
                    display: 'grid',
                    top: '50%',
                    left: '50%',
                    background: '#fff',
                    overflow: 'auto',
                    transform: 'translate(-50%, -50%)',
                    outline: 'none',
                    padding: '20px',
                    height: '450px',
                    width: '500px',
                    textSize: '17px',
                    borderRadius: "3%",
                    "box-shadow":
                        `0 2.8px 2.2px rgba(0, 0, 0, 0.04),
                        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                        0 12.5px 10px rgba(0, 0, 0, 0.06),
                        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
                        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
                        0 100px 80px rgba(0, 0, 0, 0.12)`
                  }
            }}
            
        >
            <div className='modal-header' >
                <div style={{display: 'flex'}}>
                    <font color=" #a6a6a6" face="verdana"><h1 >Upload Image</h1></font>
                    <a href="#" style={{"margin-left": "auto"}} onClick={handleModalClose}><h2>✖️</h2></a>
                </div>
                <br></br>
                <div style={{borderTop: "1px solid #e1e1e1"}}></div>
            </div>
            <div className='modal-content' style={{display: "flex", justifyContent:"center"}}>
                    {errors && <Alert variant="danger" style={{fontSize:"20px"}}>{errors.general}</Alert>}
                    <img style={{borderRadius: "50%", padding: "2rem", "objectFit": "cover"}}  height="300px" width={"300px"} onClick={handleChooseFile} src={selectedPicture?.img || "https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"} />
            </div>
            <div className='modal-footer' style={{alignItems:"end", borderTop: "1px solid #e1e1e1", display: "flex"}}>
                <form>
                    <button className="upload-btn" type="button"onClick={handleChooseFile} variant="primary" > {/* add logic so it uploads picture here*/}
                        {selectedPicture == null ? "Upload Picture" : "Upload New Picture"}
                        <input type="file" ref={inputRef} className="d-none" accept="image/png, image/jpeg" onChange={handleUploadPicture} style={{display:"none"}} />
                    </button>
                </form>
                <button style={{"margin-left": "auto"}} className="disable-btn" id='saveChangesBtn' onClick={handleSubmit} disabled={selectedPicture === null}>Save Changes</button>
            </div>
        </ReactModal>
    </div>
  )
}
