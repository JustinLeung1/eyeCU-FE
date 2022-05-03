import React, { useContext, useEffect, useRef, useState } from 'react'
import { DispatchContext, StateContext } from '../contexts/AppContextProvider'
import { uploadImage } from '../contexts/AuthContext/AuthActions';
import { useNavigate } from "react-router-dom"
import Sidebar from './Sidebar'
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
      e.preventDefault();
      setChangePicture(!changePicture)
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
      }
    }




  return (
    <div>
        <Sidebar/>
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
                            <button className="user-edit-btn" id="showUploadBtn" onclick="showUpload()">Upload Photo</button> {/** we do the change to upload pictures here */}
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
                        <button className="upload-btn" type="submit" onclick="document.getElementById('uploadBtn').click()"><i className='bx bxs-camera-plus' style={{fontSize: "large", verticalAlign: "middle"}}></i> Upload Photo</button>
                        <input id="uploadBtn" style={{display: "none"}} type="file" accept="image/png, image/jpg"/>
                    </div>
					<div className="video-feature" id="videoFeature">
					</div>
				</div>
			</div>
            </main>
        </section>
    </div>
  )
}
