import Image from "next/image";
import { Box, Stack, styled, TextField, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./Header.module.css";
import {
  HomeOutlined,
  AccountCircleOutlined,
  HelpOutlineOutlined,
  Search,
} from "@mui/icons-material";

// Custom TextField
const SearchBox = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInput-root:after": {
    display: "none",
  },
  "& .MuiInput-root:before": {
    display: "none",
  },
});

const Header = (props) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    justifyContent={"space-between"}
    bgcolor={"primary.main"}
    className={styles.header}
    boxShadow={2}
  >
    <Box
      className={"navbar_logo"}
      display={"flex"}
      alignItems={"center"}
      columnGap={2}
    >
      <Link href={"/"}>
        <a>
          <Image
            src={"/community.svg"}
            alt="Community Logo"
            height="60px"
            width="60px"
            style={{
              cursor: "pointer",
            }}
          />
        </a>
      </Link>
      <Typography variant={"h6"} color={"white"} fontWeight={600}>
        APSIT Community
      </Typography>
    </Box>
    {props.isLoggedIn && (
      <Box
        className={"navbar_loggedin"}
        display={"flex"}
        width={"60%"}
        justifyContent={"space-between"}
        color={"white"}
      >
        <Box
          className={"navbar_loggedin-search"}
          borderBottom={"2px solid white"}
          px={2}
          width={"80%"}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "primary.light",
            justifyContent: "space-between",
          }}
        >
          <SearchBox
            label="Search"
            id="navbar_loggedin-search--input"
            variant="standard"
            fullWidth
            focused
          />
          <Search />
        </Box>
        <Box
          className="navbar_loggedin-icons"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          columnGap={4}
        >
          <HomeOutlined />
          <AccountCircleOutlined />
          <HelpOutlineOutlined />
        </Box>
      </Box>
    )}
  </Stack>
);

export default Header;
