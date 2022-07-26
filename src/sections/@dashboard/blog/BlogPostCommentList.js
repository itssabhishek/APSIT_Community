import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  comments: PropTypes.array,
};

export default function BlogPostCommentList({ comments }) {
  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id, replyComment, users } = comment;
        const hasReply = replyComment.length > 0;

        return (
          <Box key={Math.random() * 1000000000} sx={{}}>
            <BlogPostCommentItem
              name={comment.name}
              avatarUrl={comment.avatarUrl}
              postedAt={comment.postedAt}
              message={comment.message}
            />
            {hasReply &&
              replyComment.map((reply) => {
                const user = users.find((_user) => _user.id === reply.userId);
                return (
                  <BlogPostCommentItem
                    key={reply.id}
                    tagUser={reply.tagUser}
                    postedAt={reply.postedAt}
                    message={reply.message}
                    name={user?.name || ''}
                    avatarUrl={user?.avatarUrl}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}
    </List>
  );
}
