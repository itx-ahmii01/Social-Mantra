import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from '../../api/UserRequest.js'
import { logout } from "../../actions/AuthAction";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  
  const dispatch = useDispatch()
  const params = useParams();
  const profileUserId = params.id
  const [profileUser, setProfileUSer] = useState({})

  const {user} = useSelector((state)=>state.authReducer.authData)
  useEffect(()=>{
    const fetchProfileUser = async()=>{

      if (profileUserId === user._id)
      {
        setProfileUSer(user)
        
      }
      else{
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUSer(profileUser)
      
      }
    
    }
    fetchProfileUser();
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
       <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data = {user}
          />
        </div>
        
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
