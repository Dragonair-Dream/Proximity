import React from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const PageDoesNotExist = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      container
      style={{
        minHeight: "100vh",
        minWidth: "100%",
        backgroundColor: "WhiteSmoke",
        // alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        textAlign="center"
        spacing={2}
      >
        Page Does Not Exist <br />
        Please navigate to a different page <br />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        textAlign="center"
        spacing={2}
      >
        <Button onClick={handleClick}>
          Click Here to return to the Home Page
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        textAlign="center"
        maxWidth="100vw"
        display="flex"
      >
        <img src="https://media.giphy.com/media/rtRflhLVzbNWU/giphy.gif" />
      </Stack>
    </div>
  );
};

export default PageDoesNotExist;
