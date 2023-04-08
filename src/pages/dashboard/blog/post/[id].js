import { useCallback, useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Button, Card, Container, Divider, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import axios from '../../../../utils/axios';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import Markdown from '../../../../components/Markdown';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../../../components/skeleton';
// sections
import {
  BlogPostCommentForm,
  BlogPostCommentList,
  BlogPostHero,
  BlogPostTags,
} from '../../../../sections/@dashboard/blog';
import { useSnackbar } from 'notistack';
import { m } from 'framer-motion';
import { varBounce } from '../../../../components/animate';
import { PageNotFoundIllustration } from '../../../../assets';
import NextLink from 'next/link';

// ----------------------------------------------------------------------

BlogPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogPost() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { query } = useRouter();
  const { id } = query;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get('/post', {
        params: { id },
      });

      if (isMountedRef.current) {
        setPost(response.data.post);
        setComments(response.data.post.comment);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
    // getRecentPosts();
  }, [getPost]);

  const onComment = async (value) => {
    try {
      const response = await axios.post('/post/comments', { postId: id, ...value });
      if (response.status === 200) {
        setComments((prevState) => [...prevState, value]);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      enqueueSnackbar(`${error.message}.`, { variant: 'error' });
    }
  };

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.root },
            { name: sentenceCase(post?.title || `${error ? 'Not Found' : 'Fetching'}`) },
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.content} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({comments.length || 0})
                </Typography>
              </Box>

              <BlogPostCommentList comments={comments} />
              <BlogPostCommentForm onComment={onComment} />
            </Box>
          </Card>
        )}
        {!post && !error && <SkeletonPost />}
        {!post && error && (
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Sorry, post not found!
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the post you’re looking for. It might be deleted.
            </Typography>
            <m.div variants={varBounce().in}>
              <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </m.div>
            <NextLink href={`${PATH_DASHBOARD.root}`}>
              <Button size="large" variant="contained">
                Go to Home
              </Button>
            </NextLink>
          </Box>
        )}
      </Container>
    </Page>
  );
}
