// import React, { useEffect, useState } from "react";
// import { Avatar, Button, Typography } from "@mui/material";
// import { useAuth, upload } from "../Services/firebase";
// import { useDispatch } from "react-redux";
// import { createUserProfile } from "../Store/userProfileReducer";

// export default function ProfileImage() {
//   const currentUser = useAuth();
//   const dispatch = useDispatch();

//   const [photo, setPhoto] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [photoURL, setphotoURL] = useState(null);

//   function handleChange(e) {
//     if (e.target.files[0]) {
//       setPhoto(e.target.files[0]);
//     }
//   }
//   function handleClick() {
//     upload(photo, currentUser, setLoading);
//     // dispatch(createUserProfile({ profilePic: currentUser.photoURL }));
//   }

//   useEffect(() => {
//     if (currentUser) {
//       setphotoURL(currentUser.photoURL);
//     }
//   }, [currentUser]);

//   return (
//     <div style={{ marginBottom: "17%" }}>
//       <Typography
//         style={{
//           fontSize: "30px",
//           fontWeight: "bolder",
//           color: "#0458cf ",
//           textShadow: "100px",
//         }}
//       >
//         Update User Profile Picture
//       </Typography>
//       <br />
//       <input
//         style={{ padding: "8px", alignProperty: "center" }}
//         variant="contained"
//         type="file"
//         onChange={handleChange}
//       />
//       <br />
//       <Avatar alt="Remy Sharp" src={photoURL} sx={{ width: 75, height: 75 }} />
//       <br />
//       <Button
//         disabled={loading || !photo}
//         style={{ padding: "8px" }}
//         variant="contained"
//         onClick={handleClick}
//       >
//         Upload
//       </Button>
//     </div>
//   );
// }
