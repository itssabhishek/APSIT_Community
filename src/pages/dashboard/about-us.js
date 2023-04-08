// @mui
import { styled } from '@mui/material/styles';
import { Container, Divider, Grid } from '@mui/material';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { AboutHero, AboutTeam } from '../../sections/about';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import MainFooter from '../../layouts/main/MainFooter';

// ----------------------------------------------------------------------

About.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function About() {
  const { themeStretch } = useSettings();
  return (
    <Page title="About us">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ py: 0 }}>
        <HeaderBreadcrumbs
          heading="About us"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'About us' }]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AboutHero />
            <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />
            <AboutTeam />
          </Grid>
        </Grid>
        <MainFooter />
      </Container>
    </Page>
  );
}
