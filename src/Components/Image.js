import { Avatar, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { storage } from "../Services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Image() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <br />
      <br />
      <Avatar alt="Remy Sharp" src={url} sx={{ width: 150, height: 150 }} />
      <br />
      <TextField
        style={{ padding: "6px" }}
        type="file"
        onChange={handleImageChange}
      />
      <br />
      <Button
        style={{ padding: "10px" }}
        variant="contained"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
    </div>
  );
}

export default Image;
