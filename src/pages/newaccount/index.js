import React, { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

export default function NewAccount() {
  //Ref
  const userNameRef = useRef("");
  const moodleIdRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  //States
  const [moodleError, setMoodleError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkboxState, setCheckboxState] = useState(true);
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const [spinner, setSpinner] = useState(false);

  //Initialising instance of Router
  const router = useRouter();

  //Checkbox state handler
  const checkboxStateHandler = (e) => {
    setCheckboxState(e.target.checked);
  };

  const handleClick = () => {
    setOpen((prevState) => {
      return {
        ...prevState,
        open: true,
      };
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen((prevState) => {
      return {
        ...prevState,
        open: false,
      };
    });
  };

  //Making post request to add new user
  const addUser = async (name, moodleId, email, password) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: name,
        moodleId: moodleId,
        email: email,
        password: password,
      }),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //Take values from inputs
    const enteredUserName = userNameRef.current.value;
    const enteredMoodleId = moodleIdRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    //Show Error
    isNaN(enteredMoodleId) || enteredMoodleId.length !== 8
      ? setMoodleError(true)
      : setMoodleError(false);
    enteredPassword.length < 8
      ? setPasswordError(true)
      : setPasswordError(false);

    if (
      !moodleError &&
      !passwordError &&
      enteredMoodleId.length === 8 &&
      enteredPassword.length >= 8 &&
      checkboxState
    ) {
      //Making spinner visible
      setSpinner(true);

      const response = await addUser(
        enteredUserName,
        enteredMoodleId,
        enteredEmail,
        enteredPassword
      );
      if (response.status === 201) {
        console.log(response.status);

        //Disabling spinner
        setSpinner(false);

        //Redirecting to signin page
        await router.push("/signin");
      } else if (response.status === 302) {
        console.log(response.status);
        //Disabling spinner
        setSpinner(false);
        //Opening error message
        setOpen((prevState) => {
          return {
            ...prevState,
            open: true,
            message: "User already exists! Please signin to continue.",
          };
        });
      } else {
        //Disabling spinner
        setSpinner(false);
        //Opening error message
        setOpen((prevState) => {
          return {
            ...prevState,
            open: true,
            message: "An error has been occurred. Please try again",
          };
        });
      }
    }
  };
  return (
    <>
      <Snackbar
        open={open.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {open.message}
        </Alert>
      </Snackbar>
      <Box className="newaccount" pt={4}>
        <Typography variant={"h3"} textAlign={"center"} fontWeight={500}>
          We are very excited to have you!
        </Typography>
        <form id="newAccount_form">
          <Card
            sx={{
              margin: "2rem auto",
              padding: "2rem 2rem",
              width: "20rem",
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              height={"inherit"}
              justifyContent={"center"}
            >
              <TextField
                id="user_name"
                label="Your Name"
                name="name"
                inputRef={userNameRef}
              />
              <TextField
                id="user_moodleId"
                label="Your Moodle ID"
                name="moodleId"
                inputRef={moodleIdRef}
                error={moodleError}
                helperText={
                  moodleError ? "Please enter a valid moodle id." : ""
                }
              />
              <TextField
                id="user_email"
                label="Email"
                type="email"
                name="email"
                inputRef={emailRef}
              />
              <TextField
                id="user_password"
                label="Password"
                type="password"
                name="password"
                inputRef={passwordRef}
                error={passwordError}
                helperText={passwordError ? "Please enter password." : ""}
              />
              <Box display={"flex"} alignItems={"center"}>
                <Checkbox
                  checked={checkboxState}
                  color={"default"}
                  onChange={checkboxStateHandler}
                />
                <Typography color={"lightslategrey"} fontSize={10}>
                  I accept all terms and conditions.
                </Typography>
              </Box>
              {!checkboxState && (
                <Typography color={"orangered"} fontSize={10}>
                  Please accept terms and conditions.
                </Typography>
              )}

              {spinner ? (
                <Box textAlign={"center"}>
                  <CircularProgress
                    sx={{
                      color: "primary.main",
                    }}
                  />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={submitHandler}
                >
                  Join
                </Button>
              )}
              <Typography
                variant={"caption"}
                color={"lightslategrey"}
                textAlign={"center"}
              >
                Already have an account?{" "}
                <Link href="/signin">
                  <a
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    Sign In
                  </a>
                </Link>
              </Typography>
            </Stack>
          </Card>
        </form>
      </Box>
      <Footer />
    </>
  );
}
