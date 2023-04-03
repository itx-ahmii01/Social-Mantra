
import React from "react";
import { useSelector } from "react-redux";
import Cover from "../../img/cover.jpeg";
import Profile from "../../img/profileImg.png";
import "./ProfileCard.css";
import {Link} from 'react-router-dom'
const ProfileCard = ({location}) => {


  const {user} = useSelector((state)=>state.authReducer.authData)
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.CoverPicture? serverPublic + user.CoverPicture: serverPublic + "cover.jpeg"} alt="" />
        <img src={user.CoverPicture? serverPublic + user.profilePicture: serverPublic + "postpic2.jpg"} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt: "Always Work Hard"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage' ? ("") : (<span>

<Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/$(user._id)`}>
        
        My Profile</Link></span>)}
    </div>
  );
};

export default ProfileCard;