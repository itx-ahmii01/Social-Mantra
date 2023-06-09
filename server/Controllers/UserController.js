import UserModel from "../Models/userModel.js";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// Get a User

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
       res.status(404).json("No such User");
    }

  } catch (error) {
    res.status(500).json(error);
  }
};

 // Get all users
// export const getAllUsers = async (req, res) => {

//   try {
//     let users = await UserModel.find();
//     users = users.map((user)=>{
//       const {password, ...otherDetails} = user._doc
//       return otherDetails
//     })
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// udpate a user

export const updateUser = async (req, res) => {
   const id = req.params.id;
//   // console.log("Data Received", req.body)
   const { _id, currentUserAdminInStatus, password } = req.body;
  
   if (id === _id ) {

   
     try {

        if (password) {
                     const salt = await bcrypt.genSalt(10);
                     req.body.password = await bcrypt.hash(password, salt);
         }

        const user = await UserModel.findByIdAndUpdate(id, req.body,{new: true});
        const token = jwt.sign(
          {username: user.username, id: user._id},
          process.env.JWT_KEY , {expiresIn:"1h" }

        );
        res.status(200).json(user, token)
     }
     catch(error){

        res.status(500).json(error);

     }

    }
    else {
             res
               .status(403)
               .json("Access Denied! You can update only your own Account.");
           }
}
       // if we also have to update password then password will be bcrypted again
//       if (password) {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(password, salt);
//       }
//       // have to change this
//       const user = await UserModel.findByIdAndUpdate(id, req.body, {
//         new: true,
//       });
//       const token = jwt.sign(
//         { username: user.username, id: user._id },
//         process.env.JWTKEY,
//         { expiresIn: "1h" }
//       );
//       console.log({user, token})
//       res.status(200).json({user, token});
//     } catch (error) {
//       console.log("Error agya hy")
//       res.status(500).json(error);
//     }
//   } else {
//     res
//       .status(403)
//       .json("Access Denied! You can update only your own Account.");
//   }
// };

 // Delete a user
 export const deleteUser = async (req, res) => {
   const id = req.params.id;

   const { currentUserId, currentUserAdminStatus } = req.body;

   if (currentUserId == id || currentUserAdminStatus) {
     try {
       await UserModel.findByIdAndDelete(id);
       res.status(200).json("User Deleted Successfully!");
    } catch (error) {
       res.status(500).json(err);
     }
   } 
   else {
     res.status(403).json("Access Denied!");
   }
 };

 // Follow a User
// // changed
 export const followUser = async (req, res) => {
   const id = req.params.id;
   const { currentUserId } = req.body;
//   console.log(id, _id)
   if (currentUserId == id) {
     res.status(403).json("Action Forbidden");
   } else {
    try {
       const followUser = await UserModel.findById(id);
       const followingUser = await UserModel.findById(currentUserId);

       if (!followUser.followers.includes(currentUserId)) {
         await followUser.updateOne({ $push: { followers: currentUserId } });
         await followingUser.updateOne({ $push: { following: id } });
         res.status(200).json("User followed!");
       } else {
         res.status(403).json("you are already following this id");
       }
     } catch (error) {
//       console.log(error)
       res.status(500).json(error);
     }
   }
 };

 // Unfollow a User
// // changed
 export const unfollowUser = async (req, res) => {
   const id = req.params.id;
   const { currentUserID } = req.body;

   if(currentUserID === id)
   {
     res.status(403).json("Action Forbidden")
   }
   else{
    try {
       const FollowUser = await UserModel.findById(id)
       const FollowingUser = await UserModel.findById(currentUserID)


       if (FollowUser.followers.includes(currentUserID))
       {
         await FollowUser.updateOne({$pull : {followers: currentUserID}})
         await FollowingUser.updateOne({$pull : {following: id}})
         res.status(200).json("Unfollowed Successfully!")
       }
       else{
         res.status(403).json("You are not following this User")
       }
     } catch (error) {
       res.status(500).json(error)
     }
   }
 };
