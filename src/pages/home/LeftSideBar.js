import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  AddCircle,
  DarkMode,
  EmojiEvents,
  Help,
  Home,
  Info,
  Newspaper,
  Warning,
} from "@mui/icons-material";
import { Divider, Switch } from "@mui/material";

function LeftSideBar() {
  return (
    <List
      sx={{
        width: "100%",
        height: "max-content",
        bgcolor: "common.white",
        color: "common.black",
        overflow: "hidden",
      }}
      component="nav"
    >
      <ListItemButton>
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>
        <ListItemText primary="New Post" />
      </ListItemButton>
      <Divider />
      <ListItemButton
        sx={{
          bgcolor: "warning.light",
          color: "common.white",
          "&:hover": {
            color: "initial",
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: "inherit",
          }}
        >
          <Home
            sx={{
              color: "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Newspaper />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <EmojiEvents />
        </ListItemIcon>
        <ListItemText primary="Achivements" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Warning />
        </ListItemIcon>
        <ListItemText primary="Alert" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        <ListItemText primary="Help" />
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <DarkMode />
        </ListItemIcon>
        <Switch />
      </ListItemButton>
    </List>
  );
}

export default LeftSideBar;
