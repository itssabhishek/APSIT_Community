import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";

export default function NewAccount() {
  //Ref
  const moodleIdRef = useRef("");
  const passwordRef = useRef("");

  //States
  const [moodleError, setMoodleError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkboxState, setCheckboxState] = useState(true);

  //Checkbox state handler
  const checkboxStateHandler = (e) => {
    setCheckboxState(e.target.checked);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //Take values from inputs
    const enteredMoodleId = moodleIdRef.current.value;
    const enteredPassword = passwordRef.current.value;

    //Show Error
    !enteredMoodleId || isNaN(enteredMoodleId) || enteredMoodleId.length !== 8
      ? setMoodleError(true)
      : setMoodleError(false);
    !enteredPassword || enteredPassword.length < 8
      ? setPasswordError(true)
      : setPasswordError(false);
  };
  return (
    <>
      <Header />
      <Box className="newaccount" mt={8}>
        <Typography variant={"h3"} textAlign={"center"} fontWeight={700}>
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
              <TextField id="user_name" label="Your Name" name="name" />
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

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={submitHandler}
              >
                Join
              </Button>
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
