import React from "react";
import { AvatarGroup, Box, ListItem, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Create } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

const RightSideBar = () => {
  const lgBreakpoint = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box mx={2} overflow={"hidden"}>
      <Box paddingTop={3}>
        <Typography variant={"subtitle1"}>Online:</Typography>

        <AvatarGroup
          total={24}
          sx={{
            justifyContent: "start",
          }}
          max={lgBreakpoint ? 3 : 4}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Box>
      <Box mt={4}>
        <Typography variant={"subtitle1"}>Featured Posts:</Typography>
        <Paper elevation={3}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <Create />
                </ListItemIcon>
                <Typography variant={"caption"}>Some questions....</Typography>
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <Create />
                </ListItemIcon>
                <Typography variant={"caption"}>Some questions....</Typography>
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <Create />
                </ListItemIcon>
                <Typography variant={"caption"}>Some questions....</Typography>
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <Create />
                </ListItemIcon>
                <Typography variant={"caption"}>Some questions....</Typography>
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <Create />
                </ListItemIcon>
                <Typography variant={"caption"}>Some questions....</Typography>
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <Create />
                </ListItemIcon>
                <Typography variant={"caption"}>Some questions....</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default RightSideBar;
