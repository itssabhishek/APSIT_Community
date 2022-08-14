import {
  Alert,
  Box,
  Button,
  Card,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Footer from "../../components/Footer";
import { connect } from "react-redux";
import { getUserDetails } from "../../../redux/actions/authActions";
import { useRouter } from "next/router";

function IndexPage(props) {
  //Accessing the props
  const { name, moodleId, getUserDetails } = props;

  //Refs
  const moodleIdRef = useRef("");
  const passwordRef = useRef("");

  //States
  const [spinner, setSpinner] = useState(false);
  const [moodleError, setMoodleError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);

  //Initialising instance of Router
  const router = useRouter();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Making post request to check if user exist or not
  const getUser = async (moodleId, password) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/find-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moodleId: moodleId,
        password: password,
      }),
    });
  };

  //Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    //Take values from inputs
    const enteredMoodleId = moodleIdRef.current.value;
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
      enteredPassword.length >= 8
    ) {
      //Making spinner visible
      setSpinner(true);

      const response = await getUser(enteredMoodleId, enteredPassword);
      if (response.status === 200) {
        const responseObject = await response.json();
        getUserDetails({
          name: responseObject.name,
          moodleId: responseObject.moodleId,
        });

        //Disabling spinner
        setSpinner(false);

        //Redirecting to Home page
        await router.push("/home");
      } else {
        console.log(response.status);

        //Disabling spinner
        setSpinner(false);

        //Opening error message
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Signin to APSIT Community</title>
        <meta name={"description"} content={"Signin to APSIT Community"} />
      </Head>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Wrong credentials! Try again.
        </Alert>
      </Snackbar>
      <Box pt={4}>
        <Typography variant={"h3"} fontWeight={500} textAlign={"center"}>
          Welcome back, we missed you!
        </Typography>
        <form id="signIn_form">
          <Card
            sx={{
              margin: "2rem auto",
              padding: "2rem",
              width: "fit-content",
            }}
          >
            <Typography mb={2} align={"center"} variant={"h5"} fontWeight={500}>
              Please login to continue
            </Typography>
            <Stack
              direction="column"
              spacing={2}
              height={"inherit"}
              justifyContent={"center"}
            >
              <Image
                src={"/community.svg"}
                alt="Community Logo"
                height="60px"
                width="60px"
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
                id="user_password"
                label="Password"
                type="password"
                name="password"
                inputRef={passwordRef}
                error={passwordError}
                helperText={passwordError ? "Please enter password." : ""}
              />
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
                  Login
                </Button>
              )}

              <Typography
                variant={"caption"}
                color="lightslategrey"
                textAlign={"center"}
              >
                New to APSIT community?{" "}
                <Link href="/newaccount">
                  <a
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    Click here
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

const mapStateToProps = (state) => {
  return {
    name: state.authReducer.name,
    moodleId: state.authReducer.moodleId,
  };
};

const mapDispatchToProps = {
  getUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
