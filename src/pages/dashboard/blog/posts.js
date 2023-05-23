// react
import { useCallback, useEffect, useState } from "react";

// @mui
import { Container, Grid, Stack, Typography } from "@mui/material";

// hooks
import useSettings from "../../../hooks/useSettings";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import useAuth from "../../../hooks/useAuth";

// utils
import axios from "../../../utils/axios";
import orderBy from "lodash/orderBy";

// layouts
import Layout from "../../../layouts";

// components
import Page from "../../../components/Page";
import { SkeletonPostItem } from "../../../components/skeleton";

// sections
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from "../../../sections/@dashboard/blog";

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
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState('latest');
  const [loading, setLoading] = useState(true);
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const { user } = useAuth();
  const sortedPosts = applySort(posts, filters, user.bookmark);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get('/posts');

      if (isMountedRef.current) {
        setPosts(response.data.posts);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [isMountedRef]);

  useEffect(() => {
    fetchPosts().then((r) => r);
  }, [fetchPosts]);

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
          {loading
            ? [...Array(4)].map((_, index) => <SkeletonPostItem key={index} />)
            : sortedPosts.map((post) => (
                <Grid key={post._id['$oid']} item xs={12} sm={6} md={3}>
                  <BlogPostCard post={post} />
                </Grid>
              ))}
          {!loading && !posts.length && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">No posts found. Why won't you make one? </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
