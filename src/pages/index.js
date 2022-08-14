import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { OpenInNew } from "@mui/icons-material";

export default function LandingPage() {
  return (
    <>
      <Container
        fixed
        sx={{
          padding: {
            xs: "1rem",
            md: "2rem",
            lg: "3rem",
          },
          margin: {
            xs: "0 auto",
          },
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: "center",
          justifyContent: {
            xs: "center",
            md: "space-between",
          },
        }}
      >
        <Box
          sx={{
            textAlign: {
              xs: "center",
              md: "start",
            },
          }}
        >
          <span>
            <Typography variant={"h2"}>Hello,</Typography>
            <br />{" "}
            <Typography
              variant="h1"
              fontWeight="900"
              component="div"
              gutterBottom
            >
              APSITian
            </Typography>
          </span>
          <Typography variant={"subtitle1"} mt={4}>
            To continue, Please
          </Typography>
          <Stack
            mt={4}
            sx={{
              flexDirection: {
                xs: "column",
                md: "row",
              },
              rowGap: {
                xs: 2,
                md: 0,
              },
            }}
            columnGap={3}
            alignItems={"center"}
          >
            <Link href={"/signin"}>
              <Button
                variant="contained"
                endIcon={<OpenInNew />}
                sx={{
                  width: {
                    xs: "100%",
                    md: "fit-content",
                  },
                }}
              >
                Sign In
              </Button>
            </Link>{" "}
            {"Or"}
            <Link href={"/newaccount"}>
              <Button
                variant="outlined"
                endIcon={<OpenInNew />}
                sx={{
                  width: {
                    xs: "100%",
                    md: "fit-content",
                  },
                }}
              >
                Create a new Account
              </Button>
            </Link>
          </Stack>
        </Box>

        <Box
          sx={{
            display: {
              xs: "none",
              md: "initial",
            },
          }}
        >
          <Image
            src={"/community-3d.png"}
            alt={"Home_Page_Community"}
            width={"500"}
            height={"500"}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
