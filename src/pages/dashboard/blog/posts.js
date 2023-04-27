import orderBy from 'lodash/orderBy';
import { useCallback, useEffect, useState } from 'react';

// @mui
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import axios from '../../../utils/axios';

// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { SkeletonPostItem } from '../../../components/skeleton';

// sections
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from '../../../sections/@dashboard/blog';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'bookmarked', label: 'Bookmarked' },
];

// ----------------------------------------------------------------------

BlogPosts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const applySort = (posts, sortBy, bookmarkedPostIds) => {
  console.log(bookmarkedPostIds);
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'bookmarked') {
    if (bookmarkedPostIds) {
      const bookmarkedPosts = bookmarkedPostIds.map((postId) => {
        return posts.find((post) => post._id['$oid'] === postId);
      });

      const existingPosts = bookmarkedPosts.filter((value) => value !== undefined);

      return orderBy(existingPosts, ['createdAt'], ['desc']);
    }
    return posts;
  }
  return posts;
};

export default function BlogPosts() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const { user } = useAuth();

  console.log(user);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters, user.bookmark);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('/posts');

      if (isMountedRef.current) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={posts} />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={3}>
          {(!posts.length ? [...Array(4)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post._id['$oid']} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <BlogPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </Page>
  );
}
