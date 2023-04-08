import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';

// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import MyAvatar from '../../../../components/MyAvatar';
import MenuPopover from '../../../../components/MenuPopover';
// util
import axios from '../../../../utils/axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Markdown from '../../../../components/Markdown';
import NextLink from 'next/link';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object,
};

export default function ProfilePostCard({ post }) {
  const { user } = useAuth();
  const [isLiked, setLiked] = useState(post.like.includes(user.moodleId));
  const [likes, setLikes] = useState(post.like.length);
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboardHandler = () => {
    navigator.clipboard
      .writeText(`${location.host}${PATH_DASHBOARD.blog.root}/post/${post._id['$oid']}`)
      .then(() => enqueueSnackbar(`Link copied!`));
  };

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
    axios
      .post('/post/like', {
        postId: post._id['$oid'],
        moodleId: user.moodleId,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
    axios
      .post('/post/like', {
        postId: post._id['$oid'],
        moodleId: user.moodleId,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link variant="subtitle2" color="text.primary">
            {user?.displayName}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={<MoreMenuButton postId={post._id['$oid']} />}
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Markdown children={post.content} />
        {post.cover && <Image alt="post media" src={post.cover?.preview} ratio="16/9" sx={{ borderRadius: 1 }} />}
        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          <IconButton onClick={copyToClipboardHandler}>
            <Iconify icon={'eva:share-fill'} width={20} height={20} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}

// ------------------------------------------------------------------------------
MoreMenuButton.propTypes = {
  postId: PropTypes.string,
};

function MoreMenuButton({ postId }) {
  const [open, setOpen] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { push, reload } = useRouter();
  const postEditLink = `${PATH_DASHBOARD.blog.root}/post/edit/${postId}`;
  const postViewLink = `${PATH_DASHBOARD.blog.root}/post/${postId}`;
  // --------------------------------------------------------------------------
  const postDeleteHandler = async () => {
    try {
      axios
        .post('/delete-post', {
          id: postId,
        })
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar('Post deleted');
            reload();
          }
          if (response.status === 201) {
            enqueueSnackbar("Couldn't found the post.", {
              variant: 'error',
            });
          }
          if (response.status === 500) {
            enqueueSnackbar('Sorry an error has been occurred.', {
              variant: 'error',
            });
          }
        });
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
  };

  // --------------------------------------------------------------------------
  const postEditHadler = () => {
    push(postEditLink);
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <NextLink href={postViewLink} passHref>
            <Link
              color="inherit"
              target={'_blank'}
              style={{ textDecoration: 'none' }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Iconify icon={'eva:external-link-fill'} sx={{ ...ICON }} /> View Post
            </Link>
          </NextLink>
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={postEditHadler}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Edit Post
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <FormDialogs postDeleteHandler={postDeleteHandler} />
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

FormDialogs.propTypes = {
  postDeleteHandler: PropTypes.func,
};

function FormDialogs({ postDeleteHandler }) {
  const [open, setOpen] = useState(false);
  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const deletePost = () => {
    postDeleteHandler();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem sx={{ color: 'error.main' }} onClick={handleClickOpen}>
        <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
        Delete Post
      </MenuItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
            <br /> Action cannot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={deletePost} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
