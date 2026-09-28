"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

type Props = {};

const Login = (props: Props) => {
  return (
    <div>
      Login page
      <Button variant="contained" color="primary">
        Click
      </Button>
      <TextField
        id="name"
        label="Name"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
};

export default Login;
