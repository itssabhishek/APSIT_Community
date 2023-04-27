import orderBy from 'lodash/orderBy';
import { useCallback, useEffect, useState } from 'react';

// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// utils
import axios from '../../../utils/axios';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { SkeletonPostItem } from '../../../components/skeleton';
// sections
import { NewsPostCard } from '../../../sections/@dashboard/news';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

NewsPosts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function NewsPosts() {
  const { themeStretch } = useSettings();

  // const dummyPosts = [
  //   {
  //     id: 'dfsafdsaasdhgjkjhgs',
  //     cover: '/news/Industrial_Visit.jpg',
  //     title: 'Industrial Visit🏭',
  //     view: 0,
  //     comment: 0,
  //     share: 0,
  //     author: 'Sana Sheikh',
  //     createdAt: new Date().toDateString(),
  //   },
  //   {
  //     id: 'dfghjhgdfggrtsdfjsfiog',
  //     cover: '/news/NvidiaCertification.jpeg',
  //     title: 'AI-ML Club NVIDIA Certification',
  //     view: 0,
  //     comment: 0,
  //     share: 0,
  //     author: 'Sana Sheikh',
  //     createdAt: new Date().toDateString(),
  //   },
  //   {
  //     id: 'dfsadfdsafdsadsafsdafds',
  //     cover: '/news/1.jpeg',
  //     title: 'Welcome, AI-ML club🎉',
  //     view: 0,
  //     comment: 0,
  //     share: 0,
  //     author: 'Sana Sheikh',
  //     createdAt: new Date().toDateString(),
  //   },
  //   {
  //     id: 'dfsadfdsafssadsafsdafds',
  //     cover: '/news/2.jpeg',
  //     title: 'OP DevOps😎',
  //     view: 0,
  //     comment: 0,
  //     share: 0,
  //     author: 'Sana Sheikh',
  //     createdAt: new Date().toDateString(),
  //   },
  //   {
  //     id: 'dfsadfdsafddfdsfdsffds',
  //     cover: '/news/3.jpeg',
  //     title: 'Distribution of sanitary napkins in Sharda Vidyalaya.',
  //     view: 0,
  //     comment: 0,
  //     share: 0,
  //     author: 'Sana Sheikh',
  //     createdAt: new Date().toDateString(),
  //   },
  // ];

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  //
  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('/news/all');

      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="News"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'All news' }]}
        />
        <Grid container spacing={3}>
          {posts.map((post, index) =>
            post ? (
              <Grid key={post._id['$oid']} item xs={12}>
                <NewsPostCard post={post} index={index} />
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
