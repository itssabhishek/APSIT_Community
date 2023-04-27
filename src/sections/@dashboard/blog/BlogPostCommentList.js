import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//
import BlogPostCommentItem from './BlogPostCommentItem';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  comments: PropTypes.array,
};

export default function BlogPostCommentList({ comments }) {
  const [currentComments, updateCurrentComments] = useState([]);

  useEffect(() => updateCurrentComments(comments), [comments]);

  const addNewComment = (newComment) => {
    const updatedCommentsArray = currentComments.map((comment) => {
      if (comment.id === newComment.parentId) {
        comment.replyComment.push(newComment);
      }

      return comment;
    });

    updateCurrentComments(updatedCommentsArray);
  };

  return (
    <List disablePadding>
      {currentComments.map((comment) => {
        const { id, name, avatarUrl, message, replyComment, postId, postedAt } = comment;
        const hasReply = replyComment.length > 0;

        return (
          <Box key={Math.random() * 10000} sx={{}}>
            <BlogPostCommentItem
              parentId={id}
              postId={postId}
              name={name}
              avatarUrl={avatarUrl}
              postedAt={postedAt}
              message={message}
              addNewComment={addNewComment}
            />
            {hasReply &&
              replyComment.map((reply) => (
                <BlogPostCommentItem
                  key={Math.random() * 100000}
                  parentId={id}
                  postId={postId}
                  postedAt={reply.postedAt}
                  message={reply.message}
                  name={reply.name}
                  avatarUrl={reply.avatarUrl}
                  addNewComment={addNewComment}
                  hasReply
                />
              ))}
          </Box>
        );
      })}
    </List>
  );
}
