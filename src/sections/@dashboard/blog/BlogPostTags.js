import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
// components
import Iconify from '../../../components/Iconify';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

BlogPostTags.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostTags({ post }) {
  const { user } = useAuth();
  const { push, reload } = useRouter();
  const [isLiked, setLiked] = useState(post.like.includes(user.moodleId));
  const [isBookmarked, setBookmarked] = useState(user.bookmark?.includes(post._id['$oid']) || false);
  const { enqueueSnackbar } = useSnackbar();
  const [likes, setLikes] = useState(post.like.length);

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

  const handleBookmark = () => {
    setBookmarked(true);
    axios
      .post('/post/bookmark', {
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

  const handleUnBookmark = () => {
    setBookmarked(false);
    axios
      .post('/post/bookmark', {
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

  const postReportHandler = async () => {
    try {
      const response = await axios.post('/post/report', {
        postId: post._id['$oid'],
        moodleId: user.moodleId,
      });
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar('Post Reported');
      }
      if (response.status === 208) {
        enqueueSnackbar('You have already reported this post.', {
          variant: 'warning',
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Sorry an error has occurred.', {
        variant: 'error',
      });
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={isLiked}
              onChange={isLiked ? handleUnlike : handleLike}
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(likes)}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={isBookmarked}
              onChange={isBookmarked ? handleUnBookmark : handleBookmark}
              color="success"
              icon={<Iconify icon="eva:bookmark-outline" />}
              checkedIcon={<Iconify icon="eva:bookmark-fill" />}
            />
          }
          label={'Bookmark'}
        />
        <Box sx={{ flex: 1 }} />
        <FormDialogs postReportHandler={postReportHandler} />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

FormDialogs.propTypes = {
  postReportHandler: PropTypes.func,
};

function FormDialogs({ postReportHandler }) {
  const [open, setOpen] = useState(false);
  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const reportPost = () => {
    postReportHandler();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color={'warning'} variant="contained" onClick={handleClickOpen}>
        <Iconify icon={'ic:twotone-warning'} sx={{ ...ICON }} />
        Report
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to report this post?
            <br /> Action cannot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={reportPost} color={'warning'} variant="contained">
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
