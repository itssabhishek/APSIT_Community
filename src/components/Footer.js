import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Copyright } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        color: "grey.500",
        bgcolor: "common.white",
        boxShadow: "none",
        borderTop: "2px solid lightgrey",
        flexGrow: 1,
        width: "100%",
        zIndex: 10,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={"body2"}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Copyright
            fontSize="small"
            sx={{
              mr: 2,
            }}
          />{" "}
          APSIT. Made by APSIT students for the APSIT students.
        </Typography>
      </Toolbar>
    </Box>
  );
}
