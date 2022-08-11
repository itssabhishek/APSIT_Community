import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Box,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  Attachment,
  Chat,
  EmojiEvents,
  Info,
  Newspaper,
  SendSharp,
  Warning,
} from "@mui/icons-material";

//Chat input box
const ChatInputBox = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    textIndent: 10,
    backgroundColor: "white",
    fontSize: 16,
    padding: "10px 12px",
  },
  "& .MuiInput-root:after": {
    display: "none",
  },
  "& .MuiInput-root:before": {
    display: "none",
  },
});

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
          className={"messageBox"}
          gridRow={"span 12"}
          gridColumn={"span 4"}
          bgcolor={"primary.main"}
          borderRadius={2}
          color={"White"}
          p={2}
          position={"relative"}
        >
          <Box className={"messageBox_header"}>
            <Stack direction={"row"} alignItems={"center"} columnGap={2}>
              <Chat />
              <Typography variant={"subtitle2"} fontSize={20}>
                Messages
              </Typography>
            </Stack>
          </Box>
          <Box
            className={"messageBox_body"}
            display={"flex"}
            flexDirection={"column-reverse"}
            rowGap={1}
            width={"100%"}
            height={"80%"}
            mt={1}
          >
            {[
              "Byee!",
              "Okay bye",
              "Nothing special.",
              "Nothing. What about you?",
              "What's up?",
              "Hello",
              "Hi",
            ].map((element, index) => (
              <Box
                key={index}
                position={"relative"}
                className={"chat_container"}
                color={"black"}
                bgcolor={"white"}
                width={"max-content"}
                p={"2px"}
                ml={1}
              >
                <Typography
                  className={"chat_text"}
                  variant={"subtitle2"}
                  bgcolor={"white"}
                  p={"0 4px"}
                >
                  {element}
                </Typography>
              </Box>
            ))}
          </Box>
          <Stack
            className={"messageBox_footer"}
            position={"absolute"}
            bottom={"1rem"}
            width={"calc(100% - 32px)"}
            direction={"row"}
            alignItems={"center"}
            columnGap={1}
            bgcolor={"white"}
            borderRadius={100}
            overflow={"hidden"}
          >
            <ChatInputBox
              id="messageBox_messageInput"
              variant="standard"
              fullWidth
              focused
            />
            <IconButton
              aria-label="attachment"
              size="large"
              color={"primary"}
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <Attachment />
            </IconButton>
            <IconButton aria-label="send" size="large" color={"primary"}>
              <SendSharp />
            </IconButton>
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
