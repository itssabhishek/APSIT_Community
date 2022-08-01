import React from "react";
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
              />
              <Box display={"flex"} alignItems={"center"}>
                <Checkbox defaultChecked color={"default"} />
                <Typography color={"lightslategrey"} fontSize={10}>
                  I accept all terms and conditions.
                </Typography>
              </Box>

              <Button variant="contained" endIcon={<SendIcon />}>
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
