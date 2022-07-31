import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box, Stack, Typography } from "@mui/material";
import {
  Chat,
  EmojiEvents,
  Info,
  Newspaper,
  Warning,
} from "@mui/icons-material";

export default function Home() {
  return (
    <>
      <Header isLoggedIn={true} />
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridTemplateRows={"repeat(12, 1fr)"}
        gap={2}
        py={10}
        height={"90vh"}
      >
        <Box
          gridRow={"span 6"}
          gridColumn={"span 4"}
          bgcolor={"#bbdefb"}
          border={"2px solid #0d47a1"}
          borderRadius={2}
          color={"#0d47a1"}
          p={2}
        >
          <Stack direction={"row"} alignItems={"center"} columnGap={2}>
            <Newspaper />
            <Typography variant={"subtitle2"} fontSize={20}>
              News
            </Typography>
          </Stack>
        </Box>
        <Box
          gridRow={"span 12"}
          gridColumn={"span 4"}
          bgcolor={"primary.main"}
          borderRadius={2}
          color={"White"}
          p={2}
        >
          <Stack direction={"row"} alignItems={"center"} columnGap={2}>
            <Chat />
            <Typography variant={"subtitle2"} fontSize={20}>
              Messages
            </Typography>
          </Stack>
        </Box>
        <Box
          gridRow={"span 8"}
          gridColumn={"span 4"}
          bgcolor={"#c8e6c9"}
          border={"2px solid #1b5e20"}
          borderRadius={2}
          color={"#1b5e20"}
          p={2}
        >
          <Stack direction={"row"} alignItems={"center"} columnGap={2}>
            <EmojiEvents />
            <Typography variant={"subtitle2"} fontSize={20}>
              Achievements
            </Typography>
          </Stack>
        </Box>
        <Box
          gridRow={"span 6"}
          gridColumn={"span 4"}
          bgcolor={"#ffcdd2"}
          border={"2px solid #b71c1c"}
          borderRadius={2}
          color={"#b71c1c"}
          p={2}
        >
          <Stack direction={"row"} alignItems={"center"} columnGap={2}>
            <Warning />
            <Typography variant={"subtitle2"} fontSize={20}>
              Alerts
            </Typography>
          </Stack>
        </Box>
        <Box
          gridRow={"span 4"}
          gridColumn={"span 4"}
          bgcolor={"#f5f5f5"}
          border={"2px solid #212121"}
          borderRadius={2}
          color={"#212121"}
          p={2}
        >
          <Stack direction={"row"} alignItems={"center"} columnGap={2}>
            <Info />
            <Typography variant={"subtitle2"} fontSize={20}>
              Info
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
