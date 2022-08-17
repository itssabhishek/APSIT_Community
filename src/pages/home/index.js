import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LeftSideBar from "./LeftSideBar";
import { Grid, Slide, Stack } from "@mui/material";
import Post from "./Post";
import RightSideBar from "./RightSideBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { connect } from "react-redux";

function Home({ drawerState }) {
  const mdBreakpoint = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const xsBreakpoint = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid
          item
          sx={{
            display: {
              xs: drawerState ? "block" : "none",
              sm: "block",
            },
            overflowY: "auto",
            overflowX: "hidden",
            mt: 2,
          }}
          sm={mdBreakpoint ? 4 : 2}
          xs={12}
          height={"calc(100vh - 9rem)"}
        >
          <LeftSideBar />
          {mdBreakpoint && <RightSideBar />}
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={mdBreakpoint ? 10 : 8}
          display={drawerState && "none"}
          className={"post_container"}
        >
          <Stack
            p={mdBreakpoint ? 1 : 3}
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
        {!mdBreakpoint && (
          <Grid item xs={2}>
            <RightSideBar />
          </Grid>
        )}
      </Grid>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    drawerState: state.drawerReducer.drawerState,
  };
};

export default connect(mapStateToProps)(Home);
