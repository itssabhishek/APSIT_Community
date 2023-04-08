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

// ----------------------------------------------------------------------

BlogPostCommentItem.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  tagUser: PropTypes.string,
  postedAt: PropTypes.string,
  hasReply: PropTypes.bool,
};

export default function BlogPostCommentItem({ name, avatarUrl, message, tagUser, postedAt, hasReply }) {
  const [openReply, setOpenReply] = useState(false);
  const [reply, setReply] = useState('');

  const handleOpenReply = () => {
    setOpenReply((prevState) => !prevState);
  };

  const handleChangeMessage = (reply) => {
    setReply(reply);
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
                <strong>{tagUser}</strong> {message}
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
          <IconButton>
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
