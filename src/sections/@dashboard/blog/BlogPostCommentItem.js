import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
import { useSnackbar } from 'notistack';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

BlogPostCommentItem.propTypes = {
  name: PropTypes.string,
  parentId: PropTypes.string,
  postId: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  postedAt: PropTypes.string,
  hasReply: PropTypes.bool,
  addNewComment: PropTypes.func,
};

export default function BlogPostCommentItem({
  name,
  parentId,
  postId,
  avatarUrl,
  message,
  postedAt,
  hasReply,
  addNewComment,
}) {
  const [openReply, setOpenReply] = useState(false);
  const [reply, setReply] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const handleOpenReply = () => {
    setOpenReply((prevState) => !prevState);
  };

  const handleChangeMessage = (reply) => {
    setReply(reply);
  };

  const handleCommentReply = async () => {
    try {
      const commentData = {
        name: user.displayName,
        parentId: parentId,
        postId: postId,
        avatarUrl: user.avatarUrl,
        message: reply,
        postedAt: String(new Date()),
      };

      const response = await axios.post('/post/replycomment', commentData);

      if (response.status === 200) {
        enqueueSnackbar('Replied successfully.');
        setReply('');
        addNewComment(commentData);
      }
    } catch (e) {
      enqueueSnackbar('Sorry an error has occurred.', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
          ...(hasReply && {
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                {message}
              </Typography>
            </>
          }
        />

        {!hasReply && (
          <Button size="small" onClick={handleOpenReply} sx={{ position: 'absolute', right: 0 }}>
            Reply
          </Button>
        )}
      </ListItem>

      {!hasReply && openReply && (
        <Stack
          direction="row"
          sx={{
            mb: 3,
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={reply}
            placeholder="Write a comment…"
            onChange={(event) => handleChangeMessage(event.target.value)}
            InputProps={{
              sx: {
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <IconButton onClick={handleCommentReply}>
            <Iconify icon={'ic:round-send'} width={24} height={24} />
          </IconButton>
        </Stack>
      )}

      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </>
  );
}
