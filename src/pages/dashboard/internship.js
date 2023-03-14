// @mui
import { Button, Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import InternshipDataGrid from '../../components/InternshipDataGrid';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../utils/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

Internship.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Internship() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState([]);
  const getAllInternships = useCallback(async () => {
    try {
      const response = await axios.post('/internships', {
        domain: 'Computer Science',
      });

      console.log('Internships', response.data.internships);

      // if (isMountedRef.current) {
      //   setData(response.data.posts);
      // }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    getAllInternships();
  }, [getAllInternships]);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Internships"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Internships' }]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InternshipDataGrid data={data} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
