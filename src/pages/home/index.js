import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LeftSideBar from "./LeftSideBar";
import { Grid, Stack } from "@mui/material";
import Post from "./Post";
import RightSideBar from "./RightSideBar";

export default function Home() {
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs>
          <LeftSideBar />
        </Grid>
        <Grid item xs={8} className={"post_container"}>
          <Stack
            p={2}
            height={"calc(100vh - 9rem)"}
            sx={{
              overflowY: "scroll",
            }}
            rowGap={2}
          >
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </Stack>
        </Grid>
        <Grid item xs>
          <RightSideBar />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
